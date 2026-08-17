'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');

test('GitHub Pages entry loads the executable real-case demo before the app', () => {
  const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

  assert.ok(index.indexOf('./demo-engine.js') < index.indexOf('./app.js'));
  assert.match(index, /real-rca-cases\.js/);
  assert.doesNotMatch(index, /stage-views\.js/);
});

test('published demo engine locks evidence-gate decisions for all ten real cases', () => {
  const engine = require(path.join(root, 'demo-engine.js'));
  const workbench = require(path.join(root, 'data', 'real-rca-cases.js'));
  const expected = {
    'RCA-EXT-001': 'LIMITED_CANDIDATES_READY',
    'RCA-EXT-002': 'LIMITED_CANDIDATES_READY',
    'RCA-EXT-003': 'TERMINAL_STOP',
    'RCA-EXT-004': 'EVIDENCE_TENSION_AND_STOP',
    'RCA-EXT-005': 'LIMITED_CANDIDATES_READY',
    'RCA-EXT-006': 'LIMITED_CANDIDATES_READY',
    'RCA-EXT-007': 'TERMINAL_STOP',
    'RCA-EXT-008': 'SAFETY_PRIORITY_REVIEW_AND_STOP',
    'RCA-EXT-009': 'TERMINAL_STOP',
    'RCA-EXT-010': 'EVIDENCE_TENSION_AND_STOP'
  };

  assert.deepEqual(workbench.cases.map((item) => item.case_id), Object.keys(expected));

  for (const caseItem of workbench.cases) {
    const result = engine.runCase(caseItem);
    assert.equal(result.decision.code, expected[caseItem.case_id], caseItem.case_id);
    assert.equal(result.decision.rootCauseClaimAllowed, false, caseItem.case_id);
    assert.equal(result.decision.otaCausalityClaimAllowed, false, caseItem.case_id);
    assert.equal(result.audit.snapshotBound, true, caseItem.case_id);
    assert.equal(result.audit.allEvidenceReferencesValid, true, caseItem.case_id);
    assert.equal(typeof result.decision.summary, 'string', caseItem.case_id);
    assert.deepEqual(engine.runCase(caseItem), result, caseItem.case_id);
  }
});

test('published demo engine derives the decision from evidence and not case ID', () => {
  const engine = require(path.join(root, 'demo-engine.js'));
  const workbench = require(path.join(root, 'data', 'real-rca-cases.js'));
  const source = workbench.cases.find((item) => item.case_id === 'RCA-EXT-005');

  const withoutHypotheses = JSON.parse(JSON.stringify(source));
  withoutHypotheses.engineering.hypotheses = [];
  assert.equal(engine.runCase(withoutHypotheses).decision.code, 'TERMINAL_STOP');

  const withUnknownEvidence = JSON.parse(JSON.stringify(source));
  withUnknownEvidence.engineering.hypotheses[0].support_evidence_ids.push('EV-UNKNOWN-SUPPORT');
  const blocked = engine.runCase(withUnknownEvidence);
  assert.equal(blocked.decision.code, 'EVIDENCE_REFERENCE_BLOCKED');
  assert.equal(blocked.decision.summary.length > 0, true);
  assert.deepEqual(blocked.audit.invalidEvidenceIds, ['EV-UNKNOWN-SUPPORT']);
});

test('published demo engine preserves evidence-gate priority for overlapping conditions', () => {
  const engine = require(path.join(root, 'demo-engine.js'));
  const workbench = require(path.join(root, 'data', 'real-rca-cases.js'));
  const source = workbench.cases.find((item) => item.case_id === 'RCA-EXT-005');
  const clone = () => JSON.parse(JSON.stringify(source));

  const invalidReferenceOverAll = clone();
  invalidReferenceOverAll.safety_route = 'SAFETY_PRIORITY_REVIEW';
  invalidReferenceOverAll.evidence_tension_state = 'EVIDENCE_TENSION';
  invalidReferenceOverAll.engineering.hypotheses[0].support_evidence_ids.push('EV-UNKNOWN-PRIORITY');
  assert.equal(engine.runCase(invalidReferenceOverAll).decision.code, 'EVIDENCE_REFERENCE_BLOCKED');

  const safetyOverTensionAndCandidate = clone();
  safetyOverTensionAndCandidate.safety_route = 'SAFETY_PRIORITY_REVIEW';
  safetyOverTensionAndCandidate.evidence_tension_state = 'EVIDENCE_TENSION';
  assert.equal(engine.runCase(safetyOverTensionAndCandidate).decision.code, 'SAFETY_PRIORITY_REVIEW_AND_STOP');

  const tensionOverCandidate = clone();
  tensionOverCandidate.evidence_tension_state = 'EVIDENCE_TENSION';
  assert.equal(engine.runCase(tensionOverCandidate).decision.code, 'EVIDENCE_TENSION_AND_STOP');

  const candidateOverTerminal = clone();
  assert.equal(engine.runCase(candidateOverTerminal).decision.code, 'LIMITED_CANDIDATES_READY');
});

test('published demo engine includes decision summaries for rejected input', () => {
  const engine = require(path.join(root, 'demo-engine.js'));

  const rejected = engine.runCase(null);
  assert.equal(rejected.decision.code, 'INPUT_REJECTED');
  assert.equal(rejected.decision.summary.length > 0, true);
});

test('published app includes the live input and run controls', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

  assert.match(app, /LiveAnalysisDemo/);
  assert.match(app, /AutoGuardDemoEngine/);
  assert.match(app, /live-run-button/);
});
