'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '..');

function renderPublishedApp(model, caseOverrides = {}) {
  let rendered;
  const React = {
    createElement(type, props, ...children) {
      return { type, props: props || {}, children };
    },
    useEffect() {},
    useMemo(callback) {
      return callback();
    },
    useState(initialValue) {
      return [initialValue, () => {}];
    }
  };

  function resolve(element) {
    if (Array.isArray(element)) return element.map(resolve);
    if (element === null || element === undefined || typeof element !== 'object') return element;
    if (typeof element.type === 'function') {
      return resolve(element.type({ ...element.props, children: element.children }));
    }
    return { ...element, children: element.children.map(resolve) };
  }

  vm.runInNewContext(fs.readFileSync(path.join(root, 'app.js'), 'utf8'), {
    React,
    ReactDOM: {
      createRoot() {
        return {
          render(element) {
            rendered = resolve(element);
          }
        };
      }
    },
    document: { getElementById: () => ({}) },
    window: {
      AutoGuardRealRcaCases: {
        cases: [{
          case_id: 'RCA-EXT-005',
          title: 'Test case',
          domain: 'Test domain',
          ...caseOverrides
        }]
      },
      AutoGuardDemoEngine: { runCase: () => ({}) },
      AutoGuardPresentation: { buildCaseFlow: () => model }
    }
  });

  return rendered;
}

function collectText(node) {
  if (Array.isArray(node)) return node.flatMap(collectText);
  if (node === null || node === undefined || typeof node === 'object') {
    return node && typeof node === 'object' ? collectText(node.children) : [];
  }
  return [String(node)];
}

function findByClass(node, className) {
  if (Array.isArray(node)) {
    for (const item of node) {
      const match = findByClass(item, className);
      if (match) return match;
    }
    return null;
  }
  if (!node || typeof node !== 'object') return null;
  if (node.props?.className?.split(' ').includes(className)) return node;
  return findByClass(node.children, className);
}

function caseFlowModel() {
  const enterpriseProblem = 'Enterprise report: unexpected behavior after an update.';
  const stage = (id) => ({
    id,
    code: id,
    shortTitle: id + ' title',
    title: id + ' stage',
    state: 'current',
    purpose: id + ' purpose',
    method: id + ' method',
    finding: id === 'G1' ? enterpriseProblem : id + ' finding',
    gate: id + ' gate'
  });
  return {
    opening: {
      caseId: 'RCA-EXT-005',
      title: 'Test case',
      domain: 'Test domain',
      problem: enterpriseProblem,
      snapshotId: 'SNAP-005',
      decisionCode: 'LIMITED_CANDIDATES_READY',
      decisionLabel: 'Bounded candidates ready'
    },
    stages: ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7'].map(stage),
    deliverable: {
      summary: 'Summary',
      status: 'Status',
      nextAction: 'Action',
      boundary: 'Boundary'
    }
  };
}

test('GitHub Pages entry loads the single-case runtime in deterministic order', () => {
  const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const scripts = [
    './data/real-rca-cases.js?v=single-case-v1',
    './demo-engine.js?v=single-case-v1',
    './presentation.js?v=single-case-v1',
    './app.js?v=single-case-v1'
  ];

  for (const script of scripts) assert.match(index, new RegExp(script.replace(/[./?=-]/g, '\\$&')));
  assert.deepEqual(
    [...index.matchAll(/<script src="(\.\/[^\"]+)"/g)]
      .map((match) => match[1])
      .filter((source) => source.includes('real-rca-cases') || source.includes('demo-engine') || source.includes('presentation') || source.includes('app.js')),
    scripts
  );
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

test('published app exposes only the dynamic single-case flow', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

  for (const marker of [
    'DynamicCaseSelector',
    'SingleCaseFlow',
    'StagePanel',
    'stage-rail',
    'stage-navigation',
    'DemoCloseout',
    'buildCaseFlow'
  ]) {
    assert.match(app, new RegExp(marker), marker);
  }
  assert.doesNotMatch(app, /LiveAnalysisDemo/);
  assert.doesNotMatch(app, /live-method-line/);
});

test('published stylesheet supports the focused single-case hierarchy', () => {
  const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

  for (const selector of [
    '.case-selector',
    '.single-case-flow',
    '.case-opening',
    '.stage-rail',
    '.stage-panel',
    '.evidence-comparison',
    '.stage-navigation',
    '.demo-closeout'
  ]) {
    assert.match(styles, new RegExp('\\' + selector + '(?:[\\s,{:#.]|$)'), selector);
  }

  assert.match(styles, /@media\s*\(max-width:\s*720px\)/);
  assert.doesNotMatch(styles, /\.live-analysis-demo\b/);
});

test('published G1 keeps the enterprise report separate from the pre-verification finding', () => {
  const model = caseFlowModel();
  const rendered = renderPublishedApp(model);
  const reportContent = collectText(findByClass(rendered, 'stage-enterprise-question'));
  const findingContent = collectText(findByClass(rendered, 'stage-real-data-finding'));

  assert.ok(reportContent.includes('企业报告（未经验证）'));
  assert.ok(reportContent.includes(model.opening.problem));
  assert.ok(!findingContent.includes(model.opening.problem));
  assert.ok(findingContent.includes('本阶段仅记录企业报告的问题，尚未进入证据验证。'));
});

test('published case opening renders the investigation goal with a missing-data fallback', () => {
  const model = caseFlowModel();
  const goal = 'Determine whether the available evidence supports a bounded investigation path.';
  const renderedGoal = renderPublishedApp(model, { enterprise: { goal } });
  const renderedMissingGoal = renderPublishedApp(model);

  assert.equal(collectText(renderedGoal).filter((value) => value === goal).length, 1);
  assert.ok(collectText(findByClass(renderedMissingGoal, 'case-opening-goal')).includes('当前数据未提供'));
});
