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

test('published demo engine routes real cases through the same three gates', () => {
  const engine = require(path.join(root, 'demo-engine.js'));
  const workbench = require(path.join(root, 'data', 'real-rca-cases.js'));
  const run = (caseId) => engine.runCase(workbench.cases.find((item) => item.case_id === caseId));

  assert.equal(run('RCA-EXT-005').decision.code, 'LIMITED_CANDIDATES_READY');
  assert.equal(run('RCA-EXT-004').decision.code, 'EVIDENCE_TENSION_AND_STOP');
  assert.equal(run('RCA-EXT-008').decision.code, 'SAFETY_PRIORITY_REVIEW_AND_STOP');
});

test('published app includes the live input and run controls', () => {
  const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

  assert.match(app, /LiveAnalysisDemo/);
  assert.match(app, /AutoGuardDemoEngine/);
  assert.match(app, /live-run-button/);
});
