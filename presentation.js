(function attachAutoGuardPresentation(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AutoGuardPresentation = api;
})(typeof window !== 'undefined' ? window : null, function createAutoGuardPresentation() {
  const STORY_STEPS = Object.freeze([
    Object.freeze({ id: 'problem', label: '01 企业提出的问题' }),
    Object.freeze({ id: 'facts', label: '02 真实数据发现' }),
    Object.freeze({ id: 'judgment', label: '03 方法如何判断' }),
    Object.freeze({ id: 'missing', label: '04 永久边界' }),
    Object.freeze({ id: 'action', label: '05 企业下一步动作' })
  ]);

  function text(value, fallback = '待企业补充。') {
    return typeof value === 'string' && value.trim() ? value.trim() : fallback;
  }

  function list(value, fallback = '待企业补充。') {
    if (!Array.isArray(value) || value.length === 0) return fallback;
    return value.filter(Boolean).join('\n');
  }

  function buildStoryView(caseItem = {}) {
    const enterprise = caseItem.enterprise || {};
    const missingAnswer = '待企业补充。';
    const steps = [
      {
        ...STORY_STEPS[0],
        question: '企业报告的具体异常是什么？',
        method: '我们读取企业问题描述，识别功能域、场景和异常现象，不先给出归因。',
        answer: text(enterprise.problem, missingAnswer),
        boundary: '问题描述是企业主张，不等于已验证测量或根因。'
      },
      {
        ...STORY_STEPS[1],
        question: '企业真实数据实际支持哪些事实？',
        method: '我们通过来源哈希、不可变证据快照和逐条派生观察引用确认数据事实。',
        answer: list(enterprise.confirmed_facts, missingAnswer),
        boundary: '派生观察只说明检查状态，不替代原始信号计算。'
      },
      {
        ...STORY_STEPS[2],
        question: '当前方法允许形成什么层级的判断？',
        method: '我们检查原始数据可用性、时间与实体对齐、支持证据和反证，再执行停答门禁。',
        answer: text(enterprise.attribution_status, missingAnswer),
        boundary: 'AI 只能整理证据和受限候选，不能自动确认根因。'
      },
      {
        ...STORY_STEPS[3],
        question: '当前数据中哪些内容永久不可观测？',
        method: '我们归并原始数据、附件、金标准和版本事实缺口，并将其登记为永久边界。',
        answer: list(enterprise.missing_data, missingAnswer),
        boundary: '企业已明确不再提供其他隐私材料；缺失项登记为永久可观测性限制，不使用默认值补齐。'
      },
      {
        ...STORY_STEPS[4],
        question: '下一步由谁负责，允许继续到哪里？',
        method: '我们通过企业责任审核门禁，提交受限候选、停答、张力或安全升级及其最小动作。',
        answer: text(enterprise.next_action, missingAnswer),
        boundary: '企业责任人只批准下一步动作，不批准生产根因；审核人数由企业制度决定。'
      }
    ];
    return {
      caseId: text(caseItem.case_id, '待企业补充'),
      title: text(caseItem.title, '待企业补充'),
      steps
    };
  }

  return Object.freeze({ STORY_STEPS, buildStoryView });
});
