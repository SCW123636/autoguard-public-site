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

  function buildFlowModel(workbench) {
    const caseItem = requireFlowCase(workbench);
    const hypothesis = requireFirstHypothesis(caseItem);
    const enterprise = caseItem.enterprise || {};
    const engineering = caseItem.engineering || {};
    const confirmedFacts = Array.isArray(enterprise.confirmed_facts) ? enterprise.confirmed_facts : [];
    const missingData = Array.isArray(enterprise.missing_data) ? enterprise.missing_data : [];
    const missingEvidenceIds = Array.isArray(engineering.missing_evidence_ids) ? engineering.missing_evidence_ids : [];
    const evidenceItems = Array.isArray(engineering.evidence_items) ? engineering.evidence_items : [];
    const representativeEvidenceIds = evidenceItems
      .map((item) => item && item.evidence_id)
      .filter(Boolean)
      .slice(0, 3);
    const executionStatus = engineering.measurement_assessment && engineering.measurement_assessment.execution_status
      ? engineering.measurement_assessment.execution_status
      : 'NOT_EXECUTABLE_WITH_CURRENT_DATA';
    const evidenceSnapshotId = text(engineering.evidence_snapshot_id, 'UNKNOWN_SNAPSHOT');
    const candidateLabel = typeof hypothesis.mechanism_label === 'string'
      ? hypothesis.mechanism_label.trim()
      : '';
    if (!candidateLabel) {
      throw new Error('AutoGuardPresentation.buildFlowModel: required first hypothesis mechanism_label is missing for case RCA-EXT-005');
    }
    const validationAllowed = hypothesis.validation_allowed === true;
    const eventAttributionAllowed = hypothesis.event_attribution_allowed === true;
    const problem = text(enterprise.problem, '待企业补充');
    const reviewStatus = text(caseItem.review_status, 'REVIEW_REQUIRED');
    const nextAction = text(enterprise.next_action, '待企业补充');
    const g5MissingIds = missingEvidenceIds.filter((evidenceId) => (
      evidenceId === 'EV-RCA-EXT-005-MISSING-RAW-MCAP'
      || evidenceId === 'EV-RCA-EXT-005-MISSING-TIME-COORDINATE'
      || evidenceId === 'EV-RCA-EXT-005-MISSING-ENTITY-CONTINUITY'
      || evidenceId === 'EV-RCA-EXT-005-MISSING-ATTACHMENT-CONTENT'
    ));
    const otaMissingIds = missingEvidenceIds.filter((evidenceId) => evidenceId.includes('-MISSING-OTA-'));
    const stages = [
      {
        id: 'G1',
        code: 'G1',
        shortTitle: '定义问题',
        title: '定义问题',
        question: '公共数据里 RCA-EXT-005 的问题是什么？',
        inputLabel: '企业问题报告',
        inputItems: [problem],
        method: '读取 enterprise.problem，并把它当作问题陈述而不是已验证测量。',
        evidence: '当前公开脱敏数据支持问题被记录，尚不把报告文字改写为测量事实。',
        result: problem,
        output: '结构化问题简报与待补证据清单',
        gate: '可以进入证据整理，但不确认生产根因。',
        boundary: '只确认问题陈述，不把问题里的字面内容当作已验证测量或根因。',
        state: 'completed'
      },
      {
        id: 'G2',
        code: 'G2',
        shortTitle: '冻结证据',
        title: '冻结证据',
        question: '当前能被数据支持的事实有哪些？',
        inputLabel: '企业真实证据快照',
        inputItems: [
          `snapshot=${evidenceSnapshotId}`,
          `evidence_ids=${representativeEvidenceIds.join('、') || '待企业补充'}`
        ],
        method: '绑定 engineering.evidence_snapshot_id 和代表性 Evidence ID，保留可追溯引用但不把追溯性当作证据充分性。',
        evidence: '只使用当前快照中的公开脱敏派生观察，不补写原始日志内容。',
        result: [
          `snapshot=${evidenceSnapshotId}`,
          `evidence_ids=${representativeEvidenceIds.join('、') || '待企业补充'}`,
          confirmedFacts.join('；')
        ].join('；'),
        output: '冻结的可追溯证据结果',
        gate: '可进入受限候选形成，但证据可追溯不等于证据充分。',
        boundary: '证据可追溯不等于证据充分；confirmed_facts 只表示已确认的派生事实，不扩展为根因判断。',
        state: 'completed'
      },
      {
        id: 'G3',
        code: 'G3',
        shortTitle: '形成受限候选',
        title: '形成受限候选',
        question: '第一条候选机制是什么？',
        inputLabel: '案例与证据快照',
        inputItems: [
          `case_id=${caseItem.case_id}`,
          `snapshot=${evidenceSnapshotId}`
        ],
        method: '读取 engineering.hypotheses[0]，同步支持、反证和缺失引用。',
        evidence: '候选用于指导后续核查，不是根因，也不能用于责任归属。',
        result: [
          `candidate=${candidateLabel}`,
          `support=${(hypothesis.support_evidence_ids || []).join('、')}`,
          `counter=${(hypothesis.counter_evidence_ids || []).join('、') || '无'}`,
          `missing=${(hypothesis.missing_evidence_ids || []).join('、')}`,
          `validation_allowed=${String(validationAllowed)}`,
          `conclusion_level=${text(hypothesis.conclusion_level, 'CANDIDATE_ONLY')}`
        ].join('；'),
        output: '受限候选说明与证据比较',
        gate: '当前候选不允许自动验证或事件级归因，须进入企业人工审核。',
        boundary: '这是受限候选，不是根因，不允许自动验证或责任归属。',
        state: 'completed'
      },
      {
        id: 'G4',
        code: 'G4',
        shortTitle: '企业人工审核',
        title: '企业人工审核',
        question: '企业人工审核在当前证据边界内批准什么？',
        inputLabel: '企业人工审核输入',
        inputItems: [
          `review_status=${reviewStatus}`,
          `next_action=${nextAction}`
        ],
        method: '由企业审核当前证据引用、结论边界和下一步动作，而非批准 AI 自动确认根因。',
        evidence: '当前数据支持维持受限候选与停答边界，等待企业人工审核。',
        result: [
          `review_status=${reviewStatus}`,
          `next_action=${nextAction}`,
          enterprise.attribution_status || '当前仅形成受限候选，仍不能确认生产根因或责任归属。'
        ].join('；'),
        output: '待企业人工审核的下一步动作',
        gate: '完成人工审核后才可继续；审核仅可批准下一步动作，不批准生产根因、责任域或 OTA 因果。',
        boundary: '审核只批准下一步动作，不批准生产根因、责任归属或 OTA 因果。',
        state: 'current'
      },
      {
        id: 'G5',
        code: 'G5',
        shortTitle: '制定验证协议',
        title: '制定验证协议',
        question: '验证协议还缺哪些前置条件？',
        inputLabel: '验证前置条件',
        inputItems: [
          `validation_allowed=${String(validationAllowed)}`,
          missingData[0] || '待企业补充',
          missingData[1] || '待企业补充',
          ...g5MissingIds,
          'lcc_exit_condition_evidence_gap=EV-RCA-EXT-005-OBS-003'
        ],
        method: '解锁后冻结基线、单一干预、对照、判据和停止规则，再开始工程验证。',
        evidence: '当前没有原始 MCAP、时间坐标、实体连续性和退出条件，验证协议不能执行。',
        result: [
          missingData[0] || '待企业补充',
          missingData[1] || '待企业补充',
          `missing_prerequisite_refs=${g5MissingIds.join('、') || '待企业补充'}`,
          'lcc_exit_condition_evidence_gap=EV-RCA-EXT-005-OBS-003'
        ].join('；'),
        output: '验证协议未执行',
        gate: '锁定：不能声明工程验证已经开始或已经得到结果。',
        boundary: '锁定：原始 MCAP、时间坐标、实体连续性和 LCC 退出条件证据不足，不能声明验证协议已执行或已得到结果。',
        state: 'locked'
      },
      {
        id: 'G6',
        code: 'G6',
        shortTitle: '接收工程结果',
        title: '接收工程结果',
        question: '工程运行结果到达后如何接收和评价？',
        inputLabel: '工程测量状态与缺失前提',
        inputItems: [
          `measurement_assessment=${executionStatus}`,
          'engineering_run_results=ABSENT_IN_PUBLIC_CASE',
          'independent_gold_standard=EV-RCA-EXT-005-MISSING-GOLD-STANDARD'
        ],
        method: '解锁后仅接收可追溯的回放或干预运行记录，并归为支持、证伪、不确定或不可评估。',
        evidence: '当前缺少企业工程运行记录和独立人工金标准，不能计算准确率或评价工程效果。',
        result: [
          missingData[2] || '待企业补充',
          `validation_allowed=${String(validationAllowed)}`,
          `measurement_assessment=${executionStatus}`,
          'engineering_run_results=ABSENT_IN_PUBLIC_CASE',
          'independent_gold_standard=EV-RCA-EXT-005-MISSING-GOLD-STANDARD'
        ].join('；'),
        output: '无工程结果',
        gate: '锁定：不输出模型准确率或工程验证结论。',
        boundary: '锁定：当前没有工程运行结果和独立人工金标准，不能计算准确率或输出支持、证伪、不确定、不可评估之外的工程结论。',
        state: 'locked'
      },
      {
        id: 'G7',
        code: 'G7',
        shortTitle: '修复关闭与沉淀',
        title: '修复关闭与沉淀',
        question: '为什么当前不能进入修复关闭或知识沉淀？',
        inputLabel: '修复、回归与 OTA 事实边界',
        inputItems: [
          missingData[3] || '待企业补充',
          `ota_missing_refs=${otaMissingIds.join('、') || '待企业补充'}`,
          'repair_version=ABSENT_IN_PUBLIC_CASE',
          'regression_result=ABSENT_IN_PUBLIC_CASE',
          'effectiveness_check=ABSENT_IN_PUBLIC_CASE',
          'closure_approval=ABSENT_IN_PUBLIC_CASE'
        ],
        method: '解锁后核对可追溯的修复版本、回归结果、效果检查和关闭批准，再形成受条件约束的知识记录。',
        evidence: '当前没有修复、回归或关闭记录，也没有 OTA 活动、版本和变更模块事实。',
        result: [
          missingData[3] || '待企业补充',
          `ota_missing_refs=${otaMissingIds.join('、') || '待企业补充'}`,
          'repair_version=ABSENT_IN_PUBLIC_CASE',
          'regression_result=ABSENT_IN_PUBLIC_CASE',
          'effectiveness_check=ABSENT_IN_PUBLIC_CASE',
          'closure_approval=ABSENT_IN_PUBLIC_CASE'
        ].join('；'),
        output: '无关闭/CAPA 结论',
        gate: '锁定：不生成 CAPA 关闭结论，也不评估 OTA 因果。',
        boundary: '锁定：公共案例没有修复、回归、效果检查或关闭批准，也没有可评估的 OTA 事实；不生成 CAPA 关闭结论或 OTA 因果。',
        state: 'locked'
      }
    ].map((stage) => Object.freeze(stage));

    return Object.freeze({
      caseId: caseItem.case_id,
      problem,
      sourceNote: `Derived from public demo case ${caseItem.case_id} and evidence snapshot ${text(engineering.evidence_snapshot_id, 'UNKNOWN_SNAPSHOT')}; publication scope PUBLIC_DEMO_ONLY.`,
      currentStageId: 'G4',
      candidate: Object.freeze({
        label: candidateLabel,
        validationAllowed,
        supportEvidenceIds: Array.isArray(hypothesis.support_evidence_ids) ? hypothesis.support_evidence_ids.slice() : [],
        counterEvidenceIds: Array.isArray(hypothesis.counter_evidence_ids) ? hypothesis.counter_evidence_ids.slice() : [],
        missingEvidenceIds: Array.isArray(hypothesis.missing_evidence_ids) ? hypothesis.missing_evidence_ids.slice() : [],
        mechanismId: hypothesis.mechanism_id,
        conclusionLevel: hypothesis.conclusion_level,
        eventAttributionAllowed
      }),
      stages,
      summary: [
        `RCA-EXT-005 仍停在 G4`,
        `candidate=${candidateLabel}`,
        `problem=${problem}`,
        `missing=${missingData.join('、')}`
      ].join('；')
    });
  }

  return Object.freeze({ STORY_STEPS, buildStoryView, buildFlowModel });
});
