'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const presentation = require(path.join(root, 'presentation.js'));
const engine = require(path.join(root, 'demo-engine.js'));
const workbench = require(path.join(root, 'data', 'real-rca-cases.js'));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test('presentation adapter maps all ten real cases into a complete G1-G7 flow', () => {
  for (const caseItem of workbench.cases) {
    const runResult = engine.runCase(caseItem);
    const model = presentation.buildCaseFlow(caseItem, runResult);

    assert.equal(model.opening.caseId, caseItem.case_id);
    assert.equal(model.opening.problem, caseItem.enterprise.problem);
    assert.deepEqual(model.stages.map((stage) => stage.id), ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7']);
    assert.equal(model.stages.length, 7);
    assert.match(model.deliverable.boundary, /不确认根因/);

    for (const stage of model.stages) {
      assert.equal(typeof stage.code, 'string', `${caseItem.case_id}:${stage.id}:code`);
      assert.equal(typeof stage.shortTitle, 'string', `${caseItem.case_id}:${stage.id}:shortTitle`);
      assert.equal(typeof stage.title, 'string', `${caseItem.case_id}:${stage.id}:title`);
      assert.equal(typeof stage.state, 'string', `${caseItem.case_id}:${stage.id}:state`);
      assert.equal(typeof stage.purpose, 'string', `${caseItem.case_id}:${stage.id}:purpose`);
      assert.equal(typeof stage.method, 'string', `${caseItem.case_id}:${stage.id}:method`);
      assert.equal(typeof stage.finding, 'string', `${caseItem.case_id}:${stage.id}:finding`);
      assert.equal(typeof stage.gate, 'string', `${caseItem.case_id}:${stage.id}:gate`);
    }
  }
});

test('presentation adapter keeps G2 and G3 findings case-specific', () => {
  const candidateCase = workbench.cases.find((caseItem) => caseItem.case_id === 'RCA-EXT-005');
  const tensionCase = workbench.cases.find((caseItem) => caseItem.case_id === 'RCA-EXT-004');

  const candidateModel = presentation.buildCaseFlow(candidateCase, engine.runCase(candidateCase));
  const tensionModel = presentation.buildCaseFlow(tensionCase, engine.runCase(tensionCase));

  assert.notEqual(candidateModel.stages[1].finding, tensionModel.stages[1].finding);
  assert.notEqual(candidateModel.stages[2].finding, tensionModel.stages[2].finding);
});

test('presentation adapter uses computed G3 gate text for terminal cases without hypotheses', () => {
  const caseItem = workbench.cases.find((item) => item.case_id === 'RCA-EXT-003');
  const runResult = engine.runCase(caseItem);
  const model = presentation.buildCaseFlow(caseItem, runResult);

  assert.equal(runResult.decision.code, 'TERMINAL_STOP');
  assert.equal(model.stages[0].gate, '问题已结构化，可进入证据冻结；当前不确认根因。');
  assert.doesNotMatch(model.stages[0].gate, new RegExp(caseItem.engineering.evidence_snapshot_id));
  assert.equal(model.stages[2].gate, runResult.decision.nextAction);
  assert.notEqual(model.stages[2].gate, caseItem.enterprise.next_action);
});

test('presentation adapter uses the computed next action for G4 and closeout', () => {
  const source = workbench.cases.find((item) => item.case_id === 'RCA-EXT-005');
  const caseItem = clone(source);
  caseItem.enterprise.next_action = '旧版企业动作，不应覆盖本次运行决定。';
  const runResult = engine.runCase(caseItem);
  const model = presentation.buildCaseFlow(caseItem, runResult);

  assert.notEqual(runResult.decision.nextAction, caseItem.enterprise.next_action);
  assert.equal(model.stages[3].finding, runResult.decision.nextAction);
  assert.equal(model.stages[3].gate, runResult.decision.nextAction);
  assert.equal(model.deliverable.nextAction, runResult.decision.nextAction);
  assert.notEqual(model.stages[3].gate, caseItem.enterprise.next_action);
  assert.notEqual(model.deliverable.nextAction, caseItem.enterprise.next_action);
});

test('presentation adapter keeps safety and tension actions aligned with the computed G3 gate', () => {
  for (const caseId of ['RCA-EXT-004', 'RCA-EXT-008']) {
    const caseItem = workbench.cases.find((item) => item.case_id === caseId);
    const runResult = engine.runCase(caseItem);
    const model = presentation.buildCaseFlow(caseItem, runResult);

    assert.equal(model.stages[2].gate, runResult.decision.nextAction, caseId);
    assert.equal(model.stages[3].gate, runResult.decision.nextAction, caseId);
    assert.equal(model.deliverable.nextAction, runResult.decision.nextAction, caseId);
  }
});

test('presentation adapter never falls back to raw hypotheses when G3 has no accepted candidates', () => {
  const source = workbench.cases.find((item) => item.case_id === 'RCA-EXT-005');
  const sourceResult = engine.runCase(source);
  const emptyCandidateResult = clone(sourceResult);
  emptyCandidateResult.decision.candidates = [];
  const emptyCandidateModel = presentation.buildCaseFlow(source, emptyCandidateResult);

  const blockedCase = clone(source);
  const spoofedId = 'EV-SPOOFED-DECLARATION';
  blockedCase.engineering.derived_observations[0].evidence_ids.push(spoofedId);
  blockedCase.engineering.hypotheses[0].support_evidence_ids.push(spoofedId);
  const blockedResult = engine.runCase(blockedCase);
  const blockedModel = presentation.buildCaseFlow(blockedCase, blockedResult);

  assert.equal(blockedResult.decision.code, 'EVIDENCE_REFERENCE_BLOCKED');
  for (const comparison of [
    emptyCandidateModel.stages[2].evidenceComparison,
    blockedModel.stages[2].evidenceComparison
  ]) {
    assert.ok(comparison);
    assert.doesNotMatch(comparison.support, /车道几何异常/);
    assert.doesNotMatch(comparison.support, /CAND-RCA-EXT-005-01/);
  }
});

test('presentation adapter summarizes observation support, counter evidence, and registered gaps without hypotheses', () => {
  const caseItem = workbench.cases.find((item) => item.case_id === 'RCA-EXT-010');
  const model = presentation.buildCaseFlow(caseItem, engine.runCase(caseItem));
  const comparison = model.stages[2].evidenceComparison;

  assert.match(comparison.support, /5 条派生观察/);
  assert.match(comparison.support, /EV-RCA-EXT-010-OBS-001/);
  assert.match(comparison.counter, /3 条派生观察/);
  assert.match(comparison.counter, /EV-RCA-EXT-010-OBS-006/);
  assert.match(
    comparison.missing,
    new RegExp(`${caseItem.engineering.missing_evidence_ids.length} 个已登记缺失项`)
  );
  assert.match(comparison.missing, /EV-RCA-EXT-010-MISSING-RAW-MCAP/);
  assert.doesNotMatch(comparison.support, /当前数据未提供/);
  assert.doesNotMatch(comparison.counter, /当前数据未提供/);
  assert.doesNotMatch(comparison.missing, /^当前数据未提供$/);
});

test('buildOpening exposes enterprise goal with a missing-data fallback', () => {
  const source = workbench.cases.find((item) => item.case_id === 'RCA-EXT-005');
  const caseItem = clone(source);
  caseItem.enterprise.goal = '判断当前证据是否支持受限排查路径。';
  const withGoal = presentation.buildCaseFlow(caseItem, engine.runCase(caseItem));
  const withoutGoalCase = clone(source);
  const withoutGoal = presentation.buildCaseFlow(withoutGoalCase, engine.runCase(withoutGoalCase));

  assert.equal(withGoal.opening.goal, caseItem.enterprise.goal);
  assert.equal(withoutGoal.opening.goal, '当前数据未提供');
});

test('presentation adapter renders missing future-stage data and missing next action without cross-case leakage', () => {
  const source = workbench.cases.find((caseItem) => caseItem.case_id === 'RCA-EXT-005');
  const caseItem = clone(source);

  delete caseItem.enterprise.next_action;
  delete caseItem.engineering.hypotheses;
  delete caseItem.engineering.validation_protocol;
  delete caseItem.engineering.engineering_result;
  delete caseItem.engineering.closure;

  const runResult = engine.runCase(caseItem);
  const model = presentation.buildCaseFlow(caseItem, runResult);

  assert.match(model.stages[2].finding, /当前数据未提供|终止自动归因|停答|停止自动归因|支持线索不足/);
  assert.equal(model.stages[3].gate, runResult.decision.nextAction);
  assert.match(model.stages[4].finding, /当前数据未提供|当前阶段锁定/);
  assert.match(model.stages[5].finding, /当前数据未提供|当前阶段锁定/);
  assert.match(model.stages[6].finding, /当前数据未提供|当前阶段锁定/);
  assert.equal(model.stages[4].state, 'locked');
  assert.equal(model.stages[5].state, 'locked');
  assert.equal(model.stages[6].state, 'locked');
});
