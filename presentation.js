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

  function getCaseCollection(workbench) {
    if (Array.isArray(workbench)) return workbench;
    if (workbench && Array.isArray(workbench.cases)) return workbench.cases;
    if (workbench && typeof workbench === 'object' && workbench.case_id) return [workbench];
    return [];
  }

  function requireFlowCase(workbench) {
    const caseItem = getCaseCollection(workbench).find((entry) => entry && entry.case_id === 'RCA-EXT-005');
    if (!caseItem) {
      throw new Error('AutoGuardPresentation.buildFlowModel: required case RCA-EXT-005 was not found in the provided workbench');
    }
    return caseItem;
  }

  function requireFirstHypothesis(caseItem) {
    const hypotheses = caseItem && caseItem.engineering && caseItem.engineering.hypotheses;
    if (!Array.isArray(hypotheses) || hypotheses.length === 0 || !hypotheses[0]) {
      throw new Error('AutoGuardPresentation.buildFlowModel: required first hypothesis is missing for case RCA-EXT-005');
    }
    return hypotheses[0];
  }


  function stage(id, title, state, purpose, method, finding, gate, evidenceComparison) {
    const value = { id, code: id, shortTitle: title, title, state, purpose, method, finding, gate };
    if (evidenceComparison) value.evidenceComparison = evidenceComparison;
    return Object.freeze(value);
  }

  function hasReference(ids, fragment) {
    return ids.some((id) => typeof id === 'string' && id.includes(fragment));
  }

  function buildEvidenceComparison(hypothesis) {
    const supportIds = Array.isArray(hypothesis.support_evidence_ids) ? hypothesis.support_evidence_ids : [];
    const counterIds = Array.isArray(hypothesis.counter_evidence_ids) ? hypothesis.counter_evidence_ids : [];
    const missingIds = Array.isArray(hypothesis.missing_evidence_ids) ? hypothesis.missing_evidence_ids : [];
    const missing = [];

    if (hasReference(missingIds, 'MISSING-RAW-MCAP')) {
      missing.push('缺少原始 MCAP，无法复算信号和物理量。');
    }
    if (hasReference(missingIds, 'MISSING-TIME-COORDINATE')) {
      missing.push('缺少统一时间坐标，无法完成事件级对齐。');
    }
    if (hasReference(missingIds, 'MISSING-ENTITY-CONTINUITY')) {
      missing.push('缺少实体连续性证据，无法确认目标关系贯穿事件。');
    }
    if (hasReference(missingIds, 'OBS-003')) {
      missing.push('缺少 LCC 退出条件证据，无法判断退出逻辑是否满足。');
    }

    return Object.freeze({
      support: Object.freeze({
        title: '支持',
        items: supportIds.length
          ? Object.freeze(['车道几何质量检查出现支持性观察。'])
          : Object.freeze(['当前候选没有支持引用。'])
      }),
      counter: Object.freeze({
        title: '反证',
        items: counterIds.length
          ? Object.freeze(['当前候选记录了需要共同解释的反证。'])
          : Object.freeze(['当前候选未引用反证。'])
      }),
      missing: Object.freeze({
        title: '缺失',
        items: Object.freeze(missing.length ? missing : ['当前候选未登记关键缺失项。'])
      })
    });
  }

  function buildFlowModel(workbench) {
    const caseItem = requireFlowCase(workbench);
    const hypothesis = requireFirstHypothesis(caseItem);
    const enterprise = caseItem.enterprise || {};
    const confirmedFacts = Array.isArray(enterprise.confirmed_facts) ? enterprise.confirmed_facts : [];
    const missingData = Array.isArray(enterprise.missing_data) ? enterprise.missing_data : [];
    const problem = text(enterprise.problem, '待企业补充。');
    const candidateLabel = text(hypothesis.mechanism_label, '待企业补充。');

    const stages = [
      stage(
        'G1', '定义问题', 'completed',
        '把企业报告转成可分析的问题边界。',
        '识别功能域、异常现象和待验证对象，并把企业报告与已验证事实分开。',
        `企业报告的问题是“${problem}”。`,
        '问题已经结构化，可以进入证据整理；当前不确认根因。'
      ),
      stage(
        'G2', '冻结证据', 'completed',
        '确认当前数据究竟能证明什么。',
        '固定当前证据快照，区分企业陈述、派生观察和缺失项，并保留底层审计引用。',
        confirmedFacts[1] || '当前仅能确认公开脱敏数据中已有的派生观察。',
        '证据已经固定，可以形成受限候选；可追溯不等于证据充分。'
      ),
      stage(
        'G3', '形成受限候选', 'completed',
        '避免看到异常后直接猜测根因。',
        '同时比较支持、反证和缺失证据，只形成能够被后续核查的候选方向。',
        `当前形成“${candidateLabel}”受限候选。`,
        '当前结果不是根因；候选转入企业人工审核，不能自动验证或责任归属。',
        buildEvidenceComparison(hypothesis)
      ),
      stage(
        'G4', '企业人工审核', 'current',
        '由企业责任人决定是否接受下一步核查动作。',
        '提交候选、证据比较和结论边界，让审核人批准、退回补证或停止。',
        '当前案例等待企业人工审核。',
        '审核只能批准下一步动作，不能批准 AI 根因、责任域或 OTA 因果。'
      ),
      stage(
        'G5', '制定验证协议', 'locked',
        '把候选转成可证伪的工程验证方案。',
        '冻结基线、单一干预、对照、判据和停止规则后，再启动工程验证。',
        `${missingData[0] || '待企业补充。'} 同时缺少 LCC 退出条件证据。`,
        '当前锁定：验证协议不能执行，也不能声明已经得到验证结果。'
      ),
      stage(
        'G6', '接收工程结果', 'locked',
        '判断工程运行结果支持、证伪还是仍不确定。',
        '只接收可追溯的回放或干预记录，并使用独立人工金标准进行评价。',
        missingData[2] || '待企业补充。',
        '当前锁定：不输出模型准确率或工程验证结论。'
      ),
      stage(
        'G7', '修复关闭与沉淀', 'locked',
        '确认修复是否有效，并把已验证经验转成可复用记录。',
        '核对修复版本、回归结果、效果检查和关闭批准后，才形成知识记录。',
        '当前没有修复、回归、效果检查或关闭批准记录。',
        '当前锁定：不生成 CAPA 关闭结论，也不评估 OTA 因果。'
      )
    ];

    return Object.freeze({
      caseId: caseItem.case_id,
      currentStageId: 'G4',
      opening: Object.freeze({
        dataLabel: '企业脱敏真实案例',
        problem,
        goal: 'AutoGuard 把异常报告推进成可审核、可验证的工程任务，而不是直接猜测根因。',
        status: '当前已形成受限候选，等待企业人工审核。'
      }),
      stages: Object.freeze(stages)
    });
  }

  return Object.freeze({ STORY_STEPS, buildStoryView, buildFlowModel });
});
