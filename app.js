(() => {
  const PAGE_LABELS = {
    demo: "\u6848\u4F8B\u8BB2\u89E3",
    overview: "\u603B\u89C8",
    cases: "\u6848\u4F8B\u5206\u6790",
    method: "\u65B9\u6CD5\u9A8C\u8BC1",
    newData: "\u65B0\u6570\u636E\u5BA1\u6838"
  };
  const ANALYSIS_LABELS = {
    LIMITED_CANDIDATES_READY: "\u53D7\u9650\u5019\u9009\u5F85\u5BA1\u6838",
    TERMINAL_STOP: "\u7EC8\u6B62\u6027\u505C\u7B54"
  };
  const OBSERVATION_LABELS = {
    supporting_observation: "\u652F\u6301\u65B9\u5411",
    counter_evidence: "\u53CD\u8BC1",
    missing_evidence: "\u5B57\u6BB5\u4E0D\u8DB3"
  };
  const MEASUREMENT_STATUS_LABELS = {
    NOT_EXECUTABLE_WITH_CURRENT_DATA: "\u5F53\u524D\u6570\u636E\u4E0D\u53EF\u6267\u884C"
  };
  const RESPONSIBILITY_STATUS_LABELS = {
    UNDETERMINED_WITH_CURRENT_DATA: "\u5F53\u524D\u6570\u636E\u4E0D\u53EF\u5224\u5B9A"
  };
  const ROUTE_STATUS_LABELS = {
    VERIFIED_METHOD_BEHAVIOR: "\u771F\u5B9E\u6570\u636E\u5DF2\u9A8C\u8BC1\u65B9\u6CD5\u884C\u4E3A",
    PARTIALLY_VERIFIED: "\u95E8\u7981\u5DF2\u9A8C\u8BC1\uFF0C\u4F01\u4E1A\u6267\u884C\u5F85\u63A5\u5165",
    NOT_ASSESSED: "\u5F53\u524D\u4F01\u4E1A\u6570\u636E\u672A\u8986\u76D6",
    NOT_EVALUABLE_WITH_CURRENT_DATA: "\u5F53\u524D\u6570\u636E\u4E0D\u53EF\u8BC4\u4F30",
    METHOD_DEFINED_NOT_MEASURED: "\u65B9\u6CD5\u5DF2\u5B9A\u4E49\uFF0C\u5F85\u4F01\u4E1A\u5B9E\u6D4B",
    READY_FOR_ENTERPRISE_OPERATION: "\u5DF2\u5177\u5907\u4F01\u4E1A\u6267\u884C\u5DE5\u4EF6"
  };
  const ROUTE_NODE_DETAILS = {
    G1_PROBLEM_INTAKE: "\u628A\u62A5\u544A\u9648\u8FF0\u3001\u89C2\u5BDF\u3001\u5047\u8BBE\u3001\u671F\u671B\u548C\u672A\u77E5\u9879\u5206\u5F00\uFF0C\u5148\u56DE\u7B54\u53D1\u751F\u4E86\u4EC0\u4E48\u3002",
    G2_EVIDENCE_FREEZE: "\u6309 Case \u6C47\u805A\u591A\u7CFB\u7EDF\u6750\u6599\uFF0C\u51BB\u7ED3 Evidence ID\u3001\u54C8\u5E0C\u548C\u7248\u672C\u3002",
    G3_CANDIDATE_ANALYSIS: "AI \u53EA\u7ED9\u53D7\u9650\u5019\u9009\u3001\u652F\u6301\u3001\u53CD\u8BC1\u3001\u7F3A\u5931\u548C\u505C\u7B54\u6761\u4EF6\u3002",
    G4_ENTERPRISE_REVIEW: "\u6709\u6743\u9650\u7684\u4F01\u4E1A\u8D23\u4EFB\u4EBA\u5BA1\u6838\u8BC1\u636E\u8FB9\u754C\u548C\u4E0B\u4E00\u6B65\u52A8\u4F5C\u3002",
    G5_VALIDATION_PROTOCOL: "\u9884\u5148\u51BB\u7ED3\u57FA\u7EBF\u3001\u5E72\u9884\u3001\u5BF9\u7167\u3001\u5224\u636E\u548C\u505C\u6B62\u89C4\u5219\u3002",
    G6_ENGINEERING_RESULT: "\u5DE5\u7A0B\u7ED3\u679C\u53EA\u5141\u8BB8\u652F\u6301\u3001\u8BC1\u4F2A\u3001\u4E0D\u786E\u5B9A\u6216\u4E0D\u53EF\u8BC4\u4F30\u3002",
    G7_CAPA_CLOSURE: "\u6709\u4FEE\u590D\u3001\u56DE\u5F52\u3001\u6548\u679C\u548C\u5173\u95ED\u4E8B\u5B9E\u540E\uFF0C\u624D\u6C89\u6DC0\u53EF\u590D\u7528\u77E5\u8BC6\u3002"
  };
  const METHOD_ROUTE_FALLBACK = {
    summary: {
      requirement_count: 11,
      mainline_stage_count: 7,
      mainline_state: "ACTIVE_WITH_BOUNDED_STOPS",
      optional_branch_missing_blocks_mainline: false,
      vehicle_side_role: "LOG_AND_EVENT_INDEX_TRANSFER_ONLY"
    },
    requirements: [
      ["R1", "\u5148\u8FD8\u539F\u53D1\u751F\u4E86\u4EC0\u4E48\uFF0C\u518D\u8BA8\u8BBA\u539F\u56E0", ["G1_PROBLEM_INTAKE"], "VERIFIED_METHOD_BEHAVIOR"],
      ["R2", "\u591A\u7CFB\u7EDF\u6750\u6599\u56F4\u7ED5\u540C\u4E00 Case \u7EC4\u7EC7", ["G2_EVIDENCE_FREEZE"], "VERIFIED_METHOD_BEHAVIOR"],
      ["R3", "\u591A\u79CD\u89E3\u91CA\u4E0D\u80FD\u76F4\u63A5\u5B9A\u56E0", ["G3_CANDIDATE_ANALYSIS"], "VERIFIED_METHOD_BEHAVIOR"],
      ["R4", "OTA \u540E\u5F02\u5E38\u4E0D\u80FD\u76F4\u63A5\u5F52\u56E0 OTA", ["G3_OTA_GATE"], "NOT_ASSESSED"],
      ["R5", "AI \u8BCA\u65AD\u5FC5\u987B\u53D7\u4EBA\u5DE5\u76D1\u7763", ["G4_ENTERPRISE_REVIEW"], "PARTIALLY_VERIFIED"],
      ["R6", "\u590D\u6742\u573A\u666F\u9700\u8981\u770B\u6E05\u4EA4\u4E92\u5173\u7CFB", ["G3_SCENARIO_RECONSTRUCTION"], "NOT_EVALUABLE_WITH_CURRENT_DATA"],
      ["R7", "\u8F66\u7AEF\u5FC5\u987B\u8F7B\u91CF\u4E14\u4E0D\u5F71\u54CD\u63A7\u5236", ["VEHICLE_LOG_TRANSFER"], "METHOD_DEFINED_NOT_MEASURED"],
      ["R8", "\u5019\u9009\u5FC5\u987B\u88AB\u5DE5\u7A0B\u9A8C\u8BC1\u548C\u8BC1\u4F2A", ["G5_VALIDATION_PROTOCOL", "G6_ENGINEERING_RESULT"], "PARTIALLY_VERIFIED"],
      ["R9", "\u8D28\u91CF\u3001\u6CD5\u89C4\u548C\u5185\u90E8\u5BA1\u67E5\u9700\u8981\u5B8C\u6574\u8BC1\u636E\u5305", ["G2_EVIDENCE_FREEZE", "G4_ENTERPRISE_REVIEW", "G6_ENGINEERING_RESULT", "G7_CAPA_CLOSURE"], "VERIFIED_METHOD_BEHAVIOR"],
      ["R10", "\u5148\u9A8C\u8BC1\u65B9\u6CD5\u53EF\u9760\u6027\uFF0C\u4E0D\u80FD\u5305\u88C5\u6210\u51C6\u786E\u7387", ["M0_METHOD_VALIDATION"], "VERIFIED_METHOD_BEHAVIOR"],
      ["R11", "\u5386\u53F2\u6848\u4F8B\u5E2E\u52A9\u65B0 Case\uFF0C\u4F46\u4E0D\u80FD\u7167\u642C\u7ED3\u8BBA", ["G3_HISTORY_REFERENCE", "G7_CAPA_CLOSURE"], "NOT_EVALUABLE_WITH_CURRENT_DATA"]
    ].map(([requirement_id, problem, node_ids, current_status]) => ({ requirement_id, problem, node_ids, current_status })),
    nodes: [
      ["VEHICLE_LOG_TRANSFER", "INGRESS", "\u8F66\u7AEF\u53EA\u8BFB\u65E5\u5FD7\u4F20\u8F93", "VEHICLE_BOUNDARY", "METHOD_DEFINED_NOT_MEASURED"],
      ["G1_PROBLEM_INTAKE", "G1", "\u95EE\u9898\u5B9A\u4E49\u4E0E\u4E8B\u4EF6\u5305", "MAINLINE", "VERIFIED_METHOD_BEHAVIOR"],
      ["G2_EVIDENCE_FREEZE", "G2", "\u8BC1\u636E\u51BB\u7ED3\u4E0E\u8DE8\u7CFB\u7EDF\u5173\u8054", "MAINLINE", "VERIFIED_METHOD_BEHAVIOR"],
      ["G3_CANDIDATE_ANALYSIS", "G3", "\u5019\u9009\u3001\u53CD\u8BC1\u3001\u5F20\u529B\u4E0E\u505C\u7B54", "MAINLINE", "VERIFIED_METHOD_BEHAVIOR"],
      ["G3_SCENARIO_RECONSTRUCTION", "G3", "\u573A\u666F\u91CD\u5EFA\u5206\u652F", "OPTIONAL_PARALLEL_BRANCH", "NOT_EVALUABLE_WITH_CURRENT_DATA"],
      ["G3_OTA_GATE", "G3", "OTA \u56E0\u679C\u95E8\u7981\u5206\u652F", "OPTIONAL_PARALLEL_BRANCH", "NOT_ASSESSED"],
      ["G3_HISTORY_REFERENCE", "G3", "\u5386\u53F2\u6848\u4F8B\u53C2\u8003\u5206\u652F", "OPTIONAL_PARALLEL_BRANCH", "NOT_EVALUABLE_WITH_CURRENT_DATA"],
      ["G4_ENTERPRISE_REVIEW", "G4", "\u4F01\u4E1A\u8D23\u4EFB\u5BA1\u6838", "MAINLINE", "PARTIALLY_VERIFIED"],
      ["G5_VALIDATION_PROTOCOL", "G5", "\u53EF\u8BC1\u4F2A\u9A8C\u8BC1\u534F\u8BAE", "MAINLINE", "PARTIALLY_VERIFIED"],
      ["G6_ENGINEERING_RESULT", "G6", "\u5DE5\u7A0B\u9A8C\u8BC1\u4E0E\u5DEE\u5206\u7ED3\u679C", "MAINLINE", "NOT_EVALUABLE_WITH_CURRENT_DATA"],
      ["G7_CAPA_CLOSURE", "G7", "CAPA\u3001\u5173\u95ED\u4E0E\u77E5\u8BC6\u6C89\u6DC0", "MAINLINE", "NOT_EVALUABLE_WITH_CURRENT_DATA"],
      ["M0_METHOD_VALIDATION", "M0", "\u65B9\u6CD5\u884C\u4E3A\u4E0E\u8D8A\u754C\u9A8C\u8BC1", "ASSURANCE", "VERIFIED_METHOD_BEHAVIOR"],
      ["NEW_DATA_TRIAGE", "CROSS_STAGE", "\u65B0\u6570\u636E\u5206\u8BCA\u4E0E\u6700\u5C0F\u91CD\u8DD1", "CHANGE_IMPACT_CONTROLLER", "VERIFIED_METHOD_BEHAVIOR"]
    ].map(([node_id, stage, title, method_role, current_status]) => ({ node_id, stage, title, method_role, current_status })),
    runtime: { source: "static_initial", degraded: true, reason: "\u6B63\u5728\u8BFB\u53D6\u7EDF\u4E00\u65B9\u6CD5\u8DEF\u7EBF" }
  };
  const NEW_DATA_REVIEW_FALLBACK = {
    data_authority: "ENTERPRISE_PROVIDED_BASELINE_ONLY",
    new_arrival_data_class: "DEMO_INPUT_SYNTHETIC",
    demo_boundary: "\u6F14\u793A\u65B0\u589E\u5230\u8FBE\u9879\u4E0D\u5C5E\u4E8E\u4F01\u4E1A\u65B0\u589E\u4E8B\u5B9E\uFF0C\u4E0D\u5199\u5165\u4F01\u4E1A\u6570\u636E\u5305\u3002",
    baseline: { case_count: 10, evidence_item_count: 146 },
    scenarios: [],
    runtime: { source: "static_initial", degraded: true, reason: "\u6B63\u5728\u8BFB\u53D6\u65B0\u6570\u636E\u5BA1\u6838\u6F14\u793A" }
  };
  const REVIEW_STATE_LABELS = {
    ACCEPT_APPEND: "\u63A5\u53D7\u5E76\u8FFD\u52A0",
    LATE_APPEND_REOPEN: "\u8FDF\u5230\u8FFD\u52A0\u5E76\u91CD\u5F00",
    CONFLICT_PENDING: "\u51B2\u7A81\u5F85\u5BA1\u6838",
    DUPLICATE_NOOP: "\u91CD\u590D\u8BB0\u5F55\uFF0C\u4E0D\u91CD\u8DD1",
    EXCLUDED_NON_ENTERPRISE: "\u6392\u9664\u975E\u4F01\u4E1A\u6570\u636E",
    SAFETY_HOLD: "\u5B89\u5168\u6682\u505C",
    REVIEW_REQUIRED: "\u9700\u8981\u5B89\u5168\u590D\u6838",
    NORMAL: "\u65E0\u65B0\u589E\u5B89\u5168\u52A8\u4F5C",
    ACCEPT_WITH_TIME_LIMIT: "\u5E26\u65F6\u95F4\u9650\u5236\u63A5\u53D7",
    CONFLICT_SET_CREATED: "\u5DF2\u5EFA\u7ACB\u51B2\u7A81\u96C6"
  };
  function App() {
    const fallback = window.AUTOGUARD_REAL_RCA_WORKBENCH || { metrics: {}, boundaries: {}, cases: [] };
    const [source, setSource] = React.useState(fallback);
    const [enterpriseRoute, setEnterpriseRoute] = React.useState(METHOD_ROUTE_FALLBACK);
    const [newDataReview, setNewDataReview] = React.useState(NEW_DATA_REVIEW_FALLBACK);
    const [page, setPage] = React.useState("demo");
    const [mode, setMode] = React.useState("story");
    const [activeId, setActiveId] = React.useState("RCA-EXT-005");
    const [stepId, setStepId] = React.useState(window.AutoGuardPresentation.STORY_STEPS[0].id);
    const [query, setQuery] = React.useState("");
    React.useEffect(() => {
      let mounted = true;
      const client = window.AutoGuardAgentClient;
      if (!client) return void 0;
      client.loadWorkbench(window.fetch?.bind(window), fallback).then((payload) => {
        if (mounted && payload?.cases?.length) setSource(payload);
      });
      client.loadMethodRoute(window.fetch?.bind(window), METHOD_ROUTE_FALLBACK).then((payload) => {
        if (mounted && payload?.requirements?.length === 11) setEnterpriseRoute(payload);
      });
      client.loadNewDataReviewDemo(window.fetch?.bind(window), NEW_DATA_REVIEW_FALLBACK).then((payload) => {
        if (mounted && payload?.scenarios?.length) setNewDataReview(payload);
      });
      return () => {
        mounted = false;
      };
    }, []);
    const cases = source.cases || [];
    const activeCase = cases.find((item) => item.case_id === activeId) || cases[0];
    const visibleCases = cases.filter((item) => !query.trim() || `${item.case_id} ${item.title} ${item.domain}`.toLowerCase().includes(query.trim().toLowerCase()));
    function selectCase(caseId) {
      setActiveId(caseId);
      setStepId(window.AutoGuardPresentation.STORY_STEPS[0].id);
      setPage("cases");
    }
    if (!activeCase) return /* @__PURE__ */ React.createElement("div", { className: "empty-state" }, "\u771F\u5B9E\u6848\u4F8B\u5DE5\u4F5C\u53F0\u6570\u636E\u5C1A\u672A\u751F\u6210\u3002");
    return page === "demo" ? /* @__PURE__ */ React.createElement("div", { className: "app-shell focused-demo-shell" }, /* @__PURE__ */ React.createElement(FocusedDemoHeader, { onOpenWorkbench: () => setPage("overview") }), /* @__PURE__ */ React.createElement("main", { className: "focused-demo-main" }, /* @__PURE__ */ React.createElement(DemoWorkspace, { caseItem: activeCase, cases }))) : /* @__PURE__ */ React.createElement("div", { className: "app-shell" }, /* @__PURE__ */ React.createElement(Header, { source, page }), /* @__PURE__ */ React.createElement("div", { className: "workspace-layout" }, /* @__PURE__ */ React.createElement(
      Sidebar,
      {
        page,
        onPageChange: setPage,
        cases: visibleCases,
        activeId: activeCase.case_id,
        query,
        onQueryChange: setQuery,
        onSelect: selectCase
      }
    ), /* @__PURE__ */ React.createElement("main", { className: "workspace-main" }, page === "overview" && /* @__PURE__ */ React.createElement(OverviewWorkspace, { source, onOpenCase: selectCase }), page === "cases" && /* @__PURE__ */ React.createElement(
      CaseWorkspace,
      {
        caseItem: activeCase,
        mode,
        onModeChange: setMode,
        stepId,
        onStepChange: setStepId
      }
    ), page === "method" && /* @__PURE__ */ React.createElement(MethodWorkspace, { source, enterpriseRoute }), page === "newData" && /* @__PURE__ */ React.createElement(NewDataReviewWorkspace, { source, reviewDemo: newDataReview }))));
  }
  function FocusedDemoHeader({ onOpenWorkbench }) {
    return /* @__PURE__ */ React.createElement("header", { className: "focused-demo-header" }, /* @__PURE__ */ React.createElement("div", { className: "brand-lockup" }, /* @__PURE__ */ React.createElement("span", { className: "brand-mark", "aria-hidden": "true" }, "AG"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "AutoGuard"), /* @__PURE__ */ React.createElement("span", null, "\u65E0\u4EBA\u8F66\u5F02\u5E38\u884C\u4E3A\u6392\u67E5\u5DE5\u5177\u7BB1"))), /* @__PURE__ */ React.createElement("button", { type: "button", className: "focused-workbench-link", onClick: onOpenWorkbench }, "\u8FDB\u5165\u5B8C\u6574\u5DE5\u4F5C\u53F0"));
  }
  function Header({ source, page }) {
    return /* @__PURE__ */ React.createElement("header", { className: "topbar" }, /* @__PURE__ */ React.createElement("div", { className: "brand-lockup" }, /* @__PURE__ */ React.createElement("span", { className: "brand-mark", "aria-hidden": "true" }, "AG"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "AutoGuard"), /* @__PURE__ */ React.createElement("span", null, "\u65E0\u4EBA\u8F66\u5F02\u5E38\u884C\u4E3A\u6392\u67E5\u5DE5\u5177\u7BB1"))), /* @__PURE__ */ React.createElement("div", { className: "page-context" }, /* @__PURE__ */ React.createElement("span", null, "OTA \u540E\u884C\u4E3A\u9000\u5316 \xB7 \u8BC1\u636E\u9A71\u52A8\u65B9\u6CD5"), /* @__PURE__ */ React.createElement("strong", null, PAGE_LABELS[page])), /* @__PURE__ */ React.createElement("div", { className: "topbar-metrics", "aria-label": "\u6570\u636E\u8FB9\u754C" }, /* @__PURE__ */ React.createElement(Metric, { label: "\u4F01\u4E1A\u771F\u5B9E\u6848\u4F8B", value: source.metrics?.case_count ?? 10 }), /* @__PURE__ */ React.createElement(Metric, { label: "\u6570\u636E\u6765\u6E90\u5BA1\u8BA1", value: "\u901A\u8FC7", tone: "green" }), /* @__PURE__ */ React.createElement(Metric, { label: "\u539F\u59CB MCAP", value: "\u672A\u63D0\u4F9B", tone: "amber" })));
  }
  function Metric({ label, value, tone = "" }) {
    return /* @__PURE__ */ React.createElement("div", { className: `metric ${tone}` }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("strong", null, value));
  }
  function Sidebar({ page, onPageChange, cases, activeId, query, onQueryChange, onSelect }) {
    const navNumbers = { demo: "01", overview: "02", cases: "03", method: "04", newData: "05" };
    return /* @__PURE__ */ React.createElement("aside", { className: "sidebar", "aria-label": "\u5DE5\u4F5C\u53F0\u5BFC\u822A" }, /* @__PURE__ */ React.createElement("nav", { className: "primary-nav" }, Object.entries(PAGE_LABELS).map(([id, label]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        key: id,
        className: page === id ? "active" : "",
        onClick: () => onPageChange(id)
      },
      /* @__PURE__ */ React.createElement("span", { className: "nav-mark", "aria-hidden": "true" }, navNumbers[id]),
      /* @__PURE__ */ React.createElement("span", null, label)
    ))), /* @__PURE__ */ React.createElement("div", { className: `case-browser ${page === "cases" ? "visible" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "queue-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, "\u771F\u5B9E\u6848\u4F8B"), /* @__PURE__ */ React.createElement("span", null, cases.length, " \u4E2A\u7ED3\u679C")), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "search",
        value: query,
        onChange: (event) => onQueryChange(event.target.value),
        placeholder: "\u641C\u7D22\u6848\u4F8B\u6216\u529F\u80FD\u57DF",
        "aria-label": "\u641C\u7D22\u6848\u4F8B"
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "case-list" }, cases.map((item) => /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        key: item.case_id,
        className: `case-row ${item.case_id === activeId ? "active" : ""}`,
        onClick: () => onSelect(item.case_id)
      },
      /* @__PURE__ */ React.createElement("span", { className: "case-row-top" }, /* @__PURE__ */ React.createElement("span", { className: "mono" }, item.case_id), /* @__PURE__ */ React.createElement("b", null, item.domain)),
      /* @__PURE__ */ React.createElement("strong", null, item.title),
      /* @__PURE__ */ React.createElement("small", { className: stateTone(item) }, ANALYSIS_LABELS[item.analysis_state])
    )))), /* @__PURE__ */ React.createElement("div", { className: "sidebar-boundary" }, /* @__PURE__ */ React.createElement("strong", null, "\u7ED3\u8BBA\u8FB9\u754C"), /* @__PURE__ */ React.createElement("span", null, "\u89C4\u5219\u8986\u76D6\uFF0C\u4E0D\u662F\u8BCA\u65AD\u51C6\u786E\u7387")));
  }
  const LIVE_DEMO_CASE_IDS = ["RCA-EXT-005", "RCA-EXT-004", "RCA-EXT-008"];
  function LiveAnalysisDemo({ cases = [] }) {
    const availableCases = LIVE_DEMO_CASE_IDS.map((caseId) => cases.find((item) => item.case_id === caseId)).filter(Boolean);
    const [activeCaseId, setActiveCaseId] = React.useState("RCA-EXT-005");
    const [runResult, setRunResult] = React.useState(null);
    const [visibleStageIndex, setVisibleStageIndex] = React.useState(-1);
    const [isRunning, setIsRunning] = React.useState(false);
    const timerRef = React.useRef(null);
    const activeCase = availableCases.find((item) => item.case_id === activeCaseId) || availableCases[0];
    React.useEffect(() => () => window.clearTimeout(timerRef.current), []);
    if (!activeCase) return null;
    function resetRun(nextCaseId) {
      window.clearTimeout(timerRef.current);
      setActiveCaseId(nextCaseId);
      setRunResult(null);
      setVisibleStageIndex(-1);
      setIsRunning(false);
    }
    function revealNext(result, index) {
      timerRef.current = window.setTimeout(() => {
        setVisibleStageIndex(index);
        if (index < result.stages.length - 1) {
          revealNext(result, index + 1);
        } else {
          setIsRunning(false);
        }
      }, index === 0 ? 180 : 620);
    }
    function runAnalysis() {
      const engine = window.AutoGuardDemoEngine;
      if (!engine?.runCase) return;
      window.clearTimeout(timerRef.current);
      const result = engine.runCase(activeCase);
      setRunResult(result);
      setVisibleStageIndex(-1);
      setIsRunning(true);
      revealNext(result, 0);
    }
    const completed = runResult && visibleStageIndex >= runResult.stages.length - 1 && !isRunning;
    const selectedCandidateCount = activeCase.engineering?.hypotheses?.length || 0;
    return /* @__PURE__ */ React.createElement("section", { className: "live-analysis-demo", "aria-label": "AutoGuard \u8BC1\u636E\u9A71\u52A8\u8FD0\u884C\u6F14\u793A" }, /* @__PURE__ */ React.createElement("header", { className: "live-demo-heading" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u53EF\u8FD0\u884C\u6F14\u793A \xB7 \u4F01\u4E1A\u8131\u654F\u771F\u5B9E\u6848\u4F8B"), /* @__PURE__ */ React.createElement("h1", null, "\u4ECE\u6570\u636E\u8F93\u5165\uFF0C\u5230\u53EF\u5BA1\u6838\u7684\u56E0\u679C\u8BCA\u65AD\u5206\u6D41"), /* @__PURE__ */ React.createElement("p", null, "\u6BCF\u6B21\u8FD0\u884C\u90FD\u4ECE\u5F53\u524D\u6848\u4F8B\u7684\u51BB\u7ED3\u8BC1\u636E\u3001\u8BC1\u636E\u5F15\u7528\u548C\u7F3A\u5931\u9879\u91CD\u65B0\u5224\u65AD\uFF0C\u8F93\u51FA\u7684\u662F\u5141\u8BB8\u7684\u6392\u67E5\u52A8\u4F5C\uFF0C\u4E0D\u662F\u81EA\u52A8\u786E\u8BA4\u6839\u56E0\u3002")), /* @__PURE__ */ React.createElement("div", { className: "live-demo-runtime" }, /* @__PURE__ */ React.createElement("span", null, "\u8FD0\u884C\u65B9\u5F0F"), /* @__PURE__ */ React.createElement("strong", null, "\u672C\u5730\u53EF\u91CD\u590D\u6267\u884C"), /* @__PURE__ */ React.createElement("small", null, "\u4E0D\u5199\u5165\u4F01\u4E1A\u6570\u636E\u5305"))), /* @__PURE__ */ React.createElement("section", { className: "live-input-panel", "aria-label": "\u4F01\u4E1A\u771F\u5B9E\u6848\u4F8B\u8F93\u5165" }, /* @__PURE__ */ React.createElement("div", { className: "live-input-select" }, /* @__PURE__ */ React.createElement("label", { htmlFor: "live-case-select" }, "\u8F93\u5165\u6848\u4F8B"), /* @__PURE__ */ React.createElement("select", { id: "live-case-select", value: activeCase.case_id, onChange: (event) => resetRun(event.target.value), disabled: isRunning }, availableCases.map((item) => /* @__PURE__ */ React.createElement("option", { key: item.case_id, value: item.case_id }, item.case_id, " \xB7 ", item.title)))), /* @__PURE__ */ React.createElement("div", { className: "live-input-problem" }, /* @__PURE__ */ React.createElement("span", null, "\u4F01\u4E1A\u95EE\u9898"), /* @__PURE__ */ React.createElement("strong", null, activeCase.enterprise.problem)), /* @__PURE__ */ React.createElement("div", { className: "live-input-facts" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u51BB\u7ED3\u8BC1\u636E"), /* @__PURE__ */ React.createElement("strong", null, activeCase.engineering.evidence_items.length, " \u6761")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u6D3E\u751F\u89C2\u5BDF"), /* @__PURE__ */ React.createElement("strong", null, activeCase.engineering.derived_observations.length, " \u6761")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u5019\u9009\u5F15\u7528"), /* @__PURE__ */ React.createElement("strong", null, selectedCandidateCount, " \u7EC4")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u5173\u952E\u7F3A\u53E3"), /* @__PURE__ */ React.createElement("strong", null, activeCase.engineering.missing_evidence_ids.length, " \u9879"))), /* @__PURE__ */ React.createElement("button", { type: "button", className: "live-run-button", onClick: runAnalysis, disabled: isRunning }, isRunning ? "\u6B63\u5728\u8FD0\u884C\u8BC1\u636E\u95E8\u7981" : runResult ? "\u91CD\u65B0\u8FD0\u884C" : "\u8FD0\u884C\u8BC1\u636E\u8BCA\u65AD")), /* @__PURE__ */ React.createElement("section", { className: "live-method-line", "aria-label": "\u8FD0\u884C\u65B9\u6CD5" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "G1"), /* @__PURE__ */ React.createElement("strong", null, "\u95EE\u9898\u5B9A\u4E49"), /* @__PURE__ */ React.createElement("small", null, "autoguard-intake")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "G2"), /* @__PURE__ */ React.createElement("strong", null, "\u8BC1\u636E\u51BB\u7ED3"), /* @__PURE__ */ React.createElement("small", null, "autoguard-evidence-chain")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "G3"), /* @__PURE__ */ React.createElement("strong", null, "\u5019\u9009\u4E0E\u56E0\u679C\u95E8\u7981"), /* @__PURE__ */ React.createElement("small", null, "autoguard-candidate-analysis")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "G4"), /* @__PURE__ */ React.createElement("strong", null, "\u4F01\u4E1A\u4EBA\u5DE5\u5BA1\u6838"), /* @__PURE__ */ React.createElement("small", null, "autoguard-human-review"))), runResult && /* @__PURE__ */ React.createElement("section", { className: "live-run-output", "aria-live": "polite" }, /* @__PURE__ */ React.createElement("div", { className: "live-stage-list" }, runResult.stages.map((item, index) => {
      const isVisible = index <= visibleStageIndex;
      const isActive = isRunning && index === visibleStageIndex;
      return /* @__PURE__ */ React.createElement("article", { className: `live-stage ${isVisible ? "visible" : ""} ${isActive ? "active" : ""}`, key: item.id }, /* @__PURE__ */ React.createElement("span", null, item.id), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, item.title), /* @__PURE__ */ React.createElement("p", null, isVisible ? item.summary : "\u7B49\u5F85\u5F53\u524D\u8FD0\u884C\u5230\u8FBE\u6B64\u95E8\u7981\u3002")), /* @__PURE__ */ React.createElement("b", null, isVisible ? runStageLabel(item.status) : "\u5F85\u8FD0\u884C"));
    })), completed && /* @__PURE__ */ React.createElement(LiveDecision, { result: runResult })));
  }
  function LiveDecision({ result }) {
    const decision = result.decision;
    const decisionTone = decision.code === "LIMITED_CANDIDATES_READY" ? "green" : decision.code === "EVIDENCE_TENSION_AND_STOP" ? "cyan" : decision.code === "SAFETY_PRIORITY_REVIEW_AND_STOP" ? "red" : "amber";
    return /* @__PURE__ */ React.createElement("section", { className: `live-decision ${decisionTone}` }, /* @__PURE__ */ React.createElement("div", { className: "live-decision-main" }, /* @__PURE__ */ React.createElement("span", null, "\u672C\u6B21\u7CFB\u7EDF\u8F93\u51FA"), /* @__PURE__ */ React.createElement("h2", null, decision.label), /* @__PURE__ */ React.createElement("p", null, decision.summary), /* @__PURE__ */ React.createElement("p", { className: "live-decision-next" }, /* @__PURE__ */ React.createElement("b", null, "\u5141\u8BB8\u7684\u4E0B\u4E00\u6B65\uFF1A"), decision.nextAction)), /* @__PURE__ */ React.createElement("div", { className: "live-decision-boundaries" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u6839\u56E0\u786E\u8BA4"), /* @__PURE__ */ React.createElement("strong", null, "\u4E0D\u5141\u8BB8")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "OTA \u56E0\u679C"), /* @__PURE__ */ React.createElement("strong", null, "\u4E0D\u5141\u8BB8")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u8BC1\u636E\u5F15\u7528"), /* @__PURE__ */ React.createElement("strong", null, result.audit.allEvidenceReferencesValid ? "\u53EF\u56DE\u6EAF" : "\u5DF2\u963B\u65AD"))), decision.candidates.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "live-candidate-list" }, decision.candidates.map((candidate) => /* @__PURE__ */ React.createElement("div", { key: candidate.id }, /* @__PURE__ */ React.createElement("strong", null, candidate.label), /* @__PURE__ */ React.createElement("span", null, "\u652F\u6301 ", candidate.supportCount, " \xB7 \u53CD\u8BC1 ", candidate.counterCount, " \xB7 \u7F3A\u5931 ", candidate.missingCount)))));
  }
  function runStageLabel(status) {
    const labels = {
      QUESTION_CAPTURED: "\u5DF2\u63A5\u6536",
      EVIDENCE_FROZEN: "\u53EF\u56DE\u6EAF",
      LIMITED_CANDIDATES_READY: "\u53D7\u9650\u5019\u9009",
      TERMINAL_STOP: "\u505C\u7B54",
      EVIDENCE_TENSION_AND_STOP: "\u5F20\u529B\u505C\u7B54",
      SAFETY_PRIORITY_REVIEW_AND_STOP: "\u5B89\u5168\u5347\u7EA7",
      EVIDENCE_REFERENCE_BLOCKED: "\u5F15\u7528\u963B\u65AD",
      HUMAN_REVIEW_REQUIRED: "\u5F85\u4EBA\u5DE5\u5BA1\u6838",
      BLOCKED: "\u5DF2\u963B\u65AD"
    };
    return labels[status] || status;
  }
  function DemoWorkspace({ cases = [] }) {
    return /* @__PURE__ */ React.createElement("section", { className: "enterprise-issue-demo" }, /* @__PURE__ */ React.createElement(LiveAnalysisDemo, { cases }));
  }
  function OverviewWorkspace({ source, onOpenCase }) {
    const metrics = source.metrics || {};
    const cases = source.cases || [];
    const limited = metrics.analysis_state_distribution?.LIMITED_CANDIDATES_READY ?? 4;
    const stopped = metrics.analysis_state_distribution?.TERMINAL_STOP ?? 6;
    return /* @__PURE__ */ React.createElement("section", { className: "page-view overview-workspace" }, /* @__PURE__ */ React.createElement(
      PageHeading,
      {
        eyebrow: "\u4F01\u4E1A\u771F\u5B9E\u6570\u636E\u5206\u6790",
        title: "10 \u4E2A\u771F\u5B9E\u6848\u4F8B\uFF0C\u65B9\u6CD5\u7ED9\u51FA\u4E24\u7C7B\u5904\u7406\u8DEF\u5F84",
        detail: "\u5148\u5224\u65AD\u8BC1\u636E\u5141\u8BB8\u505A\u5230\u54EA\u91CC\uFF0C\u518D\u51B3\u5B9A\u7EE7\u7EED\u6392\u67E5\u3001\u660E\u786E\u505C\u7B54\u6216\u4F18\u5148\u5347\u7EA7\u3002"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "overview-metrics" }, /* @__PURE__ */ React.createElement(OverviewMetric, { label: "\u771F\u5B9E\u6848\u4F8B", value: metrics.case_count ?? 10, detail: "ACC\u3001FCW\u3001AEB/AWB\u3001LCC", tone: "ink" }), /* @__PURE__ */ React.createElement(OverviewMetric, { label: "\u53D7\u9650\u5019\u9009", value: limited, detail: "\u53EA\u4F5C\u4E3A Case \u5185\u6392\u67E5\u65B9\u5411", tone: "green" }), /* @__PURE__ */ React.createElement(OverviewMetric, { label: "\u7EC8\u6B62\u6027\u505C\u7B54", value: stopped, detail: "\u8BC1\u636E\u4E0D\u8DB3\u65F6\u505C\u6B62\u5F52\u56E0", tone: "amber" }), /* @__PURE__ */ React.createElement(OverviewMetric, { label: "\u8BC1\u636E\u5F20\u529B", value: metrics.evidence_tension_case_ids?.length ?? 2, detail: "\u4FDD\u7559\u53CC\u65B9\uFF0C\u4E0D\u81EA\u52A8\u88C1\u51B3", tone: "cyan" }), /* @__PURE__ */ React.createElement(OverviewMetric, { label: "\u5B89\u5168\u4F18\u5148", value: metrics.safety_priority_case_ids?.length ?? 1, detail: "\u5B89\u5168\u5347\u7EA7\u4E0E\u6280\u672F\u505C\u7B54\u5E76\u884C", tone: "red" })), /* @__PURE__ */ React.createElement("section", { className: "decision-overview" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u65B9\u6CD5\u5206\u6D41\u7ED3\u679C", detail: "\u540C\u4E00\u6279\u4F01\u4E1A\u771F\u5B9E\u6570\u636E\uFF0C\u7ECF\u5206\u7EA7\u8BC1\u636E\u95E8\u7981\u5F62\u6210 4 \u6848\u53D7\u9650\u5019\u9009\u30016 \u6848\u505C\u7B54\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "decision-bar", "aria-label": `${limited} \u4E2A\u53D7\u9650\u5019\u9009\uFF0C${stopped} \u4E2A\u505C\u7B54\u6848\u4F8B` }, /* @__PURE__ */ React.createElement("div", { className: "limited", style: { width: `${limited * 10}%` } }, /* @__PURE__ */ React.createElement("span", null, limited, " \u53D7\u9650\u5019\u9009")), /* @__PURE__ */ React.createElement("div", { className: "stopped", style: { width: `${stopped * 10}%` } }, /* @__PURE__ */ React.createElement("span", null, stopped, " \u505C\u7B54"))), /* @__PURE__ */ React.createElement("div", { className: "boundary-note" }, /* @__PURE__ */ React.createElement("strong", null, "\u8FD9\u662F\u4EC0\u4E48"), /* @__PURE__ */ React.createElement("span", null, "\u65B9\u6CD5\u5BF9\u771F\u5B9E\u6570\u636E\u7684\u89C4\u5219\u5904\u7406\u7ED3\u679C"), /* @__PURE__ */ React.createElement("strong", null, "\u8FD9\u4E0D\u662F\u4EC0\u4E48"), /* @__PURE__ */ React.createElement("span", null, "\u4E0D\u662F\u5019\u9009\u6B63\u786E\u7387\uFF0C\u4E5F\u4E0D\u662F\u751F\u4EA7\u8BCA\u65AD\u51C6\u786E\u7387"))), /* @__PURE__ */ React.createElement("div", { className: "overview-grid" }, /* @__PURE__ */ React.createElement("section", { className: "case-overview-list" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u6848\u4F8B\u5904\u7406\u6E05\u5355", detail: "\u5148\u770B\u4F01\u4E1A\u95EE\u9898\u4E0E\u5F53\u524D\u65B9\u6CD5\u51B3\u5B9A\uFF0C\u7EC6\u8282\u8FDB\u5165\u6848\u4F8B\u5206\u6790\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "overview-table", role: "table", "aria-label": "\u6848\u4F8B\u5904\u7406\u6E05\u5355" }, /* @__PURE__ */ React.createElement("div", { className: "overview-row overview-head", role: "row" }, /* @__PURE__ */ React.createElement("span", null, "\u6848\u4F8B"), /* @__PURE__ */ React.createElement("span", null, "\u4F01\u4E1A\u95EE\u9898"), /* @__PURE__ */ React.createElement("span", null, "\u65B9\u6CD5\u51B3\u5B9A"), /* @__PURE__ */ React.createElement("span", null)), cases.map((item) => /* @__PURE__ */ React.createElement("div", { className: "overview-row", role: "row", key: item.case_id }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("b", { className: "mono" }, item.case_id), /* @__PURE__ */ React.createElement("small", null, item.domain)), /* @__PURE__ */ React.createElement("strong", null, item.title), /* @__PURE__ */ React.createElement("span", { className: `status-text ${stateTone(item)}` }, caseDecisionLabel(item)), /* @__PURE__ */ React.createElement("button", { type: "button", className: "open-case", onClick: () => onOpenCase(item.case_id) }, "\u67E5\u770B"))))), /* @__PURE__ */ React.createElement("aside", { className: "method-summary" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u771F\u5B9E\u6570\u636E\u6539\u53D8\u4E86\u4EC0\u4E48", detail: "\u65B9\u6CD5\u89C4\u5219\u76F4\u63A5\u6765\u81EA\u5341\u6848\u5206\u6790\u3002" }), /* @__PURE__ */ React.createElement(InsightItem, { number: "01", title: "\u6709\u7A97\u53E3\u4E0D\u7B49\u4E8E\u4E8B\u4EF6\u7ED1\u5B9A", text: "73 \u6761\u89C2\u5BDF\u6709\u7A97\u53E3\uFF0C\u4F46\u5750\u6807\u7CFB\u5747\u672A\u58F0\u660E\uFF1B0 \u6761\u5B8C\u6210\u4E8B\u4EF6\u7EA7\u7ED1\u5B9A\u3002" }), /* @__PURE__ */ React.createElement(InsightItem, { number: "02", title: "\u5F02\u5E38\u6A21\u5F0F\u4E0D\u7B49\u4E8E\u6839\u56E0", text: "\u76EE\u6807\u8FD0\u52A8\u5B66\u3001\u8F66\u9053\u51E0\u4F55\u7B49\u6A21\u5F0F\u53EA\u80FD\u5F62\u6210\u6392\u67E5\u65B9\u5411\u3002" }), /* @__PURE__ */ React.createElement(InsightItem, { number: "03", title: "\u5B89\u5168\u5904\u7F6E\u4E0D\u7B49\u5F85\u5F52\u56E0", text: "RCA-EXT-008 \u5728\u6280\u672F\u505C\u7B54\u7684\u540C\u65F6\u8FDB\u5165\u5B89\u5168\u4F18\u5148\u8DEF\u5F84\u3002" }), /* @__PURE__ */ React.createElement(InsightItem, { number: "04", title: "\u5386\u53F2\u76F8\u4F3C\u53EA\u5E2E\u52A9\u68C0\u7D22", text: "\u8DE8\u6848\u4F8B\u91CD\u590D\u6A21\u5F0F\u4E0D\u80FD\u66FF\u4EE3\u5F53\u524D Case \u7684\u652F\u6301\u8BC1\u636E\u3002" }))));
  }
  function OverviewMetric({ label, value, detail, tone }) {
    return /* @__PURE__ */ React.createElement("div", { className: `overview-metric ${tone}` }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("strong", null, value), /* @__PURE__ */ React.createElement("small", null, detail));
  }
  function InsightItem({ number, title, text }) {
    return /* @__PURE__ */ React.createElement("div", { className: "insight-item" }, /* @__PURE__ */ React.createElement("span", { className: "mono" }, number), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, title), /* @__PURE__ */ React.createElement("p", null, text)));
  }
  function CaseWorkspace({ caseItem, mode, onModeChange, stepId, onStepChange }) {
    return /* @__PURE__ */ React.createElement("section", { className: "page-view case-workspace" }, /* @__PURE__ */ React.createElement(CaseHeader, { caseItem, mode, onModeChange }), /* @__PURE__ */ React.createElement(CaseStateBand, { caseItem }), mode === "story" ? /* @__PURE__ */ React.createElement(StoryWorkspace, { caseItem, stepId, onStepChange }) : /* @__PURE__ */ React.createElement(EngineeringWorkspace, { caseItem }));
  }
  function CaseHeader({ caseItem, mode, onModeChange }) {
    return /* @__PURE__ */ React.createElement("section", { className: "case-header" }, /* @__PURE__ */ React.createElement("div", { className: "case-title-row" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "mono" }, caseItem.case_id), /* @__PURE__ */ React.createElement("span", null, caseItem.domain)), /* @__PURE__ */ React.createElement("h1", null, caseItem.title)), /* @__PURE__ */ React.createElement(ModeSwitch, { mode, onChange: onModeChange })), /* @__PURE__ */ React.createElement("div", { className: "boundary-band" }, /* @__PURE__ */ React.createElement("strong", null, "\u4F01\u4E1A\u8131\u654F\u771F\u5B9E\u6848\u4F8B\u6D3E\u751F\u6570\u636E"), /* @__PURE__ */ React.createElement("span", null, "\u539F\u59CB MCAP \u672A\u63D0\u4F9B"), /* @__PURE__ */ React.createElement("span", null, "\u5F53\u524D\u4E0D\u80FD\u786E\u8BA4\u6839\u56E0"), /* @__PURE__ */ React.createElement("span", null, "\u8F66\u7AEF\u4EC5\u4F20\u9012\u65E5\u5FD7")));
  }
  function ModeSwitch({ mode, onChange }) {
    return /* @__PURE__ */ React.createElement("div", { className: "mode-switch", role: "group", "aria-label": "\u5C55\u793A\u6A21\u5F0F" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: mode === "story" ? "active" : "", onClick: () => onChange("story") }, "\u8BB2\u89E3\u6A21\u5F0F"), /* @__PURE__ */ React.createElement("button", { type: "button", className: mode === "engineering" ? "active" : "", onClick: () => onChange("engineering") }, "\u5DE5\u7A0B\u6A21\u5F0F"));
  }
  function CaseStateBand({ caseItem }) {
    const candidateCount = caseItem.engineering.hypotheses.length;
    return /* @__PURE__ */ React.createElement("div", { className: `case-state-band ${stateTone(caseItem)}` }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u5F53\u524D\u65B9\u6CD5\u51B3\u5B9A"), /* @__PURE__ */ React.createElement("strong", null, caseDecisionLabel(caseItem))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u5019\u9009\u673A\u5236"), /* @__PURE__ */ React.createElement("strong", null, candidateCount > 0 ? `${candidateCount} \u4E2A\uFF0C\u4EC5\u9650\u672C\u6848` : "\u4E0D\u751F\u6210\u5019\u9009")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u4EBA\u5DE5\u95E8\u7981"), /* @__PURE__ */ React.createElement("strong", null, "\u4F01\u4E1A\u8D23\u4EFB\u5BA1\u6838")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u6839\u56E0\u6743\u9650"), /* @__PURE__ */ React.createElement("strong", null, "\u7981\u6B62\u786E\u8BA4")));
  }
  function StoryWorkspace({ caseItem, stepId, onStepChange }) {
    const story = window.AutoGuardPresentation.buildStoryView(caseItem);
    const activeStep = story.steps.find((step) => step.id === stepId) || story.steps[0];
    return /* @__PURE__ */ React.createElement("section", { className: "story-workspace" }, /* @__PURE__ */ React.createElement("div", { className: "story-tabs", role: "tablist", "aria-label": "\u4F01\u4E1A\u95EE\u9898\u8BB2\u89E3\u6B65\u9AA4" }, story.steps.map((step) => /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        role: "tab",
        "aria-selected": step.id === activeStep.id,
        className: step.id === activeStep.id ? "active" : "",
        key: step.id,
        onClick: () => onStepChange(step.id)
      },
      step.label
    ))), /* @__PURE__ */ React.createElement(StoryPanel, { step: activeStep }), /* @__PURE__ */ React.createElement(CaseMethodResult, { caseItem }));
  }
  function StoryPanel({ step }) {
    return /* @__PURE__ */ React.createElement("article", { className: "story-panel", role: "tabpanel" }, /* @__PURE__ */ React.createElement("div", { className: "story-index" }, step.label.slice(0, 2)), /* @__PURE__ */ React.createElement("div", { className: "story-content" }, /* @__PURE__ */ React.createElement("span", { className: "section-label" }, "\u4F01\u4E1A\u95EE\u9898\u4E0E\u65B9\u6CD5\u54CD\u5E94"), /* @__PURE__ */ React.createElement("h2", null, step.question), /* @__PURE__ */ React.createElement("div", { className: "method-line" }, /* @__PURE__ */ React.createElement("span", null, "\u6211\u4EEC\u7684\u65B9\u5F0F"), /* @__PURE__ */ React.createElement("p", null, step.method)), /* @__PURE__ */ React.createElement("div", { className: "answer-block" }, /* @__PURE__ */ React.createElement("span", null, "\u771F\u5B9E\u6570\u636E\u56DE\u7B54"), paragraphs(step.answer)), /* @__PURE__ */ React.createElement("div", { className: "limit-line" }, /* @__PURE__ */ React.createElement("strong", null, "\u7ED3\u8BBA\u8FB9\u754C"), /* @__PURE__ */ React.createElement("p", null, step.boundary))));
  }
  function CaseMethodResult({ caseItem }) {
    const engineering = caseItem.engineering;
    if (caseItem.safety_route === "SAFETY_PRIORITY_REVIEW") {
      return /* @__PURE__ */ React.createElement("section", { className: "case-result safety" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u5B89\u5168\u8DEF\u5F84"), /* @__PURE__ */ React.createElement("h2", null, "\u5B89\u5168\u4F18\u5148\u5347\u7EA7\u4E0E\u6280\u672F\u505C\u7B54\u5E76\u884C")), /* @__PURE__ */ React.createElement("p", null, "\u4F01\u4E1A\u62A5\u544A\u6D89\u53CA\u9AD8\u540E\u679C\u98CE\u9669\uFF0C\u4F46\u5F53\u524D\u6570\u636E\u4E0D\u80FD\u786E\u8BA4\u78B0\u649E\u4E8B\u5B9E\u3001\u4F24\u5BB3\u7B49\u7EA7\u6216\u6280\u672F\u6839\u56E0\u3002\u5B89\u5168\u8D23\u4EFB\u8DEF\u5F84\u65E0\u9700\u7B49\u5F85\u6280\u672F\u5F52\u56E0\u7ED3\u675F\u3002"));
    }
    if (caseItem.evidence_tension_state === "EVIDENCE_TENSION") {
      return /* @__PURE__ */ React.createElement("section", { className: "case-result tension" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u8BC1\u636E\u5F20\u529B"), /* @__PURE__ */ React.createElement("h2", null, "\u62A5\u544A\u4E0E\u6D3E\u751F\u89C2\u5BDF\u540C\u65F6\u4FDD\u7559")), /* @__PURE__ */ React.createElement("p", null, "\u4E24\u4FA7 Evidence ID \u5747\u88AB\u4FDD\u7559\u4E3A `UNRESOLVED`\uFF0C\u7CFB\u7EDF\u4E0D\u81EA\u52A8\u5224\u65AD\u54EA\u4E00\u65B9\u6B63\u786E\uFF0C\u4E5F\u4E0D\u628A\u5F20\u529B\u6539\u5199\u6210\u6839\u56E0\u3002"));
    }
    if (caseItem.analysis_state === "LIMITED_CANDIDATES_READY") {
      return /* @__PURE__ */ React.createElement("section", { className: "candidate-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u53D7\u9650\u6392\u67E5\u5019\u9009", detail: "\u5019\u9009\u53EA\u7528\u4E8E\u672C\u6848\u6392\u67E5\u6392\u5E8F\uFF0C\u5747\u7981\u6B62\u4E8B\u4EF6\u5F52\u56E0\u548C\u6839\u56E0\u786E\u8BA4\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "candidate-list" }, engineering.hypotheses.map((candidate, index) => /* @__PURE__ */ React.createElement("article", { className: "candidate-row", key: candidate.candidate_id }, /* @__PURE__ */ React.createElement("span", { className: "candidate-rank" }, String(index + 1).padStart(2, "0")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, candidate.mechanism_label), /* @__PURE__ */ React.createElement("small", null, "\u652F\u6301 ", candidate.support_evidence_ids.length, " \xB7 \u53CD\u8BC1 ", candidate.counter_evidence_ids.length, " \xB7 \u7F3A\u5931 ", candidate.missing_evidence_ids.length)), /* @__PURE__ */ React.createElement("span", null, "\u4EC5\u9650\u672C\u6848")))));
    }
    return /* @__PURE__ */ React.createElement("section", { className: "case-result stop" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u7EC8\u6B62\u6027\u505C\u7B54"), /* @__PURE__ */ React.createElement("h2", null, "\u5F53\u524D\u8BC1\u636E\u4E0D\u8DB3\u4EE5\u5F62\u6210\u53EF\u5BA1\u8BA1\u5019\u9009")), /* @__PURE__ */ React.createElement("p", null, "\u7F3A\u5931\u9879\u5DF2\u767B\u8BB0\u4E3A\u6C38\u4E45\u53EF\u89C2\u6D4B\u6027\u9650\u5236\u3002\u7CFB\u7EDF\u505C\u6B62\u5F52\u56E0\uFF0C\u4F46\u4FDD\u7559\u8BC1\u636E\u5FEB\u7167\u548C\u4F01\u4E1A\u8D23\u4EFB\u5BA1\u6838\u8BB0\u5F55\u3002"));
  }
  function EngineeringWorkspace({ caseItem }) {
    const engineering = caseItem.engineering;
    return /* @__PURE__ */ React.createElement("section", { className: "engineering-workspace" }, /* @__PURE__ */ React.createElement("div", { className: "engineering-grid" }, /* @__PURE__ */ React.createElement("section", { className: "engineering-section snapshot-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u4E0D\u53EF\u53D8\u8BC1\u636E\u5FEB\u7167", detail: "\u5206\u6790\u7ED3\u679C\u4E0E\u6765\u6E90\u54C8\u5E0C\u7ED1\u5B9A\uFF0C\u8BC1\u636E\u53D8\u5316\u540E\u5FC5\u987B\u751F\u6210\u65B0\u5FEB\u7167\u3002" }), /* @__PURE__ */ React.createElement(KeyValue, { label: "Snapshot ID", value: engineering.evidence_snapshot_id, mono: true }), /* @__PURE__ */ React.createElement(KeyValue, { label: "\u5185\u5BB9\u54C8\u5E0C", value: engineering.content_hash, mono: true }), /* @__PURE__ */ React.createElement(KeyValue, { label: "\u6848\u4F8B SHA-256", value: engineering.source_hashes.case_sha256, mono: true }), /* @__PURE__ */ React.createElement(KeyValue, { label: "Manifest SHA-256", value: engineering.source_hashes.manifest_sha256, mono: true })), /* @__PURE__ */ React.createElement("section", { className: "engineering-section gate-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u5F53\u524D\u65B9\u6CD5\u95E8\u7981", detail: "\u7A97\u53E3\u3001\u5BF9\u9F50\u3001\u5019\u9009\u8303\u56F4\u548C\u5F52\u56E0\u6743\u9650\u5206\u522B\u5224\u65AD\u3002" }), /* @__PURE__ */ React.createElement("div", { className: `gate-callout ${stateTone(caseItem)}` }, /* @__PURE__ */ React.createElement("strong", null, ANALYSIS_LABELS[caseItem.analysis_state]), /* @__PURE__ */ React.createElement("p", null, "\u5BF9\u9F50\u65B9\u5F0F\uFF1A", engineering.alignment.method, " \xB7 \u7F6E\u4FE1\u5EA6\uFF1A", engineering.alignment.confidence), /* @__PURE__ */ React.createElement("code", null, caseItem.analysis_state), /* @__PURE__ */ React.createElement("span", null, "eventAttributionAllowed = false")))), /* @__PURE__ */ React.createElement("section", { className: "engineering-section scoring-boundary-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u8BC4\u5206\u5173\u952E\u8FB9\u754C", detail: "\u628A\u4F01\u4E1A\u8BC4\u5206\u8981\u6C42\u8868\u8FBE\u5B8C\u6574\uFF0C\u4F46\u4E0D\u628A\u7F3A\u5931\u5B57\u6BB5\u3001\u76EE\u6807\u89D2\u8272\u6216\u5019\u9009\u5173\u7CFB\u6539\u5199\u6210\u4E8B\u5B9E\u5F52\u56E0\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "scoring-boundary-grid" }, /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("span", null, "\u76EE\u6807\u89D2\u8272\u4E0E\u5B9E\u4F53\u8FDE\u7EED\u6027"), /* @__PURE__ */ React.createElement("strong", null, engineering.target_roles.join(" \xB7 ")), /* @__PURE__ */ React.createElement("p", null, engineering.alignment.entity_bindings.length, " \u4E2A\u89D2\u8272\u5747\u53EA\u6709\u62A5\u544A\u7EA7\u89D2\u8272\u4FE1\u606F\uFF0C\u76EE\u6807 ID \u4E0E\u8FDE\u7EED\u6027\u4E0D\u53EF\u9A8C\u8BC1\u3002")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("span", null, "\u6D4B\u91CF\u53EF\u6267\u884C\u6027"), /* @__PURE__ */ React.createElement("strong", null, MEASUREMENT_STATUS_LABELS[engineering.measurement_assessment.execution_status] || engineering.measurement_assessment.execution_status), /* @__PURE__ */ React.createElement("p", null, "\u903B\u8F91\u4FE1\u53F7\u7528\u4E8E\u8BF4\u660E\u5E94\u68C0\u67E5\u4EC0\u4E48\uFF1B\u5F53\u524D\u6CA1\u6709\u539F\u59CB\u8FDE\u7EED\u5E8F\u5217\u3001\u5355\u4F4D\u548C\u9608\u503C\uFF0C\u4E0D\u80FD\u590D\u7B97\u7269\u7406\u91CF\u3002")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("span", null, "\u975E\u5F52\u56E0\u5F0F\u56E0\u679C\u7ED3\u6784"), /* @__PURE__ */ React.createElement("strong", null, engineering.causal_structure.edges.length, " \u6761\u8BC1\u636E\u5173\u7CFB"), /* @__PURE__ */ React.createElement("p", null, "\u53EA\u8868\u8FBE\u652F\u6301\u3001\u53CD\u8BC1\u548C\u963B\u65AD\uFF0C\u4E0D\u5305\u542B\u201C\u5DF2\u7ECF\u5BFC\u81F4\u201D\u7684\u56E0\u679C\u8FB9\u3002")), /* @__PURE__ */ React.createElement("article", null, /* @__PURE__ */ React.createElement("span", null, "\u6280\u672F\u8D23\u4EFB\u8FB9\u754C"), /* @__PURE__ */ React.createElement("strong", null, RESPONSIBILITY_STATUS_LABELS[engineering.responsibility_boundary.status] || engineering.responsibility_boundary.status), /* @__PURE__ */ React.createElement("p", null, "\u5F53\u524D\u53EA\u5141\u8BB8\u4EBA\u5DE5\u5BA1\u6838\u8FB9\u754C\u548C\u4E0B\u4E00\u6B65\u52A8\u4F5C\uFF0C\u4E0D\u5141\u8BB8\u5206\u914D\u751F\u4EA7\u8D23\u4EFB\u57DF\u3002")))), engineering.hypotheses.length > 0 && /* @__PURE__ */ React.createElement("section", { className: "engineering-section observation-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u5019\u9009\u673A\u5236\u8BC1\u636E\u7ED1\u5B9A", detail: "\u6BCF\u4E2A\u5019\u9009\u540C\u65F6\u7ED1\u5B9A\u652F\u6301\u3001\u53CD\u8BC1\u3001\u7F3A\u5931\u8BC1\u636E\u548C\u66FF\u4EE3\u89E3\u91CA\u3002" }), /* @__PURE__ */ React.createElement(CandidateEvidenceTable, { candidates: engineering.hypotheses })), /* @__PURE__ */ React.createElement("section", { className: "engineering-section observation-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u6D3E\u751F\u89C2\u5BDF\u4E0E\u8BC1\u636E\u5F15\u7528", detail: "\u8FD9\u4E9B\u7ED3\u679C\u6765\u81EA\u8131\u654F\u6D3E\u751F\u68C0\u67E5\uFF0C\u4E0D\u662F\u91CD\u65B0\u8BA1\u7B97\u7684\u539F\u59CB\u6D4B\u91CF\u3002" }), /* @__PURE__ */ React.createElement(ObservationTable, { observations: engineering.derived_observations })), /* @__PURE__ */ React.createElement("div", { className: "engineering-grid lower-grid" }, /* @__PURE__ */ React.createElement("section", { className: "engineering-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u8BC1\u636E\u76EE\u5F55", detail: `${engineering.evidence_items.length} \u4E2A\u6709\u6548 Evidence ID` }), /* @__PURE__ */ React.createElement("div", { className: "evidence-catalog" }, engineering.evidence_items.map((item) => /* @__PURE__ */ React.createElement("div", { className: "evidence-entry", key: item.evidence_id }, /* @__PURE__ */ React.createElement("span", { className: "mono" }, item.evidence_id), /* @__PURE__ */ React.createElement("strong", null, item.data_class), /* @__PURE__ */ React.createElement("small", null, item.source, " \xB7 ", item.quality))))), /* @__PURE__ */ React.createElement("section", { className: "engineering-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u6C38\u4E45\u8FB9\u754C\u4E0E\u8D23\u4EFB\u5BA1\u6838", detail: "\u7F3A\u5931\u9879\u4E0D\u80FD\u901A\u8FC7\u9ED8\u8BA4\u503C\u6216\u5916\u90E8\u6848\u4F8B\u8865\u9F50\u3002" }), /* @__PURE__ */ React.createElement("ul", { className: "missing-list" }, engineering.missing_evidence_ids.map((id) => /* @__PURE__ */ React.createElement("li", { className: "mono", key: id }, id))), /* @__PURE__ */ React.createElement("div", { className: "review-callout" }, /* @__PURE__ */ React.createElement("strong", null, "\u4F01\u4E1A\u8D23\u4EFB\u5BA1\u6838"), /* @__PURE__ */ React.createElement("p", null, engineering.decision.next_action), /* @__PURE__ */ React.createElement("span", null, "\u53EA\u6279\u51C6\u4E0B\u4E00\u6B65\u52A8\u4F5C\uFF0C\u4E0D\u6279\u51C6\u751F\u4EA7\u6839\u56E0\uFF1B\u5BA1\u6838\u4EBA\u6570\u7531\u4F01\u4E1A\u5236\u5EA6\u51B3\u5B9A\u3002")))));
  }
  function CandidateEvidenceTable({ candidates }) {
    return /* @__PURE__ */ React.createElement("div", { className: "candidate-evidence-table", role: "table", "aria-label": "\u5019\u9009\u673A\u5236\u8BC1\u636E\u7ED1\u5B9A" }, /* @__PURE__ */ React.createElement("div", { className: "candidate-evidence-row candidate-evidence-head", role: "row" }, /* @__PURE__ */ React.createElement("span", null, "\u5019\u9009\u673A\u5236"), /* @__PURE__ */ React.createElement("span", null, "\u652F\u6301"), /* @__PURE__ */ React.createElement("span", null, "\u53CD\u8BC1"), /* @__PURE__ */ React.createElement("span", null, "\u7F3A\u5931"), /* @__PURE__ */ React.createElement("span", null, "\u8303\u56F4")), candidates.map((item) => /* @__PURE__ */ React.createElement("div", { className: "candidate-evidence-row", role: "row", key: item.candidate_id }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, item.mechanism_label), /* @__PURE__ */ React.createElement("small", { className: "mono" }, item.mechanism_id)), /* @__PURE__ */ React.createElement("span", null, item.support_evidence_ids.length), /* @__PURE__ */ React.createElement("span", null, item.counter_evidence_ids.length), /* @__PURE__ */ React.createElement("span", null, item.missing_evidence_ids.length), /* @__PURE__ */ React.createElement("span", null, "CASE_RELEVANT_ONLY"))));
  }
  function MethodWorkspace({ source, enterpriseRoute }) {
    const metrics = source.metrics || {};
    const route = enterpriseRoute || METHOD_ROUTE_FALLBACK;
    const nodes = route.nodes || [];
    const mainlineNodes = nodes.filter((node) => node.method_role === "MAINLINE");
    const branchNodes = nodes.filter((node) => node.method_role === "OPTIONAL_PARALLEL_BRANCH");
    const nodeById = new Map(nodes.map((node) => [node.node_id, node]));
    return /* @__PURE__ */ React.createElement("section", { className: "page-view method-workspace" }, /* @__PURE__ */ React.createElement(
      PageHeading,
      {
        eyebrow: "\u65B9\u6CD5\u9A8C\u8BC1",
        title: "\u65B9\u6CD5\u7531\u4F01\u4E1A\u771F\u5B9E\u6570\u636E\u6821\u51C6\uFF0C\u4E0D\u7531\u9884\u8BBE\u6D41\u7A0B\u66FF\u6570\u636E\u4F5C\u7B54",
        detail: "\u9A8C\u8BC1\u7CFB\u7EDF\u662F\u5426\u6B63\u786E\u6574\u7406\u8BC1\u636E\u3001\u9650\u5236\u5019\u9009\u3001\u505C\u7B54\u548C\u5347\u7EA7\uFF0C\u4E0D\u628A\u5341\u6848\u5305\u88C5\u6210\u6709\u6807\u51C6\u7B54\u6848\u7684\u51C6\u786E\u7387\u8003\u8BD5\u3002"
      }
    ), /* @__PURE__ */ React.createElement("section", { className: "method-data-band" }, /* @__PURE__ */ React.createElement(MethodDatum, { value: metrics.evidence_item_count ?? 146, label: "146 \u6761\u51BB\u7ED3\u8BC1\u636E" }), /* @__PURE__ */ React.createElement(MethodDatum, { value: metrics.derived_observation_count ?? 80, label: "80 \u6761\u6D3E\u751F\u89C2\u5BDF" }), /* @__PURE__ */ React.createElement(MethodDatum, { value: metrics.observations_with_window ?? 73, label: "73 \u6761\u5177\u6709\u65F6\u95F4\u7A97\u53E3" }), /* @__PURE__ */ React.createElement(MethodDatum, { value: metrics.observations_without_window ?? 7, label: "7 \u6761\u7F3A\u5C11 window_s", tone: "amber" }), /* @__PURE__ */ React.createElement(MethodDatum, { value: metrics.event_bound_observation_count ?? 0, label: "0 \u6761\u5B8C\u6210\u4E8B\u4EF6\u7EA7\u7ED1\u5B9A", tone: "red" })), /* @__PURE__ */ React.createElement("section", { className: "route-overview" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u5B8C\u6574\u94FE\u8DEF\u72B6\u6001", detail: "\u80FD\u529B\u94FE\u8DEF\u4FDD\u6301\u5B8C\u6574\uFF1B\u72B6\u6001\u53EA\u8BF4\u660E\u5F53\u524D\u4F01\u4E1A\u771F\u5B9E\u6570\u636E\u9A8C\u8BC1\u5230\u4E86\u54EA\u91CC\u3002" }), route.runtime?.degraded && /* @__PURE__ */ React.createElement("div", { className: "route-runtime-note" }, "\u5F53\u524D\u663E\u793A\u5185\u7F6E\u65B9\u6CD5\u57FA\u7EBF\uFF0C\u8DEF\u7EBF\u670D\u52A1\u672A\u8FDE\u63A5\uFF1B\u771F\u5B9E\u6848\u4F8B\u6570\u636E\u548C\u7ED3\u8BBA\u8FB9\u754C\u4E0D\u56E0\u6B64\u6539\u53D8\u3002"), /* @__PURE__ */ React.createElement("div", { className: "vehicle-boundary-line" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u8F66\u7AEF\u8FB9\u754C"), /* @__PURE__ */ React.createElement("strong", null, "\u53EA\u8BFB\u4F20\u9012\u65E5\u5FD7\u4E0E\u4E8B\u4EF6\u7D22\u5F15")), /* @__PURE__ */ React.createElement("p", null, "\u590D\u6742\u5206\u6790\u3001\u5019\u9009\u751F\u6210\u548C\u5BA1\u6838\u5747\u5728\u8F66\u5916\u5B8C\u6210\uFF0C\u4E0D\u8BFB\u53D6\u63A7\u5236\u6743\uFF0C\u4E0D\u5411\u8F66\u7AEF\u56DE\u5199\u63A7\u5236\u3002"), /* @__PURE__ */ React.createElement(RouteStatus, { status: nodeById.get("VEHICLE_LOG_TRANSFER")?.current_status })), /* @__PURE__ */ React.createElement("div", { className: "route-node-grid", "aria-label": "G1 \u5230 G7 \u5B8C\u6574\u4E3B\u7EBF" }, mainlineNodes.map((node) => /* @__PURE__ */ React.createElement("article", { className: "route-node", key: node.node_id }, /* @__PURE__ */ React.createElement("div", { className: "route-node-head" }, /* @__PURE__ */ React.createElement("span", { className: "mono" }, node.stage), /* @__PURE__ */ React.createElement(RouteStatus, { status: node.current_status, compact: true })), /* @__PURE__ */ React.createElement("strong", null, node.title), /* @__PURE__ */ React.createElement("p", null, ROUTE_NODE_DETAILS[node.node_id])))), /* @__PURE__ */ React.createElement("div", { className: "route-branches" }, /* @__PURE__ */ React.createElement("div", { className: "branch-intro" }, /* @__PURE__ */ React.createElement("span", null, "G3 \u53EF\u9009\u5E76\u884C\u5206\u652F"), /* @__PURE__ */ React.createElement("strong", null, "\u7F3A\u6570\u636E\u53EA\u5173\u95ED\u8BE5\u5206\u652F\uFF0C\u4E0D\u963B\u65AD\u666E\u901A RCA \u4E3B\u7EBF")), branchNodes.map((node) => /* @__PURE__ */ React.createElement("div", { className: "route-branch", key: node.node_id }, /* @__PURE__ */ React.createElement("strong", null, branchDisplayTitle(node)), /* @__PURE__ */ React.createElement(RouteStatus, { status: node.current_status })))), /* @__PURE__ */ React.createElement("div", { className: "route-assurance-line" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("b", null, "M0"), " \u65B9\u6CD5\u884C\u4E3A\u4E0E\u8D8A\u754C\u9A8C\u8BC1"), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("b", null, "\u65B0\u6570\u636E"), " \u5148\u5206\u8BCA\u5F71\u54CD\u8303\u56F4\uFF0C\u518D\u6700\u5C0F\u91CD\u8DD1\u53D7\u5F71\u54CD\u5DE5\u4EF6"))), /* @__PURE__ */ React.createElement("section", { className: "requirement-coverage" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "11 \u9879\u4F01\u4E1A\u9700\u6C42", detail: "\u4ECE\u4F01\u4E1A\u95EE\u9898\u51FA\u53D1\uFF0C\u8BF4\u660E\u7531\u54EA\u4E2A\u65B9\u6CD5\u8282\u70B9\u89E3\u51B3\uFF0C\u4EE5\u53CA\u5F53\u524D\u8BC1\u636E\u72B6\u6001\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "requirement-table", role: "table", "aria-label": "11 \u9879\u4F01\u4E1A\u9700\u6C42\u8986\u76D6" }, /* @__PURE__ */ React.createElement("div", { className: "requirement-row requirement-head", role: "row" }, /* @__PURE__ */ React.createElement("span", null, "\u4F01\u4E1A\u9700\u6C42"), /* @__PURE__ */ React.createElement("span", null, "\u89E3\u51B3\u65B9\u6CD5"), /* @__PURE__ */ React.createElement("span", null, "\u5F53\u524D\u8BC1\u636E\u72B6\u6001")), (route.requirements || []).map((requirement) => /* @__PURE__ */ React.createElement("div", { className: "requirement-row", role: "row", key: requirement.requirement_id }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("b", { className: "mono" }, requirement.requirement_id), /* @__PURE__ */ React.createElement("strong", null, requirement.problem)), /* @__PURE__ */ React.createElement("span", null, requirement.node_ids.map((nodeId) => nodeById.get(nodeId)?.title || nodeId).join(" + ")), /* @__PURE__ */ React.createElement(RouteStatus, { status: requirement.current_status }))))), /* @__PURE__ */ React.createElement("section", { className: "observation-audit" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u65F6\u95F4\u8BED\u4E49\u5BA1\u8BA1", detail: "\u6709\u7A97\u53E3\u548C\u5B8C\u6210\u4E8B\u4EF6\u7ED1\u5B9A\u662F\u4E24\u4E2A\u4E0D\u540C\u6761\u4EF6\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "audit-chart" }, /* @__PURE__ */ React.createElement("div", { className: "audit-bar" }, /* @__PURE__ */ React.createElement("div", { className: "windowed", style: { width: "91.25%" } }, /* @__PURE__ */ React.createElement("span", null, "73 \u6709\u7A97\u53E3")), /* @__PURE__ */ React.createElement("div", { className: "windowless", style: { width: "8.75%" } }, /* @__PURE__ */ React.createElement("span", null, "7 \u7F3A\u7A97\u53E3"))), /* @__PURE__ */ React.createElement("div", { className: "event-binding-zero" }, /* @__PURE__ */ React.createElement("strong", null, "0"), /* @__PURE__ */ React.createElement("span", null, "\u4E8B\u4EF6\u7EA7\u65F6\u95F4\u7ED1\u5B9A"))), /* @__PURE__ */ React.createElement("p", null, "73 \u6761\u7A97\u53E3\u5750\u6807\u7CFB\u5747\u672A\u58F0\u660E\uFF0C\u56E0\u6B64\u53EA\u80FD\u652F\u6301 Case \u7EA7\u76F8\u5173\u6027\uFF0C\u4E0D\u80FD\u8BC1\u660E\u89C2\u5BDF\u4E0E\u5F02\u5E38\u540C\u7A97\u3001\u5148\u540E\u6216\u5B58\u5728\u56E0\u679C\u3002")), /* @__PURE__ */ React.createElement("section", { className: "method-change-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u771F\u5B9E\u6570\u636E\u5982\u4F55\u6539\u53D8\u65B9\u6CD5", detail: "\u6BCF\u6761\u89C4\u5219\u90FD\u5BF9\u5E94\u5341\u6848\u4E2D\u5B9E\u9645\u51FA\u73B0\u7684\u95EE\u9898\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "method-change-table" }, /* @__PURE__ */ React.createElement(MethodChange, { finding: "73 \u6761\u89C2\u5BDF\u6709\u7A97\u53E3\uFF0C\u4F46\u5750\u6807\u7CFB\u672A\u58F0\u660E", risk: "\u76F4\u63A5\u6BD4\u8F83\u7A97\u53E3\u4F1A\u4EA7\u751F\u4F2A\u65F6\u5E8F", rule: "\u56FA\u5B9A\u4E3A Case \u7EA7\u76F8\u5173\uFF0C\u4E0D\u5141\u8BB8\u4E8B\u4EF6\u5F52\u56E0" }), /* @__PURE__ */ React.createElement(MethodChange, { finding: "7 \u6761\u89C2\u5BDF\u6CA1\u6709 window_s", risk: "\u65E0\u7A97\u53E3\u5F02\u5E38\u53EF\u80FD\u88AB\u5F53\u4F5C\u6280\u672F\u652F\u6301", rule: "\u4FDD\u7559\u5BA1\u8BA1\uFF0C\u4F46\u7981\u6B62\u8FDB\u5165\u652F\u6301\u8BC1\u636E" }), /* @__PURE__ */ React.createElement(MethodChange, { finding: "\u540C\u6848\u540C\u65F6\u5B58\u5728\u652F\u6301\u3001\u53CD\u8BC1\u548C\u7F3A\u5931", risk: "\u53EA\u663E\u793A\u652F\u6301\u9879\u4F1A\u9020\u6210\u5355\u4E00\u8DEF\u5F84\u504F\u89C1", rule: "\u5019\u9009\u5FC5\u987B\u540C\u65F6\u5F15\u7528\u4E09\u7C7B\u8BC1\u636E\u4E0E\u66FF\u4EE3\u89E3\u91CA" }), /* @__PURE__ */ React.createElement(MethodChange, { finding: "RCA-EXT-004\u3001010 \u51FA\u73B0\u8BC1\u636E\u5F20\u529B", risk: "AI \u81EA\u52A8\u9009\u8FB9\u4F1A\u5236\u9020\u786E\u5B9A\u6027", rule: "\u53CC\u8FB9 Evidence ID \u4FDD\u6301 UNRESOLVED" }), /* @__PURE__ */ React.createElement(MethodChange, { finding: "RCA-EXT-008 \u6D89\u53CA\u9AD8\u540E\u679C\u62A5\u544A", risk: "\u7B49\u5F85\u6839\u56E0\u4F1A\u5EF6\u8FDF\u5B89\u5168\u5904\u7F6E", rule: "\u5B89\u5168\u5347\u7EA7\u4E0E\u6280\u672F\u505C\u7B54\u5E76\u884C" }), /* @__PURE__ */ React.createElement(MethodChange, { finding: "\u4F01\u4E1A\u672A\u63D0\u4F9B\u5BA1\u6838\u7EC4\u7EC7\u89C4\u5219", risk: "\u65B9\u6CD5\u64C5\u81EA\u89C4\u5B9A\u4E24\u540D\u5BA1\u6838\u5458", rule: "\u4F01\u4E1A\u8D23\u4EFB\u4EBA\u95E8\u7981\uFF0C\u4EBA\u6570\u7531\u4F01\u4E1A\u5236\u5EA6\u51B3\u5B9A" }))), /* @__PURE__ */ React.createElement("div", { className: "verification-boundaries" }, /* @__PURE__ */ React.createElement("section", { className: "verified-scope" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u5F53\u524D\u5DF2\u9A8C\u8BC1", detail: "\u771F\u5B9E\u6570\u636E\u4E0A\u7684\u65B9\u6CD5\u884C\u4E3A" }), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "\u6765\u6E90\u5BA1\u8BA1\u3001\u8BC1\u636E\u51BB\u7ED3\u548C Evidence ID \u5F15\u7528"), /* @__PURE__ */ React.createElement("li", null, "\u53D7\u9650\u5019\u9009\u3001\u7EC8\u6B62\u6027\u505C\u7B54\u548C\u8D8A\u754C\u62D2\u7EDD"), /* @__PURE__ */ React.createElement("li", null, "\u8BC1\u636E\u5F20\u529B\u4FDD\u7559\u4E0E\u5B89\u5168\u4F18\u5148\u5347\u7EA7"), /* @__PURE__ */ React.createElement("li", null, "\u4F01\u4E1A\u8D23\u4EFB\u5BA1\u6838\u5165\u53E3\u4E0E\u5FEB\u7167\u5931\u6548"))), /* @__PURE__ */ React.createElement("section", { className: "unverified-scope" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u5F53\u524D\u672A\u9A8C\u8BC1", detail: "\u73B0\u6709\u4F01\u4E1A\u6570\u636E\u4E0D\u5177\u5907\u8BC4\u4EF7\u6761\u4EF6" }), /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "\u751F\u4EA7\u6839\u56E0\u6B63\u786E\u6027\u4E0E\u8D23\u4EFB\u57DF"), /* @__PURE__ */ React.createElement("li", null, "\u8BCA\u65AD\u51C6\u786E\u7387\u4E0E\u8DE8\u8F66\u578B\u6CDB\u5316"), /* @__PURE__ */ React.createElement("li", null, "OTA \u56E0\u679C\u3001\u56DE\u653E\u3001\u4FEE\u590D\u548C\u56DE\u5F52\u6548\u679C"), /* @__PURE__ */ React.createElement("li", null, "\u8F66\u7AEF\u8D44\u6E90\u5360\u7528\u4E0E\u5386\u53F2\u77E5\u8BC6\u5B9E\u9645\u6536\u76CA")))), /* @__PURE__ */ React.createElement("div", { className: "final-boundary" }, "\u57FA\u4E8E\u5F53\u524D\u4F01\u4E1A\u6570\u636E\uFF0C\u4E0D\u5F97\u58F0\u79F0\u5DF2\u7ECF\u786E\u8BA4\u6839\u56E0\u3001\u8FBE\u5230\u8BCA\u65AD\u51C6\u786E\u7387\u6216\u5EFA\u7ACB OTA \u56E0\u679C\u5173\u7CFB\u3002"));
  }
  function NewDataReviewWorkspace({ source, reviewDemo }) {
    const scenarios = reviewDemo?.scenarios || [];
    const [activeScenarioId, setActiveScenarioId] = React.useState("NEW_LOG_APPEND");
    const activeScenario = scenarios.find((item) => item.scenario_id === activeScenarioId) || scenarios[0];
    if (!activeScenario) {
      return /* @__PURE__ */ React.createElement("section", { className: "page-view" }, /* @__PURE__ */ React.createElement("div", { className: "review-demo-loading" }, "\u6B63\u5728\u8BFB\u53D6\u65B0\u6570\u636E\u5BA1\u6838\u89C4\u5219\u3002"));
    }
    return /* @__PURE__ */ React.createElement("section", { className: "page-view new-data-workspace" }, /* @__PURE__ */ React.createElement(
      PageHeading,
      {
        eyebrow: "\u65B0\u6570\u636E\u5BA1\u6838",
        title: "\u65B0\u6570\u636E\u5148\u6539\u53D8\u8BC1\u636E\u7248\u672C\uFF0C\u518D\u51B3\u5B9A\u54EA\u4E9B\u5206\u6790\u9700\u8981\u91CD\u5F00",
        detail: "\u5BA1\u6838\u7684\u5BF9\u8C61\u662F\u6570\u636E\u80FD\u5426\u8FDB\u5165\u3001\u5F71\u54CD\u5230\u54EA\u91CC\u548C\u4E0B\u4E00\u6B65\u5141\u8BB8\u505A\u4EC0\u4E48\uFF0C\u4E0D\u662F\u8BA9 AI \u501F\u65B0\u6570\u636E\u76F4\u63A5\u6539\u5199\u6839\u56E0\u3002"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "new-data-boundary-band" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u4F01\u4E1A\u771F\u5B9E\u57FA\u7EBF"), /* @__PURE__ */ React.createElement("strong", null, source.metrics?.case_count ?? 10, " \u4E2A\u771F\u5B9E\u6848\u4F8B \xB7 ", source.metrics?.evidence_item_count ?? 146, " \u6761\u51BB\u7ED3\u8BC1\u636E")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u672C\u9875\u65B0\u589E\u5230\u8FBE\u9879"), /* @__PURE__ */ React.createElement("strong", null, "\u6F14\u793A\u65B0\u6570\u636E\uFF0C\u4E0D\u662F\u4F01\u4E1A\u65B0\u589E\u4E8B\u5B9E")), /* @__PURE__ */ React.createElement("p", null, "\u6F14\u793A\u8F93\u5165\u4E0D\u4F1A\u5199\u5165\u4F01\u4E1A\u6570\u636E\u5305\uFF0C\u4E5F\u4E0D\u4F1A\u6539\u53D8\u5F53\u524D\u5341\u6848\u7ED3\u8BBA\u3002")), /* @__PURE__ */ React.createElement("section", { className: "review-scenario-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u9009\u62E9\u4E00\u79CD\u65B0\u6570\u636E\u60C5\u51B5", detail: "\u540C\u4E00\u5957\u5BA1\u6838\u89C4\u5219\u4F1A\u6839\u636E\u6765\u6E90\u3001\u65F6\u5E8F\u3001\u51B2\u7A81\u548C\u98CE\u9669\u7ED9\u51FA\u4E0D\u540C\u52A8\u4F5C\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "review-scenario-tabs", role: "tablist", "aria-label": "\u65B0\u6570\u636E\u60C5\u51B5" }, scenarios.map((scenario) => /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        role: "tab",
        "aria-selected": scenario.scenario_id === activeScenario.scenario_id,
        className: scenario.scenario_id === activeScenario.scenario_id ? "active" : "",
        key: scenario.scenario_id,
        onClick: () => setActiveScenarioId(scenario.scenario_id)
      },
      /* @__PURE__ */ React.createElement("strong", null, scenario.title),
      /* @__PURE__ */ React.createElement("span", null, scenario.subtitle)
    )))), /* @__PURE__ */ React.createElement("section", { className: "review-case-summary" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "mono" }, activeScenario.case_id), /* @__PURE__ */ React.createElement("h2", null, activeScenario.title), /* @__PURE__ */ React.createElement("p", null, activeScenario.case_title)), /* @__PURE__ */ React.createElement("div", { className: `arrival-decision ${reviewTone(activeScenario.arrival_disposition)}` }, /* @__PURE__ */ React.createElement("span", null, "\u7CFB\u7EDF\u63A5\u6536\u51B3\u5B9A"), /* @__PURE__ */ React.createElement("strong", null, reviewLabel(activeScenario.arrival_disposition)), /* @__PURE__ */ React.createElement("small", null, "\u4ECE ", activeScenario.current_gate, " \u5F00\u59CB \xB7 ", rerunLabel(activeScenario.rerun_scope)))), /* @__PURE__ */ React.createElement("section", { className: "review-flow-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u5BA1\u6838\u600E\u6837\u8FDB\u884C", detail: "\u6BCF\u4E00\u6B65\u90FD\u5F62\u6210\u53EF\u8FFD\u6EAF\u5DE5\u4EF6\uFF1B\u4EFB\u4F55\u4E00\u6B65\u5931\u8D25\u90FD\u4E0D\u80FD\u88AB\u540E\u7EED AI \u7ED5\u8FC7\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "review-flow-grid" }, /* @__PURE__ */ React.createElement(ReviewStep, { number: "01", title: "\u6765\u6E90\u4E0E\u5B8C\u6574\u6027\u95E8\u7981", result: reviewLabel(activeScenario.source_gate.state), detail: activeScenario.source_gate.detail, tone: reviewTone(activeScenario.source_gate.state) }), /* @__PURE__ */ React.createElement(ReviewStep, { number: "02A", title: "\u5B89\u5168\u5FEB\u901F\u8DEF\u5F84", result: reviewLabel(activeScenario.safety_path.state), detail: activeScenario.safety_path.detail, tone: reviewTone(activeScenario.safety_path.state) }), /* @__PURE__ */ React.createElement(ReviewStep, { number: "02B", title: "\u8BC1\u636E\u8D28\u91CF\u8DEF\u5F84", result: reviewLabel(activeScenario.quality_path.state), detail: activeScenario.quality_path.detail, tone: reviewTone(activeScenario.quality_path.state) }), /* @__PURE__ */ React.createElement(ReviewStep, { number: "03", title: "\u53D8\u5316\u5206\u7C7B", result: changeTypeLabel(activeScenario.change_type), detail: `\u4E8B\u4EF6\u65F6\u95F4\uFF1A${activeScenario.time_basis.event_time}\uFF1B\u5E73\u53F0\u83B7\u77E5\uFF1A${activeScenario.time_basis.received_at}\u3002` }), /* @__PURE__ */ React.createElement(ReviewStep, { number: "04", title: "\u7248\u672C\u4E0E\u5931\u6548\u8303\u56F4", result: activeScenario.version_effect.new_snapshot_becomes_current ? "\u521B\u5EFA\u65B0\u5FEB\u7167\u7248\u672C" : "\u5F53\u524D\u5FEB\u7167\u4E0D\u53D8", detail: activeScenario.version_effect.new_snapshot_becomes_current ? `\u53EA\u4F7F ${invalidatedLabel(activeScenario.invalidated_objects)} \u8FC7\u671F\u3002\u65E7\u5FEB\u7167\u6C38\u4E45\u4FDD\u7559\u3002` : "\u4E0D\u521B\u5EFA\u65B0 Evidence ID\uFF0C\u4E0D\u6539\u53D8\u5F53\u524D\u5019\u9009\u548C\u5BA1\u6838\u3002", tone: activeScenario.version_effect.new_snapshot_becomes_current ? "amber" : "green" }), /* @__PURE__ */ React.createElement(ReviewStep, { number: "05", title: "\u4F01\u4E1A\u4EBA\u5DE5\u95E8\u7981", result: activeScenario.human_review.required ? "\u9700\u8981\u4F01\u4E1A\u8D23\u4EFB\u4EBA\u5BA1\u6838" : "\u65E0\u9700\u4EBA\u5DE5\u653E\u884C", detail: activeScenario.human_review.question, tone: activeScenario.human_review.required ? "orange" : "green" }))), /* @__PURE__ */ React.createElement("div", { className: "review-decision-grid" }, /* @__PURE__ */ React.createElement("section", { className: "version-impact-panel" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u65E7\u7ED3\u8BBA\u600E\u6837\u5904\u7406", detail: "\u8FFD\u52A0\u548C\u5931\u6548\u4E0D\u7B49\u4E8E\u5220\u9664\u5386\u53F2\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "version-track" }, /* @__PURE__ */ React.createElement("div", { className: "version-item historical" }, /* @__PURE__ */ React.createElement("span", null, "\u65E7\u5FEB\u7167"), /* @__PURE__ */ React.createElement("strong", null, "\u6C38\u4E45\u4FDD\u7559"), /* @__PURE__ */ React.createElement("small", { className: "mono" }, shortSnapshot(activeScenario.baseline_snapshot_id))), /* @__PURE__ */ React.createElement("span", { className: "version-arrow", "aria-hidden": "true" }, "\u2192"), /* @__PURE__ */ React.createElement("div", { className: `version-item ${activeScenario.version_effect.new_snapshot_becomes_current ? "current" : "unchanged"}` }, /* @__PURE__ */ React.createElement("span", null, "\u5F53\u524D\u8EAB\u4EFD"), /* @__PURE__ */ React.createElement("strong", null, activeScenario.version_effect.new_snapshot_becomes_current ? "\u5BA1\u6838\u540E\u5207\u6362\u65B0\u7248\u672C" : "\u4FDD\u6301\u539F\u7248\u672C"), /* @__PURE__ */ React.createElement("small", null, activeScenario.review_reopen_status === "REOPEN_REQUIRED" ? "\u65E7\u5BA1\u6838\u53D8\u4E3A\u8FC7\u671F\uFF0C\u8981\u6C42\u91CD\u5F00" : "\u65E7\u5BA1\u6838\u7EE7\u7EED\u9002\u7528"))), /* @__PURE__ */ React.createElement("div", { className: "invalidated-line" }, /* @__PURE__ */ React.createElement("span", null, "\u53D7\u5F71\u54CD\u5DE5\u4EF6"), /* @__PURE__ */ React.createElement("strong", null, invalidatedLabel(activeScenario.invalidated_objects)))), /* @__PURE__ */ React.createElement("section", { className: "human-decision-panel" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u4F01\u4E1A\u8D23\u4EFB\u4EBA\u8981\u51B3\u5B9A\u4EC0\u4E48", detail: "\u4EBA\u6570\u548C\u804C\u8D23\u5206\u79BB\u65B9\u5F0F\u7531\u4F01\u4E1A\u73B0\u6709\u5236\u5EA6\u51B3\u5B9A\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "decision-question" }, activeScenario.human_review.question), activeScenario.human_review.decision_options.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "decision-options" }, activeScenario.human_review.decision_options.map((option) => /* @__PURE__ */ React.createElement("span", { key: option }, decisionOptionLabel(option)))), /* @__PURE__ */ React.createElement("div", { className: "approved-action" }, /* @__PURE__ */ React.createElement("span", null, "\u901A\u8FC7\u540E\u4EC5\u5141\u8BB8"), /* @__PURE__ */ React.createElement("strong", null, activeScenario.human_review.approved_action)), /* @__PURE__ */ React.createElement("div", { className: "next-owner" }, /* @__PURE__ */ React.createElement("span", null, "\u8D23\u4EFB\u4E3B\u4F53"), /* @__PURE__ */ React.createElement("strong", null, activeScenario.next_action.owner), /* @__PURE__ */ React.createElement("p", null, activeScenario.next_action.action)))), /* @__PURE__ */ React.createElement("section", { className: "minimal-rerun-band" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u6700\u5C0F\u91CD\u8DD1"), /* @__PURE__ */ React.createElement("strong", null, rerunLabel(activeScenario.rerun_scope))), /* @__PURE__ */ React.createElement("p", null, "\u53EA\u4ECE\u6700\u65E9\u53D7\u5F71\u54CD\u7684\u95E8\u7981\u5F00\u59CB\uFF0C\u672A\u4F9D\u8D56\u65B0\u6570\u636E\u7684\u5DE5\u4EF6\u53EF\u4EE5\u590D\u7528\uFF1B\u5B89\u5168\u901A\u77E5\u5355\u72EC\u5E42\u7B49\u5904\u7406\u3002"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u65E7\u5BA1\u6838\u9002\u7528\u6027"), /* @__PURE__ */ React.createElement("strong", null, applicabilityLabel(activeScenario.decision_applicability)))), /* @__PURE__ */ React.createElement("section", { className: "review-result-section" }, /* @__PURE__ */ React.createElement(SectionHeading, { title: "\u5BA1\u6838\u7ED3\u679C\uFF1A\u67E5\u4EC0\u4E48\u3001\u5F71\u54CD\u8C01\u3001\u7559\u4E0B\u4EC0\u4E48", detail: "\u8FD9\u56DB\u5757\u5185\u5BB9\u662F\u4F01\u4E1A\u63A5\u5165\u65B0\u6570\u636E\u540E\u53EF\u4EE5\u76F4\u63A5\u590D\u6838\u7684\u7ED3\u679C\uFF0C\u4E0D\u662F AI \u7684\u6700\u7EC8\u8BCA\u65AD\u3002" }), /* @__PURE__ */ React.createElement("div", { className: "review-result-grid" }, /* @__PURE__ */ React.createElement("section", { className: "result-panel checklist-panel" }, /* @__PURE__ */ React.createElement("div", { className: "result-panel-heading" }, /* @__PURE__ */ React.createElement("span", { className: "result-index" }, "A"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "\u5BA1\u6838\u68C0\u67E5\u6E05\u5355"), /* @__PURE__ */ React.createElement("p", null, "\u6838\u5BF9\u4F01\u4E1A\u6765\u6E90\u6388\u6743\u3001\u6765\u6E90\u8BB0\u5F55 ID\u3001Schema \u4E0E\u89E3\u6790\u7248\u672C\u7B49\u516B\u9879\u5185\u5BB9\u3002"))), /* @__PURE__ */ React.createElement("div", { className: "review-checklist" }, activeScenario.review_checklist.map((item) => /* @__PURE__ */ React.createElement("div", { className: "checklist-row", key: item.check_id }, /* @__PURE__ */ React.createElement("span", { className: `check-status ${checkStatusTone(item.status)}` }, checkStatusLabel(item.status)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, item.label), /* @__PURE__ */ React.createElement("small", null, item.detail)))))), /* @__PURE__ */ React.createElement("section", { className: "result-panel artifact-panel" }, /* @__PURE__ */ React.createElement("div", { className: "result-panel-heading" }, /* @__PURE__ */ React.createElement("span", { className: "result-index" }, "B"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "\u53D7\u5F71\u54CD\u5DE5\u4EF6\u6E05\u5355"), /* @__PURE__ */ React.createElement("p", null, "\u53EA\u8BA9\u771F\u6B63\u4F9D\u8D56\u65B0\u6570\u636E\u7684\u7ED3\u679C\u5931\u6548\u3002"))), /* @__PURE__ */ React.createElement("div", { className: "artifact-list" }, activeScenario.artifact_impact.items.map((item) => /* @__PURE__ */ React.createElement("div", { className: "artifact-row", key: item.artifact_id }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, item.label), /* @__PURE__ */ React.createElement("small", null, item.reason)), /* @__PURE__ */ React.createElement("span", { className: `artifact-status ${artifactStatusTone(item.status)}` }, artifactStatusLabel(item.status))))), /* @__PURE__ */ React.createElement("div", { className: "scope-reason" }, /* @__PURE__ */ React.createElement("span", null, "\u4E3A\u4EC0\u4E48\u4E0D\u662F\u5168\u6848\u91CD\u8DD1"), /* @__PURE__ */ React.createElement("p", null, activeScenario.artifact_impact.scope_reason))), /* @__PURE__ */ React.createElement("section", { className: "result-panel semantics-panel" }, /* @__PURE__ */ React.createElement("div", { className: "result-panel-heading" }, /* @__PURE__ */ React.createElement("span", { className: "result-index" }, "C"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "\u4EBA\u5DE5\u51B3\u5B9A\u7684\u5B9E\u9645\u542B\u4E49"), /* @__PURE__ */ React.createElement("p", null, "\u4EBA\u5DE5\u6279\u51C6\u7684\u662F\u4E0B\u4E00\u6B65\u8FB9\u754C\uFF0C\u4E0D\u662F\u6839\u56E0\u3002"))), /* @__PURE__ */ React.createElement("div", { className: "decision-semantics-list" }, activeScenario.decision_semantics.length ? activeScenario.decision_semantics.map((item) => /* @__PURE__ */ React.createElement("div", { className: "decision-semantics", key: item.option }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("strong", null, item.label), /* @__PURE__ */ React.createElement("span", null, item.meaning)), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, "\u5141\u8BB8\uFF1A"), item.permits), /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("b", null, "\u7981\u6B62\uFF1A"), item.prohibits))) : /* @__PURE__ */ React.createElement("div", { className: "no-human-decision" }, "\u672C\u573A\u666F\u6309\u5E42\u7B49\u6216\u6765\u6E90\u6392\u9664\u89C4\u5219\u5904\u7406\uFF0C\u4E0D\u9700\u8981\u4F01\u4E1A\u4EBA\u5DE5\u653E\u884C\u3002"))), /* @__PURE__ */ React.createElement("section", { className: "result-panel audit-preview-panel" }, /* @__PURE__ */ React.createElement("div", { className: "result-panel-heading" }, /* @__PURE__ */ React.createElement("span", { className: "result-index" }, "D"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, "\u53EF\u5BA1\u8BA1\u8BB0\u5F55\u9884\u89C8"), /* @__PURE__ */ React.createElement("p", null, "\u6F14\u793A\u8BB0\u5F55\uFF0C\u4E0D\u662F\u771F\u5B9E\u4F01\u4E1A\u5BA1\u6279\u8BB0\u5F55\u3002"))), /* @__PURE__ */ React.createElement("div", { className: "audit-record-grid" }, /* @__PURE__ */ React.createElement(AuditRecordField, { label: "\u8BB0\u5F55\u7C7B\u578B", value: "\u6F14\u793A\u5BA1\u6838\u8BB0\u5F55" }), /* @__PURE__ */ React.createElement(AuditRecordField, { label: "Case", value: activeScenario.audit_record_preview.case_id, mono: true }), /* @__PURE__ */ React.createElement(AuditRecordField, { label: "\u57FA\u7EBF\u5FEB\u7167", value: shortSnapshot(activeScenario.audit_record_preview.baseline_snapshot_id), mono: true }), /* @__PURE__ */ React.createElement(AuditRecordField, { label: "\u5230\u8FBE\u51B3\u5B9A", value: reviewLabel(activeScenario.audit_record_preview.arrival_disposition) }), /* @__PURE__ */ React.createElement(AuditRecordField, { label: "\u5931\u6548\u5BF9\u8C61", value: invalidatedLabel(activeScenario.audit_record_preview.invalidated_artifacts) }), /* @__PURE__ */ React.createElement(AuditRecordField, { label: "\u6700\u5C0F\u4E0B\u4E00\u6B65", value: activeScenario.audit_record_preview.next_action })), /* @__PURE__ */ React.createElement("div", { className: "audit-record-boundary" }, /* @__PURE__ */ React.createElement("span", null, "\u4EBA\u5DE5\u6279\u51C6\u4E0E\u7B7E\u540D"), /* @__PURE__ */ React.createElement("strong", null, "\u5F85\u4F01\u4E1A\u771F\u5B9E\u5BA1\u6838\u4EA7\u751F"), /* @__PURE__ */ React.createElement("small", null, "\u672C\u9875\u4E0D\u751F\u6210\u771F\u5B9E\u5BA1\u6838\u4EBA\u3001\u7B7E\u540D\u6216\u4F01\u4E1A\u5BA1\u6279\u4E8B\u5B9E\u3002"))))), /* @__PURE__ */ React.createElement("div", { className: "new-data-final-boundary" }, "\u5BA1\u6838\u901A\u8FC7\u4E0D\u4EE3\u8868\u6839\u56E0\u6210\u7ACB\uFF0C\u4E5F\u4E0D\u5141\u8BB8\u7CFB\u7EDF\u81EA\u52A8\u53D1\u5E03\u3001\u81EA\u52A8\u56DE\u6EDA\u6216\u81EA\u52A8\u5173\u95ED Case\u3002"));
  }
  function ReviewStep({ number, title, result, detail, tone = "" }) {
    return /* @__PURE__ */ React.createElement("article", { className: `review-step ${tone}` }, /* @__PURE__ */ React.createElement("span", { className: "mono" }, number), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h3", null, title), /* @__PURE__ */ React.createElement("strong", null, result), /* @__PURE__ */ React.createElement("p", null, detail)));
  }
  function AuditRecordField({ label, value, mono = false }) {
    return /* @__PURE__ */ React.createElement("div", { className: "audit-record-field" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("strong", { className: mono ? "mono" : "" }, value));
  }
  function reviewLabel(value) {
    return REVIEW_STATE_LABELS[value] || value;
  }
  function reviewTone(value) {
    if (["ACCEPT_APPEND", "DUPLICATE_NOOP", "NORMAL"].includes(value)) return "green";
    if (["LATE_APPEND_REOPEN", "SAFETY_HOLD"].includes(value)) return "red";
    if (["CONFLICT_PENDING", "REVIEW_REQUIRED", "CONFLICT_SET_CREATED"].includes(value)) return "amber";
    if (value === "EXCLUDED_NON_ENTERPRISE") return "muted";
    return "cyan";
  }
  function rerunLabel(scope) {
    return { NONE: "\u65E0\u9700\u91CD\u8DD1", MINIMAL: "\u5355\u5DE5\u4EF6\u91CD\u8DD1", PARTIAL: "\u4ECE\u53D7\u5F71\u54CD\u95E8\u7981\u90E8\u5206\u91CD\u8DD1", FULL_CASE_REVIEW: "\u5168\u6848\u91CD\u65B0\u5BA1\u6838" }[scope] || scope;
  }
  function changeTypeLabel(type) {
    return { ADDITIVE_EVIDENCE: "\u8FFD\u52A0\u8BC1\u636E", SOURCE_CONFLICT: "\u6765\u6E90\u51B2\u7A81", HISTORICAL_REFERENCE: "\u975E\u5F53\u524D\u8BC1\u636E\u53C2\u8003" }[type] || type;
  }
  function invalidatedLabel(items) {
    const labels = { CandidateSet: "\u5019\u9009\u96C6", DiagnosisReview: "\u8BCA\u65AD\u5BA1\u6838", SafetyReviewApplicability: "\u5B89\u5168\u5BA1\u6838\u9002\u7528\u6027", ValidationReadiness: "\u9A8C\u8BC1\u51C6\u5165\u72B6\u6001" };
    return items.length ? items.map((item) => labels[item] || item).join("\u3001") : "\u65E0";
  }
  function decisionOptionLabel(option) {
    return { APPROVE: "\u6279\u51C6\u53D7\u9650\u52A8\u4F5C", RECORD_LIMIT: "\u8BB0\u5F55\u9650\u5236", REJECT: "\u9A73\u56DE", PAUSE: "\u6682\u505C", ESCALATE: "\u5347\u7EA7\u8D23\u4EFB\u4EBA" }[option] || option;
  }
  function checkStatusLabel(status) {
    return { PASS: "\u901A\u8FC7", REVIEW: "\u590D\u6838", FAIL: "\u5931\u8D25", NOT_APPLICABLE: "\u4E0D\u9002\u7528" }[status] || status;
  }
  function checkStatusTone(status) {
    return { PASS: "green", REVIEW: "amber", FAIL: "red", NOT_APPLICABLE: "muted" }[status] || "muted";
  }
  function artifactStatusLabel(status) {
    return { VALID: "\u4FDD\u6301\u6709\u6548", NEW_CURRENT: "\u65B0\u5F53\u524D", STALE: "\u5DF2\u8FC7\u671F", SUSPENDED: "\u5DF2\u6682\u505C", EXCLUDED: "\u672A\u5EFA\u7ACB" }[status] || status;
  }
  function artifactStatusTone(status) {
    return { VALID: "green", NEW_CURRENT: "cyan", STALE: "amber", SUSPENDED: "red", EXCLUDED: "muted" }[status] || "muted";
  }
  function applicabilityLabel(value) {
    return { CURRENT: "\u7EE7\u7EED\u6709\u6548", STALE: "\u8FC7\u671F\uFF0C\u5F85\u91CD\u5F00", SUSPENDED: "\u6682\u505C\u9002\u7528" }[value] || value;
  }
  function shortSnapshot(snapshotId) {
    const value = String(snapshotId || "");
    return value.length > 30 ? `${value.slice(0, 22)}...${value.slice(-8)}` : value;
  }
  function RouteStatus({ status = "NOT_EVALUABLE_WITH_CURRENT_DATA", compact = false }) {
    return /* @__PURE__ */ React.createElement("span", { className: `route-status ${status} ${compact ? "compact" : ""}`, title: status }, ROUTE_STATUS_LABELS[status] || status);
  }
  function branchDisplayTitle(node) {
    if (node.node_id === "G3_SCENARIO_RECONSTRUCTION") return "\u573A\u666F\u91CD\u5EFA\u5206\u652F";
    if (node.node_id === "G3_OTA_GATE") return "OTA \u56E0\u679C\u95E8\u7981\u5206\u652F";
    if (node.node_id === "G3_HISTORY_REFERENCE") return "\u5386\u53F2\u6848\u4F8B\u53C2\u8003\u5206\u652F";
    return node.title;
  }
  function MethodDatum({ value, label, tone = "" }) {
    return /* @__PURE__ */ React.createElement("div", { className: `method-datum ${tone}` }, /* @__PURE__ */ React.createElement("strong", null, value), /* @__PURE__ */ React.createElement("span", null, label));
  }
  function MethodChange({ finding, risk, rule }) {
    return /* @__PURE__ */ React.createElement("div", { className: "method-change-row" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u771F\u5B9E\u53D1\u73B0"), /* @__PURE__ */ React.createElement("strong", null, finding)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u539F\u6709\u98CE\u9669"), /* @__PURE__ */ React.createElement("p", null, risk)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, "\u65B9\u6CD5\u89C4\u5219"), /* @__PURE__ */ React.createElement("p", null, rule)));
  }
  function PageHeading({ eyebrow, title, detail }) {
    return /* @__PURE__ */ React.createElement("header", { className: "page-heading" }, /* @__PURE__ */ React.createElement("span", null, eyebrow), /* @__PURE__ */ React.createElement("h1", null, title), /* @__PURE__ */ React.createElement("p", null, detail));
  }
  function SectionHeading({ title, detail }) {
    return /* @__PURE__ */ React.createElement("div", { className: "section-heading" }, /* @__PURE__ */ React.createElement("h2", null, title), /* @__PURE__ */ React.createElement("p", null, detail));
  }
  function KeyValue({ label, value, mono = false }) {
    return /* @__PURE__ */ React.createElement("div", { className: "key-value" }, /* @__PURE__ */ React.createElement("span", null, label), /* @__PURE__ */ React.createElement("strong", { className: mono ? "mono" : "" }, value));
  }
  function ObservationTable({ observations }) {
    return /* @__PURE__ */ React.createElement("div", { className: "observation-table", role: "table", "aria-label": "\u6D3E\u751F\u89C2\u5BDF" }, /* @__PURE__ */ React.createElement("div", { className: "observation-row observation-head", role: "row" }, /* @__PURE__ */ React.createElement("span", null, "\u68C0\u67E5\u9879"), /* @__PURE__ */ React.createElement("span", null, "\u529F\u80FD\u57DF"), /* @__PURE__ */ React.createElement("span", null, "\u72B6\u6001"), /* @__PURE__ */ React.createElement("span", null, "\u65F6\u95F4\u8BED\u4E49"), /* @__PURE__ */ React.createElement("span", null, "Evidence ID")), observations.map((item) => /* @__PURE__ */ React.createElement("div", { className: "observation-row", role: "row", key: `${item.evaluator}-${item.evidence_ids[0]}` }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, item.evaluator), /* @__PURE__ */ React.createElement("small", null, item.check_pattern || "\u672A\u63D0\u4F9B\u68C0\u67E5\u6A21\u5F0F")), /* @__PURE__ */ React.createElement("span", null, item.domain), /* @__PURE__ */ React.createElement("span", { className: `observation-status ${item.status}` }, OBSERVATION_LABELS[item.status]), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("small", null, item.window_status), /* @__PURE__ */ React.createElement("small", null, item.temporal_binding)), /* @__PURE__ */ React.createElement("span", { className: "mono evidence-id" }, item.evidence_ids.join(", ")))));
  }
  function paragraphs(value) {
    return String(value).split("\n").filter(Boolean).map((line) => /* @__PURE__ */ React.createElement("p", { key: line }, line));
  }
  function caseDecisionLabel(caseItem) {
    if (caseItem.safety_route === "SAFETY_PRIORITY_REVIEW") return "\u5B89\u5168\u4F18\u5148 + \u505C\u7B54";
    if (caseItem.evidence_tension_state === "EVIDENCE_TENSION") return "\u8BC1\u636E\u5F20\u529B + \u505C\u7B54";
    return ANALYSIS_LABELS[caseItem.analysis_state] || "\u5F85\u65B9\u6CD5\u5224\u65AD";
  }
  function stateTone(caseItem) {
    if (caseItem.safety_route === "SAFETY_PRIORITY_REVIEW") return "red";
    if (caseItem.evidence_tension_state === "EVIDENCE_TENSION") return "cyan";
    return caseItem.analysis_state === "LIMITED_CANDIDATES_READY" ? "green" : "amber";
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(/* @__PURE__ */ React.createElement(App, null));
})();
