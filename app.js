(() => {
  const MISSING_TEXT = "\u5f53\u524d\u6570\u636e\u672a\u63d0\u4f9b";
  const DEFAULT_CASE_ID = "RCA-EXT-005";
  const STAGE_IDS = ["G1", "G2", "G3", "G4", "G5", "G6", "G7"];
  const STAGE_STATE_LABELS = Object.freeze({
    completed: "\u5df2\u5b8c\u6210",
    current: "\u5f53\u524d\u9636\u6bb5",
    locked: "\u5df2\u9501\u5b9a"
  });
  const G1_PRE_VERIFICATION_FINDING = "\u672c\u9636\u6bb5\u4ec5\u8bb0\u5f55\u4f01\u4e1a\u62a5\u544a\u7684\u95ee\u9898\uff0c\u5c1a\u672a\u8fdb\u5165\u8bc1\u636e\u9a8c\u8bc1\u3002";

  function display(value, fallback = MISSING_TEXT) {
    if (Array.isArray(value)) return value.length ? value.join("\uff1b") : fallback;
    if (value === null || value === undefined) return fallback;
    const rendered = String(value).trim();
    return rendered || fallback;
  }

  function stageStateLabel(state) {
    return STAGE_STATE_LABELS[state] || display(state);
  }

  function getCaseSource() {
    return window.AutoGuardRealRcaCases ||
      window.AUTOGUARD_REAL_RCA_WORKBENCH ||
      { cases: [] };
  }

  function getRuntimeModel(caseItem) {
    const engine = window.AutoGuardDemoEngine;
    const presentation = window.AutoGuardPresentation;
    if (!engine || !presentation || !caseItem) return null;
    return presentation.buildCaseFlow(caseItem, engine.runCase(caseItem));
  }

  function App() {
    const cases = getCaseSource().cases || [];
    const [selectedId, setSelectedId] = React.useState(DEFAULT_CASE_ID);
    const [activeStageId, setActiveStageId] = React.useState("G1");
    const selectedCase = cases.find((item) => item.case_id === selectedId) || cases[0];
    const model = React.useMemo(() => getRuntimeModel(selectedCase), [selectedCase]);

    function selectCase(caseId) {
      setSelectedId(caseId);
      setActiveStageId("G1");
    }

    React.useEffect(() => {
      function handleKeyDown(event) {
        if (!model || (event.target && ["INPUT", "SELECT", "TEXTAREA"].includes(event.target.tagName))) return;
        const currentIndex = STAGE_IDS.indexOf(activeStageId);
        if (event.key === "ArrowLeft" && currentIndex > 0) {
          event.preventDefault();
          setActiveStageId(STAGE_IDS[currentIndex - 1]);
        }
        if (event.key === "ArrowRight" && currentIndex < STAGE_IDS.length - 1) {
          event.preventDefault();
          setActiveStageId(STAGE_IDS[currentIndex + 1]);
        }
      }
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeStageId, model]);

    if (!selectedCase || !model) {
      return h("div", { className: "app-shell single-case-empty" },
        h("main", { className: "single-case-flow" },
          h("h1", null, "AutoGuard"),
          h("p", null, "\u6682\u65e0\u53ef\u7528\u7684\u4f01\u4e1a\u6848\u4f8b\u3002")
        )
      );
    }

    const activeStage = model.stages.find((stage) => stage.id === activeStageId) || model.stages[0];
    return h("div", { className: "app-shell focused-demo-shell" },
      h("header", { className: "focused-demo-header" },
        h("div", { className: "brand-lockup" },
          h("span", { className: "brand-mark", "aria-hidden": "true" }, "AG"),
          h("div", null,
            h("strong", null, "AutoGuard"),
            h("span", null, "\u65e0\u4eba\u8f66\u5f02\u5e38\u884c\u4e3a\u6392\u67e5\u5de5\u5177\u7bb1")
          )
        ),
        h("span", { className: "case-header-id mono" }, display(model.opening.caseId))
      ),
      h("main", { className: "focused-demo-main" },
        h(DynamicCaseSelector, { cases, selectedId, onSelect: selectCase }),
        h(SingleCaseFlow, {
          model,
          activeStageId,
          onStageChange: setActiveStageId,
          activeStage,
          investigationGoal: model.opening.goal
        })
      )
    );
  }

  function DynamicCaseSelector({ cases, selectedId, onSelect }) {
    return h("section", { className: "case-selector", "aria-labelledby": "case-selector-title" },
      h("div", { className: "case-selector-copy" },
        h("span", { className: "eyebrow" }, "\u4f01\u4e1a\u6848\u4f8b"),
        h("h1", { id: "case-selector-title" }, "\u9009\u62e9\u6848\u4f8b\u67e5\u770b\u5b8c\u6574\u5f52\u56e0\u94fe"),
        h("p", null, "\u4ece\u5df2\u63d0\u4f9b\u7684\u8131\u654f\u771f\u5b9e\u6848\u4f8b\u4e2d\u9009\u62e9\uff0c\u6309 G1-G7 \u9605\u8bfb\u5f53\u524d\u8bc1\u636e\u548c\u95e8\u7981\u3002")
      ),
      h("label", { className: "case-selector-control", htmlFor: "case-selector-input" },
        h("span", null, "\u9009\u62e9\u4f01\u4e1a\u6848\u4f8b"),
        h("select", {
          id: "case-selector-input",
          value: selectedId,
          onChange: (event) => onSelect(event.target.value)
        },
        cases.map((item) => h("option", { key: item.case_id, value: item.case_id },
          display(item.case_id) + " \u00b7 " + display(item.domain) + " \u00b7 " + display(item.title)
        )))
      )
    );
  }

  function SingleCaseFlow({ model, activeStageId, onStageChange, activeStage, investigationGoal }) {
    return h("article", { className: "single-case-flow" },
      h("section", { className: "case-opening", "aria-labelledby": "case-opening-title" },
        h("div", { className: "case-opening-meta" },
          h("span", { className: "mono" }, display(model.opening.caseId)),
          h("span", null, display(model.opening.domain)),
          h("span", null, display(model.opening.snapshotId))
        ),
        h("h2", { id: "case-opening-title" }, display(model.opening.title)),
        h("div", { className: "case-opening-problem" },
          h("span", null, "\u4f01\u4e1a\u95ee\u9898\u539f\u6587"),
          h("p", null, display(model.opening.problem))
        ),
        h("div", { className: "case-opening-goal" },
          h("span", null, "\u672c\u6848\u6392\u67e5\u76ee\u6807"),
          h("p", null, display(investigationGoal))
        ),
        h("div", { className: "case-opening-status" },
          h("span", null, "\u5f53\u524d\u5904\u7406\u72b6\u6001"),
          h("strong", null, display(model.opening.decisionLabel)),
          h("span", { className: "mono" }, display(model.opening.decisionCode))
        )
      ),
      h(StageRail, { stages: model.stages, activeStageId, onStageChange }),
      h(StagePanel, { stage: activeStage, opening: model.opening }),
      h(StageNavigation, {
        stages: model.stages,
        activeStageId,
        onStageChange
      }),
      h(DemoCloseout, { deliverable: model.deliverable })
    );
  }

  function StageRail({ stages, activeStageId, onStageChange }) {
    return h("nav", { className: "stage-rail", "aria-label": "G1-G7 \u9636\u6bb5\u5bfc\u822a" },
      stages.map((stage) => h("button", {
        type: "button",
        key: stage.id,
        className: "stage-rail-tab " + (stage.id === activeStageId ? "active " : "") + (stage.state || ""),
        "aria-current": stage.id === activeStageId ? "step" : undefined,
        onClick: () => onStageChange(stage.id)
      },
      h("span", { className: "stage-rail-code mono" }, stage.id),
      h("span", null, display(stage.shortTitle))
      ))
    );
  }

  function StagePanel({ stage, opening = {} }) {
    if (!stage) return null;
    const isG1 = stage.id === "G1";
    return h("section", { className: "stage-panel", "aria-labelledby": "stage-panel-title" },
      h("div", { className: "stage-panel-heading" },
        h("span", { className: "eyebrow mono" }, display(stage.id)),
        h("h2", { id: "stage-panel-title" }, display(stage.title)),
        h("span", { className: "stage-state " + display(stage.state) }, stageStateLabel(stage.state))
      ),
      h("div", { className: "stage-panel-grid" },
        h(PanelBlock, {
          className: "stage-enterprise-question",
          label: isG1 ? "\u4f01\u4e1a\u62a5\u544a\uff08\u672a\u7ecf\u9a8c\u8bc1\uff09" : "\u4f01\u4e1a\u95ee\u9898",
          value: isG1 ? opening.problem : stage.purpose
        }),
        h(PanelBlock, {
          className: "stage-real-data-finding",
          label: "\u771f\u5b9e\u6570\u636e\u53d1\u73b0",
          value: isG1 ? G1_PRE_VERIFICATION_FINDING : stage.finding
        }),
        h(PanelBlock, { label: "\u6211\u4eec\u7684\u65b9\u5f0f", value: stage.method }),
        h(PanelBlock, { label: "\u4e0b\u4e00\u6b65\u95e8\u7981", value: stage.gate })
      ),
      stage.evidenceComparison
        ? h(EvidenceComparison, { comparison: stage.evidenceComparison })
        : null
    );
  }

  function PanelBlock({ className = "", label, value }) {
    return h("div", { className: "stage-panel-block " + className },
      h("span", null, label),
      h("p", null, display(value))
    );
  }

  function EvidenceComparison({ comparison }) {
    return h("section", { className: "evidence-comparison", "aria-label": "\u8bc1\u636e\u5bf9\u6bd4" },
      h("h3", null, "\u8bc1\u636e\u5bf9\u6bd4"),
      h("div", { className: "evidence-comparison-grid" },
        h(PanelBlock, { label: "\u652f\u6301\u65b9\u5411", value: comparison.support }),
        h(PanelBlock, { label: "\u53cd\u8bc1", value: comparison.counter }),
        h(PanelBlock, { label: "\u7f3a\u5931\u8bc1\u636e", value: comparison.missing })
      )
    );
  }

  function StageNavigation({ stages, activeStageId, onStageChange }) {
    const currentIndex = stages.findIndex((stage) => stage.id === activeStageId);
    const previous = stages[currentIndex - 1];
    const next = stages[currentIndex + 1];
    return h("div", { className: "stage-navigation", "aria-label": "\u9636\u6bb5\u7ffb\u9875" },
      h("button", {
        type: "button",
        onClick: () => previous && onStageChange(previous.id),
        disabled: !previous
      }, "\u2190 \u4e0a\u4e00\u9636\u6bb5"),
      h("span", null, String(currentIndex + 1) + " / " + String(stages.length)),
      h("button", {
        type: "button",
        onClick: () => next && onStageChange(next.id),
        disabled: !next
      }, "\u4e0b\u4e00\u9636\u6bb5 \u2192")
    );
  }

  function DemoCloseout({ deliverable }) {
    return h("section", { className: "demo-closeout", "aria-labelledby": "closeout-title" },
      h("div", null,
        h("span", { className: "eyebrow" }, "\u6848\u4f8b\u6536\u675f"),
        h("h2", { id: "closeout-title" }, "\u4f01\u4e1a\u6700\u7ec8\u5f97\u5230\u4ec0\u4e48"),
        h("p", null, display(deliverable.summary))
      ),
      h("dl", null,
        h("div", null, h("dt", null, "\u8bc1\u636e\u94fe\u72b6\u6001"), h("dd", null, display(deliverable.status))),
        h("div", null, h("dt", null, "\u5141\u8bb8\u7684\u5de5\u7a0b\u52a8\u4f5c"), h("dd", null, display(deliverable.nextAction))),
        h("div", null, h("dt", null, "\u6c38\u4e45\u8fb9\u754c"), h("dd", null, display(deliverable.boundary)))
      )
    );
  }

  function h(type, props, ...children) {
    return React.createElement(type, props, ...children);
  }

  ReactDOM.createRoot(document.getElementById("root")).render(h(App));
})();
