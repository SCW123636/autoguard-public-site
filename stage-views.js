(function attachAutoGuardStageViews(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AutoGuardStageViews = api;
})(typeof window !== 'undefined' ? window : null, function createAutoGuardStageViews() {
  const MISSING_DATA = '当前数据未提供';
  const VIEW_KINDS = Object.freeze([
    'problem-boundary',
    'evidence-timeline',
    'candidate-evidence',
    'human-gate',
    'validation-protocol',
    'engineering-result',
    'closure-loop'
  ]);

  function valueOf(value) {
    if (value === null || value === undefined) return MISSING_DATA;
    if (typeof value === 'string' && !value.trim()) return MISSING_DATA;
    return String(value);
  }

  function booleanLabel(value, trueLabel, falseLabel) {
    if (typeof value !== 'boolean') return MISSING_DATA;
    return value ? trueLabel : falseLabel;
  }

  function statusLabel(value) {
    const labels = Object.freeze({
      'awaiting-human-review': '等待企业人工审核',
      locked: '当前阶段已锁定',
      frozen: '证据已冻结',
      gap: '存在证据缺口'
    });
    const hasLabel = typeof value === 'string' && Object.prototype.hasOwnProperty.call(labels, value);
    return hasLabel ? labels[value] : (value === null || value === undefined
      ? MISSING_DATA
      : '当前状态待企业确认');
  }

  function itemsOf(items) {
    return Array.isArray(items) && items.length ? items : [null];
  }

  function renderItem(h, item, key) {
    if (!item) return h('li', { key }, MISSING_DATA);
    const detail = item.value !== undefined ? item.value : item.detail;
    return h('li', { className: item.state, key }, [
      h('strong', { key: 'label' }, valueOf(item.label)),
      item.id ? h('code', { key: 'id' }, item.id) : null,
      detail !== undefined && detail !== null
        ? h('span', { key: 'value' }, valueOf(detail))
        : null
    ]);
  }

  function renderProblemBoundary(h, view) {
    return h('section', { className: 'problem-boundary' }, [
      h('h3', { key: 'heading' }, '问题边界'),
      h('dl', { key: 'columns' }, itemsOf(view.columns).map((item, index) => {
        const data = item || {};
        return h('div', { className: data.state, key: data.key || index }, [
          h('dt', { key: 'label' }, valueOf(data.label)),
          h('dd', { key: 'value' }, valueOf(data.value))
        ]);
      }))
    ]);
  }

  function renderEvidenceTimeline(h, view) {
    return h('section', { className: 'evidence-timeline' }, [
      h('h3', { key: 'heading' }, '证据时间线'),
      h('ol', { key: 'nodes' }, itemsOf(view.nodes).map((item, index) => renderItem(h, item, index)))
    ]);
  }

  function renderCandidateEvidence(h, view) {
    const candidate = view.candidate || {};
    return h('section', { className: 'candidate-evidence' }, [
      h('h3', { key: 'heading' }, '受限候选与证据'),
      h('p', { className: 'candidate-label', key: 'candidate' }, valueOf(candidate.label)),
      h('p', { className: 'candidate-level', key: 'level' }, valueOf(candidate.level)),
      h('h4', { key: 'support-heading' }, '支持证据'),
      h('ul', { key: 'support' }, itemsOf(view.support).map((item, index) => renderItem(h, item, index))),
      h('h4', { key: 'counter-heading' }, '反证状态'),
      h('p', { key: 'counter' }, valueOf(view.counterStatus)),
      h('h4', { key: 'missing-heading' }, '缺失证据'),
      h('ul', { key: 'missing' }, itemsOf(view.missing).map((item, index) => renderItem(h, item, index))),
      h('p', { className: 'validation-allowed', key: 'validation' }, booleanLabel(
        view.validationAllowed,
        '允许进入工程验证',
        '当前不允许直接进入工程验证'
      ))
    ]);
  }

  function renderHumanGate(h, view) {
    return h('section', { className: 'human-gate' }, [
      h('h3', { key: 'heading' }, '人工审核门禁'),
      h('p', { className: 'gate-status', key: 'status' }, statusLabel(view.status)),
      h('p', { className: 'gate-decision', key: 'decision' }, valueOf(view.decision)),
      h('p', { className: 'gate-approval', key: 'approval' }, valueOf(view.approval)),
      h('ol', { key: 'actions' }, itemsOf(view.actions).map((item, index) => renderItem(h, item, index)))
    ]);
  }

  function renderValidationProtocol(h, view) {
    return h('section', { className: 'validation-protocol' }, [
      h('h3', { key: 'heading' }, '验证协议'),
      h('p', { className: 'protocol-status', key: 'status' }, statusLabel(view.status)),
      h('p', { className: 'protocol-reason', key: 'reason' }, valueOf(view.reason)),
      h('p', { className: 'protocol-executable', key: 'executable' }, booleanLabel(
        view.executable,
        '当前协议可以执行',
        '当前协议不可执行'
      )),
      h('ol', { key: 'steps' }, itemsOf(view.steps).map((item, index) => renderItem(h, item, index)))
    ]);
  }

  function renderEngineeringResult(h, view) {
    return h('section', { className: 'engineering-result' }, [
      h('h3', { key: 'heading' }, '工程结果'),
      h('p', { className: 'result-status', key: 'status' }, statusLabel(view.status)),
      h('p', { className: 'result-value', key: 'result' }, valueOf(view.result)),
      h('ul', { key: 'slots' }, itemsOf(view.slots).map((item, index) => renderItem(h, item, index)))
    ]);
  }

  function renderClosureLoop(h, view) {
    return h('section', { className: 'closure-loop' }, [
      h('h3', { key: 'heading' }, '修复关闭与沉淀'),
      h('p', { className: 'closure-status', key: 'status' }, statusLabel(view.status)),
      h('p', { className: 'closure-result', key: 'result' }, valueOf(view.result)),
      h('ol', { key: 'steps' }, itemsOf(view.steps).map((item, index) => renderItem(h, item, index)))
    ]);
  }

  const renderers = Object.freeze({
    'problem-boundary': renderProblemBoundary,
    'evidence-timeline': renderEvidenceTimeline,
    'candidate-evidence': renderCandidateEvidence,
    'human-gate': renderHumanGate,
    'validation-protocol': renderValidationProtocol,
    'engineering-result': renderEngineeringResult,
    'closure-loop': renderClosureLoop
  });

  function renderStageView(h, stage) {
    const render = renderers[stage && stage.view && stage.view.kind];
    if (!render) return h('p', { className: 'stage-view-error', role: 'status' }, MISSING_DATA);
    return render(h, stage.view);
  }

  return Object.freeze({ VIEW_KINDS, renderStageView });
});
