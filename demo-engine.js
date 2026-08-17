(function attachAutoGuardDemoEngine(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AutoGuardDemoEngine = api;
})(typeof window !== 'undefined' ? window : null, function createAutoGuardDemoEngine() {
  const DECISION_LABELS = Object.freeze({
    LIMITED_CANDIDATES_READY: '形成受限候选，进入人工审核',
    TERMINAL_STOP: '证据不足，终止自动归因',
    EVIDENCE_TENSION_AND_STOP: '证据张力，保留双方并停答',
    SAFETY_PRIORITY_REVIEW_AND_STOP: '安全优先升级，技术归因停答',
    EVIDENCE_REFERENCE_BLOCKED: '证据引用无效，阻断本次分析',
    INPUT_REJECTED: '输入不完整，无法启动分析'
  });

  const TERMINAL_CODES = new Set([
    'TERMINAL_STOP',
    'EVIDENCE_TENSION_AND_STOP',
    'SAFETY_PRIORITY_REVIEW_AND_STOP',
    'EVIDENCE_REFERENCE_BLOCKED',
    'INPUT_REJECTED'
  ]);

  function asArray(value) {
    return Array.isArray(value) ? value : [];
  }

  function unique(values) {
    return [...new Set(asArray(values).filter((value) => typeof value === 'string' && value.trim()))];
  }

  function shortText(value, fallback) {
    return typeof value === 'string' && value.trim() ? value.trim() : fallback;
  }

  function validateInput(caseItem) {
    if (!caseItem || typeof caseItem !== 'object') return { valid: false, reason: '缺少案例输入。' };
    if (!caseItem.case_id || !caseItem.engineering?.evidence_snapshot_id) {
      return { valid: false, reason: '案例身份或证据快照缺失。' };
    }
    if (!caseItem.enterprise?.problem) return { valid: false, reason: '企业问题描述缺失。' };
    return { valid: true };
  }

  function collectKnownEvidenceIds(caseItem) {
    const engineering = caseItem.engineering || {};
    const observationIds = asArray(engineering.derived_observations)
      .flatMap((item) => asArray(item.evidence_ids));
    return new Set([
      ...asArray(engineering.evidence_items).map((item) => item?.evidence_id),
      ...asArray(engineering.missing_evidence_ids),
      ...observationIds
    ].filter(Boolean));
  }

  function collectReferencedEvidenceIds(caseItem) {
    return unique(asArray(caseItem.engineering?.hypotheses).flatMap((candidate) => [
      ...asArray(candidate.support_evidence_ids),
      ...asArray(candidate.counter_evidence_ids),
      ...asArray(candidate.missing_evidence_ids)
    ]));
  }

  function makeCandidate(candidate) {
    return {
      id: shortText(candidate.candidate_id, '未命名候选'),
      label: shortText(candidate.mechanism_label, shortText(candidate.mechanism_id, '未命名机制')),
      supportCount: asArray(candidate.support_evidence_ids).length,
      counterCount: asArray(candidate.counter_evidence_ids).length,
      missingCount: asArray(candidate.missing_evidence_ids).length,
      evidenceIds: unique([
        ...asArray(candidate.support_evidence_ids),
        ...asArray(candidate.counter_evidence_ids)
      ])
    };
  }

  function stage(id, title, status, summary, evidenceIds = []) {
    return { id, title, status, summary, evidenceIds: unique(evidenceIds) };
  }

  function runCase(caseItem) {
    const inputCheck = validateInput(caseItem);
    if (!inputCheck.valid) {
      const decision = {
        code: 'INPUT_REJECTED',
        label: DECISION_LABELS.INPUT_REJECTED,
        summary: inputCheck.reason,
        candidates: [],
        rootCauseClaimAllowed: false,
        otaCausalityClaimAllowed: false,
        nextAction: inputCheck.reason
      };
      return {
        input: { caseId: null, evidenceCount: 0, observationCount: 0, missingCount: 0 },
        audit: { invalidEvidenceIds: [], allEvidenceReferencesValid: false },
        stages: [stage('G1', '接收问题', 'INPUT_REJECTED', inputCheck.reason)],
        decision
      };
    }

    const engineering = caseItem.engineering;
    const knownIds = collectKnownEvidenceIds(caseItem);
    const referencedIds = collectReferencedEvidenceIds(caseItem);
    const invalidEvidenceIds = referencedIds.filter((evidenceId) => !knownIds.has(evidenceId));
    const observations = asArray(engineering.derived_observations);
    const candidates = asArray(engineering.hypotheses).map(makeCandidate);
    const input = {
      caseId: caseItem.case_id,
      title: shortText(caseItem.title, '未命名案例'),
      problem: caseItem.enterprise.problem,
      snapshotId: engineering.evidence_snapshot_id,
      evidenceCount: asArray(engineering.evidence_items).length,
      observationCount: observations.length,
      missingCount: asArray(engineering.missing_evidence_ids).length,
      rawMeasurementExecutable: engineering.measurement_assessment?.execution_status === 'EXECUTABLE',
      eventBindingCount: observations.filter((item) => item.temporal_binding === 'EVENT_BOUND').length
    };
    const audit = {
      invalidEvidenceIds,
      allEvidenceReferencesValid: invalidEvidenceIds.length === 0,
      citedEvidenceCount: referencedIds.length,
      snapshotBound: Boolean(input.snapshotId)
    };
    const stages = [
      stage(
        'G1',
        '问题定义',
        'QUESTION_CAPTURED',
        `识别为 ${shortText(caseItem.domain, '未知功能域')} 问题，保留企业原始描述，不把描述当作测量事实。`,
        asArray(engineering.evidence_items).filter((item) => item.evidence_id?.includes('-ISSUE')).map((item) => item.evidence_id)
      )
    ];

    if (invalidEvidenceIds.length > 0) {
      stages.push(stage('G2', '证据冻结', 'EVIDENCE_REFERENCE_BLOCKED', `发现 ${invalidEvidenceIds.length} 个快照外 Evidence ID，本次分析不继续。`, invalidEvidenceIds));
      stages.push(stage('G3', '候选分析', 'BLOCKED', '候选引用无法回溯到当前证据快照。'));
      stages.push(stage('G4', '企业人工审核', 'HUMAN_REVIEW_REQUIRED', '由企业责任人决定补齐引用或废弃本次运行。'));
      return {
        input,
        audit,
        stages,
        decision: {
          code: 'EVIDENCE_REFERENCE_BLOCKED',
          label: DECISION_LABELS.EVIDENCE_REFERENCE_BLOCKED,
          summary: `发现 ${invalidEvidenceIds.length} 个快照外 Evidence ID，本次分析不继续。`,
          candidates: [],
          rootCauseClaimAllowed: false,
          otaCausalityClaimAllowed: false,
          nextAction: '修正或补齐 Evidence ID 后重新冻结快照。'
        }
      };
    }

    stages.push(stage(
      'G2',
      '证据冻结',
      'EVIDENCE_FROZEN',
      `当前快照包含 ${input.evidenceCount} 条证据、${input.observationCount} 条派生观察；引用均可回溯。`,
      referencedIds.slice(0, 6)
    ));

    let decisionCode = 'TERMINAL_STOP';
    let decisionSummary = '当前支持线索不足，系统停止自动归因。';
    let decisionNextAction = '人工审核停答原因，并决定是否需要企业补证。';
    let selectedCandidates = [];

    if (caseItem.safety_route === 'SAFETY_PRIORITY_REVIEW') {
      decisionCode = 'SAFETY_PRIORITY_REVIEW_AND_STOP';
      decisionSummary = '报告涉及高后果风险，安全处置不等待技术根因确认。';
      decisionNextAction = '先进入企业安全责任路径，同时保留技术证据快照。';
    } else if (caseItem.evidence_tension_state === 'EVIDENCE_TENSION') {
      decisionCode = 'EVIDENCE_TENSION_AND_STOP';
      decisionSummary = '企业报告与派生观察存在未完成绑定的张力，不自动替任何一方裁决。';
      decisionNextAction = '人工核对双方 Evidence ID，决定补证、停答或建立验证任务。';
    } else if (candidates.some((candidate) => candidate.supportCount > 0)) {
      decisionCode = 'LIMITED_CANDIDATES_READY';
      selectedCandidates = candidates.filter((candidate) => candidate.supportCount > 0);
      decisionSummary = `形成 ${selectedCandidates.length} 个受限候选；候选只能作为本案排查方向。`;
      decisionNextAction = '由企业责任人审核支持、反证和缺失证据，再决定是否进入验证。';
    }

    stages.push(stage('G3', '受限候选与因果门禁', decisionCode, decisionSummary, selectedCandidates.flatMap((candidate) => candidate.evidenceIds)));
    stages.push(stage(
      'G4',
      '企业人工审核',
      'HUMAN_REVIEW_REQUIRED',
      TERMINAL_CODES.has(decisionCode) ? decisionNextAction : 'AI 只提交候选和证据边界，人工批准下一步动作，不批准根因。'
    ));

    return {
      input,
      audit,
      stages,
      decision: {
        code: decisionCode,
        label: DECISION_LABELS[decisionCode],
        summary: decisionSummary,
        candidates: selectedCandidates,
        rootCauseClaimAllowed: false,
        otaCausalityClaimAllowed: false,
        eventAttributionAllowed: false,
        nextAction: decisionNextAction
      }
    };
  }

  return Object.freeze({ DECISION_LABELS, runCase });
});
