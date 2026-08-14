(() => {
  const { createElement: h, useEffect, useRef, useState } = React;

  function stateLabel(state) {
    return { completed: "已形成", current: "待审核", locked: "未解锁" }[state] || "待处理";
  }

  function Region({ title, children, tone = "" }) {
    return h("section", { className: `flow-region ${tone}` }, [
      h("h3", { key: "heading" }, title),
      h("div", { className: "flow-region-content", key: "content" }, children)
    ]);
  }

  function EvidenceList({ title, items, tone }) {
    return h("section", { className: `evidence-column ${tone}` }, [
      h("h4", { key: "heading" }, title),
      items.length
        ? h("ul", { key: "list" }, items.map((item) => h("li", { key: item }, item)))
        : h("p", { key: "empty" }, "当前快照未记录此类证据。")
    ]);
  }

  function StagePanel({ stage, model }) {
    const locked = stage.state === "locked";

    return h("article", {
      className: `stage-workspace ${locked ? "is-locked" : ""}`,
      id: `stage-panel-${stage.id}`,
      role: "tabpanel",
      "aria-labelledby": `stage-tab-${stage.id}`
    }, [
      h("header", { className: "stage-heading", key: "heading" }, [
        h("p", { className: "stage-code", key: "code" }, stage.code),
        h("div", { key: "title" }, [
          h("h2", { key: "name" }, stage.title),
          h("p", { key: "question" }, stage.question)
        ]),
        h("span", { className: `stage-state ${stage.state}`, key: "state" }, stateLabel(stage.state))
      ]),
      h(Region, { title: stage.inputLabel, key: "input" }, [
        h("ul", { key: "items" }, stage.inputItems.map((item) => h("li", { key: item }, item)))
      ]),
      h(Region, { title: "AutoGuard 方法", key: "method" }, [
        h("p", { key: "detail" }, stage.method)
      ]),
      h(Region, { title: "证据判断", key: "evidence" }, stage.id === "G3"
        ? h("div", { className: "evidence-comparison" }, [
          h(EvidenceList, { key: "support", title: "支持证据", items: model.candidate.supportEvidenceIds, tone: "support" }),
          h(EvidenceList, { key: "counter", title: "反证", items: model.candidate.counterEvidenceIds, tone: "counter" }),
          h(EvidenceList, { key: "missing", title: "缺失证据", items: model.candidate.missingEvidenceIds, tone: "missing" })
        ])
        : h("p", null, stage.evidence)),
      h(Region, { title: "本步输出与门禁", tone: locked ? "truth-boundary" : "", key: "output" }, [
        h("strong", { key: "output" }, stage.output),
        h("p", { key: "result" }, stage.result),
        h("p", { key: "gate" }, stage.gate),
        h("p", { className: "stage-boundary", key: "boundary" }, stage.boundary)
      ])
    ]);
  }

  function CompletionSummary({ model }) {
    const lockedStages = model.stages.filter((stage) => stage.state === "locked");
    return h("section", { className: "completion-summary", "aria-labelledby": "completion-title" }, [
      h("h2", { id: "completion-title", key: "title" }, "归因链在当前证据边界收束"),
      h("div", { className: "summary-columns", key: "columns" }, [
        h("section", { key: "delivered" }, [
          h("h3", null, "已交付"),
          h("p", null, "问题定义、可追溯事实、受限候选和人工审核边界。")
        ]),
        h("section", { key: "needed" }, [
          h("h3", null, "仍需企业数据"),
          h("ul", null, lockedStages.map((stage) => h("li", { key: stage.id }, stage.evidence)))
        ]),
        h("section", { key: "prohibited" }, [
          h("h3", null, "当前禁止声明"),
          h("p", null, "生产根因、责任域、OTA 因果、模型准确率、工程验证结果或 CAPA 关闭。")
        ])
      ])
    ]);
  }

  function App() {
    const model = window.AutoGuardPresentation.buildFlowModel(window.AutoGuardRealRcaData);
    const [activeStageId, setActiveStageId] = useState("G1");
    const pendingFocusStageId = useRef(null);
    const activeIndex = model.stages.findIndex((stage) => stage.id === activeStageId);
    const activeStage = model.stages[activeIndex];

    function selectIndex(nextIndex, moveFocus = false) {
      const boundedIndex = Math.max(0, Math.min(model.stages.length - 1, nextIndex));
      const nextStageId = model.stages[boundedIndex].id;
      if (moveFocus) pendingFocusStageId.current = nextStageId;
      setActiveStageId(nextStageId);
    }

    useEffect(() => {
      if (!pendingFocusStageId.current) return;
      document.getElementById(`stage-tab-${pendingFocusStageId.current}`)?.focus();
      pendingFocusStageId.current = null;
    }, [activeStageId]);

    useEffect(() => {
      function onKeyDown(event) {
        if (event.key === "ArrowLeft") selectIndex(activeIndex - 1, true);
        if (event.key === "ArrowRight") selectIndex(activeIndex + 1, true);
      }
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeIndex]);

    return h("div", { className: "single-case-flow" }, [
      h("header", { className: "site-header", key: "header" }, [
        h("div", { key: "brand" }, [
          h("strong", { key: "name" }, "AutoGuard"),
          h("span", { key: "product" }, "企业归因链演示")
        ]),
        h("span", { className: "real-data-label", key: "data" }, "企业脱敏真实案例派生数据")
      ]),
      h("main", { key: "main" }, [
        h("section", { className: "case-opening", "aria-labelledby": "case-title", key: "opening" }, [
          h("p", { className: "case-id", key: "id" }, model.caseId),
          h("h1", { id: "case-title", key: "title" }, model.problem),
          h("p", { className: "case-status", key: "status" }, "当前状态：已形成受限候选，等待企业人工审核。"),
          h("p", { key: "scope" }, "车辆侧仅进行只读日志传递；页面不进行车端推理或控制回写。")
        ]),
        h("nav", { className: "stage-rail", "aria-label": "完整归因链阶段", key: "rail" }, [
          h("div", { role: "tablist", "aria-label": "归因链阶段", key: "tabs" }, model.stages.map((stage) => h("button", {
            id: `stage-tab-${stage.id}`,
            type: "button",
            role: "tab",
            key: stage.id,
            className: `stage-tab ${stage.state} ${stage.id === activeStageId ? "is-active" : ""}`,
            "aria-selected": stage.id === activeStageId,
            "aria-controls": `stage-panel-${stage.id}`,
            tabIndex: stage.id === activeStageId ? 0 : -1,
            onClick: () => setActiveStageId(stage.id)
          }, `${stage.code} ${stage.shortTitle}`)))
        ]),
        h(StagePanel, { stage: activeStage, model, key: activeStage.id }),
        h("nav", { className: "stage-navigation", "aria-label": "阶段翻页", key: "navigation" }, [
          h("button", {
            type: "button",
            disabled: activeIndex === 0,
            onClick: () => selectIndex(activeIndex - 1),
            key: "previous"
          }, "上一步"),
          h("span", { key: "position" }, `${activeIndex + 1} / ${model.stages.length}`),
          h("button", {
            type: "button",
            disabled: activeIndex === model.stages.length - 1,
            onClick: () => selectIndex(activeIndex + 1),
            key: "continue"
          }, "继续")
        ]),
        activeStage.id === "G7" ? h(CompletionSummary, { model, key: "summary" }) : null
      ]),
      h("footer", { className: "calibration-note", key: "footer" }, "十个案例用于校准和测试方法行为；本页仅用一个代表性企业案例演示完整归因链。")
    ]);
  }

  ReactDOM.createRoot(document.getElementById("root")).render(h(App));
})();
