(function attachAutoGuardPresentation(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AutoGuardPresentation = api;
})(typeof window !== 'undefined' ? window : null, function createAutoGuardPresentation() {
  const MISSING_TEXT = '当前数据未提供';
  const STORY_STEPS = Object.freeze([
    Object.freeze({ id: 'problem', label: '01 企业提出的问题' }),
    Object.freeze({ id: 'facts', label: '02 真实数据发现' }),
    Object.freeze({ id: 'judgment', label: '03 方法如何判断' }),
    Object.freeze({ id: 'missing', label: '04 永久边界' }),
    Object.freeze({ id: 'action', label: '05 企业下一步动作' })
  ]);

  const FLOW_STEPS = Object.freeze([
    Object.freeze({ id: 'G1', code: 'opening', shortTitle: '问题定义', title: 'G1 企业问题与场景' }),
    Object.freeze({ id: 'G2', code: 'evidence', shortTitle: '证据冻结', title: 'G2 证据冻结' }),
    Object.freeze({ id: 'G3', code: 'gate', shortTitle: '因果门禁', title: 'G3 受限候选与因果门禁' }),
    Object.freeze({ id: 'G4', code: 'action', shortTitle: '人工审核', title: 'G4 企业人工审核' }),
    Object.freeze({ id: 'G5', code: 'validation', shortTitle: '验证协议', title: 'G5 验证协议' }),
    Object.freeze({ id: 'G6', code: 'result', shortTitle: '工程结果', title: 'G6 工程验证结果' }),
    Object.freeze({ id: 'G7', code: 'closure', shortTitle: '修复关闭', title: 'G7 修复关闭与知识沉淀' })
  ]);

  function text(value, fallback = '待企业补充。') {
    return typeof value === 'string' && value.trim() ? value.trim() : fallback;
  }

  function list(value, fallback = '待企业补充。') {
    if (!Array.isArray(value) || value.length === 0) return fallback;
    return value.filter(Boolean).join('\n');
  }

  function currentData(value) {
    return typeof value === 'string' && value.trim() ? value.trim() : MISSING_TEXT;
  }

  function arrayText(values) {
    if (!Array.isArray(values) || values.length === 0) return MISSING_TEXT;
    const cleaned = values
      .map((item) => (typeof item === 'string' && item.trim() ? item.trim() : ''))
      .filter(Boolean);
    return cleaned.length > 0 ? cleaned.join('；') : MISSING_TEXT;
  }

  function countItems(value) {
    return Array.isArray(value) ? value.length : 0;
  }

  function countHypothesisEvidence(hypotheses, key) {
    if (!Array.isArray(hypotheses) || hypotheses.length === 0) return 0;
    return hypotheses.reduce((sum, item) => sum + countItems(item?.[key]), 0);
  }

  function hasTraceableField(value) {
    return value !== null && value !== undefined && (
      typeof value === 'string' ||
      typeof value === 'number' ||
      (typeof value === 'object' && Object.keys(value).length > 0)
    );
  }

  function describeTraceableField(value, fallback) {
    if (!hasTraceableField(value)) return fallback;
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    return text(value.status || value.summary || value.result || value.protocol, fallback);
  }

  function buildOpening(caseItem = {}, runResult = {}) {
    const enterprise = caseItem.enterprise || {};
    const engineering = caseItem.engineering || {};
    return {
      caseId: currentData(caseItem.case_id),
      title: currentData(caseItem.title),
      domain: currentData(caseItem.domain),
      problem: currentData(enterprise.problem),
      snapshotId: currentData(engineering.evidence_snapshot_id),
      decisionCode: currentData(runResult.decision?.code),
      decisionLabel: currentData(runResult.decision?.label),
      analysisState: currentData(caseItem.analysis_state)
    };
  }

  function buildEvidenceSummary(caseItem = {}) {
    const engineering = caseItem.engineering || {};
    const hypotheses = Array.isArray(engineering.hypotheses) ? engineering.hypotheses : [];
    return {
      evidenceCount: countItems(engineering.evidence_items),
      observationCount: countItems(engineering.derived_observations),
      candidateCount: hypotheses.length,
      supportCount: countHypothesisEvidence(hypotheses, 'support_evidence_ids'),
      counterCount: countHypothesisEvidence(hypotheses, 'counter_evidence_ids'),
      missingCount: countItems(engineering.missing_evidence_ids),
      snapshotId: currentData(engineering.evidence_snapshot_id),
      evidenceIds: arrayText(
        Array.isArray(engineering.evidence_items)
          ? engineering.evidence_items.map((item) => item?.evidence_id).filter(Boolean)
          : []
      )
    };
  }

  function buildCandidateComparison(caseItem = {}, runResult = {}) {
    const engineering = caseItem.engineering || {};
    const hypotheses = Array.isArray(engineering.hypotheses) ? engineering.hypotheses : null;
    if (!hypotheses || hypotheses.length === 0) {
      return {
        finding: text(runResult.decision?.summary, MISSING_TEXT),
        gate: text(runResult.decision?.nextAction, MISSING_TEXT),
        evidenceComparison: {
          support: MISSING_TEXT,
          counter: MISSING_TEXT,
          missing: MISSING_TEXT
        }
      };
    }

    const candidates = Array.isArray(runResult.decision?.candidates) ? runResult.decision.candidates : [];
    const selected = candidates.length > 0 ? candidates : hypotheses;
    return {
      finding: text(runResult.decision?.summary, MISSING_TEXT),
      gate: text(runResult.decision?.nextAction, MISSING_TEXT),
      evidenceComparison: {
        support: selected.map((candidate) => {
          const label = text(candidate.label || candidate.mechanism_label || candidate.mechanism_id, MISSING_TEXT);
          const evidenceCount = countItems(candidate.evidenceIds || candidate.support_evidence_ids);
          return `${label}(${evidenceCount}项)`;
        }).join('；') || MISSING_TEXT,
        counter: countHypothesisEvidence(hypotheses, 'counter_evidence_ids') > 0
          ? `${countHypothesisEvidence(hypotheses, 'counter_evidence_ids')}项反证`
          : MISSING_TEXT,
        missing: countHypothesisEvidence(hypotheses, 'missing_evidence_ids') > 0
          ? `${countHypothesisEvidence(hypotheses, 'missing_evidence_ids')}项缺失`
          : MISSING_TEXT
      }
    };
  }

  function hasValidReferences(runResult = {}) {
    return Boolean(
      runResult.audit &&
      runResult.audit.allEvidenceReferencesValid &&
      countItems(runResult.audit.invalidEvidenceIds) === 0
    );
  }

  function buildStageModels(caseItem = {}, runResult = {}) {
    const opening = buildOpening(caseItem, runResult);
    const evidenceSummary = buildEvidenceSummary(caseItem);
    const candidateComparison = buildCandidateComparison(caseItem, runResult);
    const validReferences = hasValidReferences(runResult);
    const invalidEvidenceIds = Array.isArray(runResult.audit?.invalidEvidenceIds)
      ? runResult.audit.invalidEvidenceIds
      : [];
    const engineering = caseItem.engineering || {};
    const futureData = {
      validation: engineering.validation_protocol,
      result: engineering.engineering_result,
      closure: engineering.closure
    };

    const futureState = (value) => hasTraceableField(value) ? 'completed' : 'locked';
    const futureFinding = (value, lockedLabel) => describeTraceableField(value, lockedLabel);
    const invalidReferenceLock = '当前阶段锁定：需先修正 Evidence ID 引用。';

    return [
      {
        ...FLOW_STEPS[0],
        state: opening.problem === MISSING_TEXT || opening.snapshotId === MISSING_TEXT ? 'current' : 'completed',
        purpose: '读取企业问题原文并固定本案边界。',
        method: '只展示企业已提供的案例编号、功能域和问题描述，不把主张当作验证结论。',
        finding: opening.problem,
        gate: opening.snapshotId
      },
      {
        ...FLOW_STEPS[1],
        state: validReferences ? 'completed' : 'current',
        purpose: '冻结当前快照内可回溯的证据与派生观察。',
        method: '统计本案证据项、派生观察、候选数量和缺失项，并核对 Evidence ID 是否仍属于当前快照。',
        finding: validReferences
          ? `当前快照 ${evidenceSummary.snapshotId} 含 ${evidenceSummary.evidenceCount} 条证据项、${evidenceSummary.observationCount} 条派生观察、${evidenceSummary.candidateCount} 个候选。`
          : `发现 ${invalidEvidenceIds.length} 个无效 Evidence ID：${arrayText(invalidEvidenceIds)}。`,
        gate: validReferences ? '引用校验通过' : `引用校验阻断：${arrayText(invalidEvidenceIds)}`
      },
      {
        ...FLOW_STEPS[2],
        state: validReferences ? 'completed' : 'locked',
        purpose: '基于当前快照形成受限候选或停答结论。',
        method: '结合支持、反证和缺失引用，输出受限候选、证据张力或终止性停答。',
        finding: candidateComparison.finding,
        gate: candidateComparison.gate,
        evidenceComparison: candidateComparison.evidenceComparison
      },
      {
        ...FLOW_STEPS[3],
        state: validReferences ? 'current' : 'locked',
        purpose: '把技术结论交回企业人工审核门禁。',
        method: '只提交下一步动作，不批准根因、责任域或 OTA 因果。',
        finding: currentData(caseItem.enterprise?.next_action),
        gate: currentData(caseItem.enterprise?.next_action)
      },
      {
        ...FLOW_STEPS[4],
        state: validReferences ? futureState(futureData.validation) : 'locked',
        purpose: '记录是否存在可追溯的验证协议。',
        method: '只有当案例明确提供验证协议时才允许继续到验证阶段。',
        finding: validReferences ? futureFinding(futureData.validation, MISSING_TEXT) : invalidReferenceLock,
        gate: validReferences ? futureFinding(futureData.validation, MISSING_TEXT) : invalidReferenceLock
      },
      {
        ...FLOW_STEPS[5],
        state: validReferences ? futureState(futureData.result) : 'locked',
        purpose: '记录是否存在工程验证结果。',
        method: '只有当案例明确提供工程验证结果时才允许继续到关闭阶段。',
        finding: validReferences ? futureFinding(futureData.result, MISSING_TEXT) : invalidReferenceLock,
        gate: validReferences ? futureFinding(futureData.result, MISSING_TEXT) : invalidReferenceLock
      },
      {
        ...FLOW_STEPS[6],
        state: validReferences ? futureState(futureData.closure) : 'locked',
        purpose: '记录是否存在修复关闭与知识沉淀。',
        method: '只有当案例明确提供关闭记录时才允许沉淀为知识。',
        finding: validReferences ? futureFinding(futureData.closure, MISSING_TEXT) : invalidReferenceLock,
        gate: validReferences ? futureFinding(futureData.closure, MISSING_TEXT) : invalidReferenceLock
      }
    ];
  }

  function buildDeliverable(caseItem = {}, runResult = {}) {
    const enterprise = caseItem.enterprise || {};
    return {
      boundary: '不确认根因，不确认责任域，不确认 OTA 因果。',
      status: text(enterprise.attribution_status, MISSING_TEXT),
      nextAction: currentData(enterprise.next_action),
      summary: text(runResult.decision?.summary, MISSING_TEXT),
      decisionCode: currentData(runResult.decision?.code)
    };
  }

  function buildCaseFlow(caseItem = {}, runResult = {}) {
    return {
      opening: buildOpening(caseItem, runResult),
      stages: buildStageModels(caseItem, runResult),
      deliverable: buildDeliverable(caseItem, runResult)
    };
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

  return Object.freeze({
    STORY_STEPS,
    FLOW_STEPS,
    buildOpening,
    buildEvidenceSummary,
    buildCandidateComparison,
    buildStageModels,
    buildDeliverable,
    buildCaseFlow,
    buildStoryView
  });
});
