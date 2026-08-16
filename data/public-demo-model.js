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
      "title": "定义问题",
      "state": "completed",
      "question": "我们分析的到底是什么，哪些还只是企业报告？",
      "purpose": "把企业报告转成可分析的问题边界。",
      "method": "识别功能域、异常现象和待验证对象，并把企业报告与已验证事实分开。",
      "finding": "企业报告的问题是“LCC：压合流线LCC未退出”。",
      "gate": "问题已经结构化，可以进入证据整理；当前不确认根因。",
      "output": "结构化问题边界",
      "boundary": "问题描述是企业陈述，不等于已验证测量或根因。",
      "nextAction": "进入 G2，冻结当前证据。",
      "view": {
        "kind": "problem-boundary",
        "columns": [
          {
            "key": "report",
            "label": "企业报告",
            "state": "reported",
            "value": "LCC：压合流线LCC未退出"
          },
          {
            "key": "verified",
            "label": "已验证事实",
            "state": "verified",
            "value": "已识别企业问题所属功能域为 LCC，但未把问题描述中的数值当作已验证测量。"
          },
          {
            "key": "unobservable",
            "label": "不可观测项",
            "state": "gap",
            "value": "原始 MCAP 未提供，无法复算信号和物理量。"
          }
        ]
      },
      "code": "G1",
      "shortTitle": "定义问题"
    },
    {
      "id": "G2",
      "title": "冻结证据",
      "state": "completed",
      "question": "当前数据来自哪里，哪些证据已经固定，缺口在哪里？",
      "purpose": "确认当前数据究竟能证明什么。",
      "method": "固定当前证据快照，区分企业陈述、派生观察和缺失项，并保留底层审计引用。",
      "finding": "已纳入 8 条脱敏派生观察，其中支持方向 1 条、未观察检查 1 条、字段不足 6 条。",
      "gate": "证据已经固定，可以形成受限候选；可追溯不等于证据充分。",
      "output": "可追溯的证据快照与缺口清单",
      "boundary": "脱敏派生观察不能替代原始信号复算。",
      "nextAction": "进入 G3，只形成可以继续核查的候选。",
      "view": {
        "kind": "evidence-timeline",
        "nodes": [
          {
            "id": "G2-SOURCE",
            "label": "来源与案例身份",
            "detail": "来源文件、案例身份和哈希校验已通过，当前分析绑定不可变快照。",
            "state": "frozen"
          },
          {
            "id": "EV-RCA-EXT-005-OBS-001",
            "label": "脱敏派生观察纳入",
            "detail": "已纳入 8 条脱敏派生观察，其中支持方向 1 条、未观察检查 1 条、字段不足 6 条。",
            "state": "frozen"
          },
          {
            "id": "G2-GAP-RAW",
            "label": "关键证据缺口登记",
            "detail": "原始 MCAP 未提供，无法复算信号和物理量。",
            "state": "gap"
          }
        ]
      },
      "code": "G2",
      "shortTitle": "冻结证据"
    },
    {
      "id": "G3",
      "title": "形成受限候选",
      "state": "completed",
      "question": "现有证据支持什么方向，又是什么阻止我们下根因结论？",
      "purpose": "避免看到异常后直接猜测根因。",
      "method": "同时比较支持、反证和缺失证据，只形成能够被后续核查的候选方向。",
      "finding": "当前形成“车道几何异常”受限候选。",
      "gate": "当前结果不是根因；候选转入企业人工审核，不能自动验证或责任归属。",
      "output": "带支持、反证状态和缺口引用的受限候选",
      "boundary": "候选不是根因；未引用反证不等于反证已排除。",
      "nextAction": "提交 G4，由企业审核候选与证据边界。",
      "view": {
        "kind": "candidate-evidence",
        "candidate": {
          "label": "车道几何异常",
          "level": "受限候选，不是根因"
        },
        "support": [
          {
            "id": "EV-RCA-EXT-005-OBS-001",
            "label": "车道几何质量检查出现支持性观察",
            "tone": "support"
          }
        ],
        "counterStatus": "当前候选未引用反证，不等于反证已排除。",
        "missing": [
          {
            "id": "EV-RCA-EXT-005-MISSING-RAW-MCAP",
            "label": "缺少原始 MCAP，无法复算信号和物理量",
            "tone": "missing"
          },
          {
            "id": "EV-RCA-EXT-005-MISSING-TIME-COORDINATE",
            "label": "缺少统一时间坐标，无法完成事件级对齐",
            "tone": "missing"
          },
          {
            "id": "EV-RCA-EXT-005-MISSING-ENTITY-CONTINUITY",
            "label": "缺少实体连续性证据，无法确认目标关系贯穿事件",
            "tone": "missing"
          },
          {
            "id": "EV-RCA-EXT-005-OBS-003",
            "label": "缺少 LCC 退出条件证据",
            "tone": "missing"
          }
        ],
        "validationAllowed": false
      },
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
      },
      "code": "G3",
      "shortTitle": "形成受限候选"
    },
    {
      "id": "G4",
      "title": "企业人工审核",
      "state": "current",
      "question": "谁决定下一步，审核的对象是什么？",
      "purpose": "由企业责任人决定是否接受下一步核查动作。",
      "method": "提交候选、证据比较和结论边界，让审核人批准、退回补证或停止。",
      "finding": "当前案例等待企业人工审核。",
      "gate": "审核只能批准下一步动作，不能批准 AI 根因、责任域或 OTA 因果。",
      "output": "带审核留痕的下一步动作",
      "boundary": "人工审核的对象是候选和证据边界，不是 AI 根因。",
      "nextAction": "基于当前证据由人工审核受限候选及其支持、反证和缺失引用，不批准生产根因。",
      "view": {
        "kind": "human-gate",
        "status": "awaiting-human-review",
        "decision": "基于当前证据由人工审核受限候选及其支持、反证和缺失引用，不批准生产根因。",
        "approval": "人工审核只能批准下一步动作，不能批准根因、责任域或 OTA 因果。",
        "actions": [
          {
            "id": "approve-next",
            "label": "批准进入下一步核查",
            "state": "available"
          },
          {
            "id": "return-evidence",
            "label": "退回补充证据",
            "state": "available"
          },
          {
            "id": "stop-direction",
            "label": "停止当前候选方向",
            "state": "available"
          }
        ]
      },
      "code": "G4",
      "shortTitle": "企业人工审核"
    },
    {
      "id": "G5",
      "title": "制定验证协议",
      "state": "locked",
      "question": "怎样把候选变成真正可验证的工程任务？",
      "purpose": "把候选转成可证伪的工程验证方案。",
      "method": "冻结基线、单一干预、对照、判据和停止规则后，再启动工程验证。",
      "finding": "原始 MCAP 未提供，无法复算信号和物理量。 同时缺少 LCC 退出条件证据。",
      "gate": "当前锁定：验证协议不能执行，也不能声明已经得到验证结果。",
      "output": "可执行或明确不可执行的验证协议",
      "boundary": "关键输入不完整时，不生成虚构实验结果。",
      "nextAction": "补齐协议输入后，才能执行工程验证。",
      "view": {
        "kind": "validation-protocol",
        "executable": false,
        "status": "locked",
        "reason": "缺少原始 MCAP 和 LCC 退出条件证据，当前不能执行工程验证。",
        "steps": [
          {
            "id": "baseline",
            "label": "冻结基线",
            "state": "missing",
            "value": "当前数据未提供"
          },
          {
            "id": "intervention",
            "label": "单一干预",
            "state": "missing",
            "value": "当前数据未提供"
          },
          {
            "id": "control",
            "label": "建立对照",
            "state": "missing",
            "value": "当前数据未提供"
          },
          {
            "id": "criteria",
            "label": "预设判据",
            "state": "missing",
            "value": "当前数据未提供"
          },
          {
            "id": "stop-rule",
            "label": "停止规则",
            "state": "missing",
            "value": "当前数据未提供"
          }
        ]
      },
      "code": "G5",
      "shortTitle": "制定验证协议"
    },
    {
      "id": "G6",
      "title": "接收工程结果",
      "state": "locked",
      "question": "工程结果能支持、证伪，还是仍然不确定？",
      "purpose": "判断工程运行结果支持、证伪还是仍不确定。",
      "method": "只接收可追溯的回放或干预记录，并使用独立人工确认结果（评价基准）进行评价。",
      "finding": "独立人工确认结果（评价基准）未提供，当前不能计算诊断准确率。",
      "gate": "当前锁定：不输出模型准确率或工程验证结论。",
      "output": "支持、证伪或仍不确定的工程证据状态",
      "boundary": "没有真实工程结果和评价基准时，不能计算准确率。",
      "nextAction": "取得真实工程结果后，才能判断候选状态。",
      "view": {
        "kind": "engineering-result",
        "status": "locked",
        "result": "未提供回放、干预或独立人工确认结果。",
        "slots": [
          {
            "id": "support",
            "label": "支持候选",
            "state": "locked"
          },
          {
            "id": "refute",
            "label": "证伪候选",
            "state": "locked"
          },
          {
            "id": "uncertain",
            "label": "仍不确定",
            "state": "locked"
          }
        ]
      },
      "code": "G6",
      "shortTitle": "接收工程结果"
    },
    {
      "id": "G7",
      "title": "修复关闭与沉淀",
      "state": "locked",
      "question": "什么时候才能说问题已经关闭，历史证据怎样帮助未来案例？",
      "purpose": "确认修复是否有效，并把已验证经验转成可复用记录。",
      "method": "核对修复版本、回归结果、效果检查和关闭批准后，才形成知识记录。",
      "finding": "当前没有修复、回归、效果检查或关闭批准记录。",
      "gate": "当前锁定：不生成 CAPA 关闭结论，也不评估 OTA 因果。",
      "output": "可审计关闭记录和受边界约束的历史知识",
      "boundary": "历史案例只能帮助检索和核查，不能替代新案例证据。",
      "nextAction": "完成修复、回归、效果检查和批准后，才能关闭并沉淀。",
      "view": {
        "kind": "closure-loop",
        "status": "locked",
        "result": "未提供修复、回归、效果检查或关闭批准。",
        "steps": [
          {
            "id": "repair",
            "label": "修复版本",
            "state": "locked"
          },
          {
            "id": "regression",
            "label": "回归验证",
            "state": "locked"
          },
          {
            "id": "effect-check",
            "label": "效果检查",
            "state": "locked"
          },
          {
            "id": "approval",
            "label": "关闭批准",
            "state": "locked"
          },
          {
            "id": "knowledge",
            "label": "知识记录",
            "state": "locked"
          }
        ]
      },
      "code": "G7",
      "shortTitle": "修复关闭与沉淀"
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
    "title": "规则覆盖情况",
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
    "boundary": "规则覆盖情况只反映当前真实案例的门禁状态，不代表诊断准确率、普遍适用性、根因确认、OTA 因果或工程验证结果。"
  }
};
});
