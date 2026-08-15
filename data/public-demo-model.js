(function attachAutoGuardPublicDemoModel(root, factory) {
  const model = factory();
  if (typeof module === 'object' && module.exports) module.exports = model;
  if (root) root.AutoGuardPublicDemoModel = model;
})(typeof window !== 'undefined' ? window : null, function createAutoGuardPublicDemoModel() {
  return {
  "currentStageId": "G4",
  "opening": {
    "dataLabel": "企业脱敏真实案例",
    "problem": "LCC：压合流线LCC未退出",
    "goal": "AutoGuard 把异常报告推进成可审核、可验证的工程任务，而不是直接猜测根因。",
    "status": "当前已形成受限候选，等待企业人工审核。"
  },
  "stages": [
    {
      "id": "G1",
      "code": "G1",
      "shortTitle": "定义问题",
      "title": "定义问题",
      "state": "completed",
      "purpose": "把企业报告转成可分析的问题边界。",
      "method": "识别功能域、异常现象和待验证对象，并把企业报告与已验证事实分开。",
      "finding": "企业报告的问题是“LCC：压合流线LCC未退出”。",
      "gate": "问题已经结构化，可以进入证据整理；当前不确认根因。"
    },
    {
      "id": "G2",
      "code": "G2",
      "shortTitle": "冻结证据",
      "title": "冻结证据",
      "state": "completed",
      "purpose": "确认当前数据究竟能证明什么。",
      "method": "固定当前证据快照，区分企业陈述、派生观察和缺失项，并保留底层审计引用。",
      "finding": "已纳入 8 条脱敏派生观察，其中支持方向 1 条、未观察检查 1 条、字段不足 6 条。",
      "gate": "证据已经固定，可以形成受限候选；可追溯不等于证据充分。"
    },
    {
      "id": "G3",
      "code": "G3",
      "shortTitle": "形成受限候选",
      "title": "形成受限候选",
      "state": "completed",
      "purpose": "避免看到异常后直接猜测根因。",
      "method": "同时比较支持、反证和缺失证据，只形成能够被后续核查的候选方向。",
      "finding": "当前形成“车道几何异常”受限候选。",
      "gate": "当前结果不是根因；候选转入企业人工审核，不能自动验证或责任归属。",
      "evidenceComparison": {
        "support": {
          "title": "支持",
          "items": [
            "车道几何质量检查出现支持性观察。"
          ]
        },
        "counter": {
          "title": "反证",
          "items": [
            "当前候选未引用反证。"
          ]
        },
        "missing": {
          "title": "缺失",
          "items": [
            "缺少原始 MCAP，无法复算信号和物理量。",
            "缺少统一时间坐标，无法完成事件级对齐。",
            "缺少实体连续性证据，无法确认目标关系贯穿事件。",
            "缺少 LCC 退出条件证据，无法判断退出逻辑是否满足。"
          ]
        }
      }
    },
    {
      "id": "G4",
      "code": "G4",
      "shortTitle": "企业人工审核",
      "title": "企业人工审核",
      "state": "current",
      "purpose": "由企业责任人决定是否接受下一步核查动作。",
      "method": "提交候选、证据比较和结论边界，让审核人批准、退回补证或停止。",
      "finding": "当前案例等待企业人工审核。",
      "gate": "审核只能批准下一步动作，不能批准 AI 根因、责任域或 OTA 因果。"
    },
    {
      "id": "G5",
      "code": "G5",
      "shortTitle": "制定验证协议",
      "title": "制定验证协议",
      "state": "locked",
      "purpose": "把候选转成可证伪的工程验证方案。",
      "method": "冻结基线、单一干预、对照、判据和停止规则后，再启动工程验证。",
      "finding": "原始 MCAP 未提供，无法复算信号和物理量。 同时缺少 LCC 退出条件证据。",
      "gate": "当前锁定：验证协议不能执行，也不能声明已经得到验证结果。"
    },
    {
      "id": "G6",
      "code": "G6",
      "shortTitle": "接收工程结果",
      "title": "接收工程结果",
      "state": "locked",
      "purpose": "判断工程运行结果支持、证伪还是仍不确定。",
      "method": "只接收可追溯的回放或干预记录，并使用独立人工确认结果（评价基准）进行评价。",
      "finding": "独立人工确认结果（评价基准）未提供，当前不能计算诊断准确率。",
      "gate": "当前锁定：不输出模型准确率或工程验证结论。"
    },
    {
      "id": "G7",
      "code": "G7",
      "shortTitle": "修复关闭与沉淀",
      "title": "修复关闭与沉淀",
      "state": "locked",
      "purpose": "确认修复是否有效，并把已验证经验转成可复用记录。",
      "method": "核对修复版本、回归结果、效果检查和关闭批准后，才形成知识记录。",
      "finding": "当前没有修复、回归、效果检查或关闭批准记录。",
      "gate": "当前锁定：不生成 CAPA 关闭结论，也不评估 OTA 因果。"
    }
  ],
  "deliverable": {
    "title": "企业最终得到什么",
    "items": [
      {
        "label": "问题边界",
        "value": "LCC：压合流线LCC未退出"
      },
      {
        "label": "证据边界",
        "value": "已纳入 8 条脱敏派生观察，其中支持方向 1 条、未观察检查 1 条、字段不足 6 条。"
      },
      {
        "label": "候选与门禁",
        "value": "当前形成“车道几何异常”受限候选，等待企业人工审核。"
      },
      {
        "label": "下一步动作",
        "value": "基于当前证据由人工审核受限候选及其支持、反证和缺失引用，不批准生产根因。"
      }
    ],
    "boundary": "交付内容用于限定下一步工程动作，不确认根因、责任域或 OTA 因果。"
  },
  "coverage": {
    "title": "真实案例覆盖情况",
    "metrics": [
      {
        "label": "真实案例总数",
        "value": 10
      },
      {
        "label": "受限候选案例",
        "value": 4
      },
      {
        "label": "终止性停答案例",
        "value": 6
      },
      {
        "label": "具备验证条件案例",
        "value": 0
      }
    ],
    "boundary": "覆盖情况只反映当前真实案例的门禁状态，不代表诊断准确率、普遍适用性、根因确认、OTA 因果或工程验证结果。"
  }
};
});
