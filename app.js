(() => {
  const { createElement: h, useEffect, useRef, useState } = React;

  function stateLabel(state) {
    return { completed: '已完成', current: '待审核', locked: '未解锁' }[state] || '待处理';
  }

  function StageHeading({ stage }) {
    return h('header', { className: 'stage-heading' }, [
      h('p', { className: 'stage-code', key: 'code' }, stage.code),
      h('div', { key: 'copy' }, [
        h('h2', { key: 'title' }, stage.title),
        h('p', { key: 'summary' }, stage.purpose)
      ]),
      h('span', { className: `stage-state ${stage.state}`, key: 'state' }, stateLabel(stage.state))
    ]);
  }

  function StageOutputStrip({ stage }) {
    return h('section', { className: 'stage-output-strip', 'aria-label': '阶段输出' }, [
      h('div', { key: 'output' }, [
        h('span', { key: 'label' }, '本阶段输出'),
        h('strong', { key: 'value' }, stage.output)
      ]),
      h('div', { key: 'boundary' }, [
        h('span', { key: 'label' }, '输出边界'),
        h('p', { key: 'value' }, stage.boundary)
      ]),
      h('div', { key: 'next' }, [
        h('span', { key: 'label' }, '下一步动作'),
        h('p', { key: 'value' }, stage.nextAction)
      ])
    ]);
  }

  function StagePanel({ stage, isActive }) {
    return h('article', {
      className: `stage-workspace stage-${stage.id.toLowerCase()} ${stage.state}`,
      id: `stage-panel-${stage.id}`,
      role: "tabpanel",
      'aria-labelledby': `stage-tab-${stage.id}`,
      hidden: !isActive,
      'aria-hidden': !isActive
    }, [
      h(StageHeading, { stage, key: 'heading' }),
      h('div', { className: 'stage-question', key: 'question' }, [
        h('span', { key: 'label' }, '本阶段回答'),
        h('strong', { key: 'value' }, stage.question)
      ]),
      window.AutoGuardStageViews.renderStageView(h, stage),
      h(StageOutputStrip, { stage, key: 'output' })
    ]);
  }

  function CloseoutRows({ items, metric = false }) {
    const fallbackLabels = ['问题边界', '证据边界', '候选与门禁', '下一步动作'];
    return h('div', { className: `closeout-rows ${metric ? 'coverage-metrics' : ''}` },
      items.map((item, index) => h('div', { className: 'closeout-row', key: item.label }, [
        h('p', { className: 'closeout-row-label', key: 'label' }, item.label || fallbackLabels[index]),
        h('p', { className: 'closeout-row-value', key: 'value' }, item.value)
      ]))
    );
  }

  function DemoCloseout({ deliverable, coverage }) {
    return h('section', { className: 'demo-closeout', 'aria-labelledby': 'closeout-title' }, [
      h('div', { className: 'closeout-grid', key: 'grid' }, [
        h('section', { className: 'closeout-column', key: 'deliverable' }, [
          h('h2', { id: 'closeout-title', key: 'title' }, deliverable.title || '企业最终得到什么'),
          h(CloseoutRows, { items: deliverable.items, key: 'items' }),
          h('div', { className: 'closeout-boundary', key: 'boundary' }, [
            h('p', { className: 'closeout-boundary-label', key: 'label' }, '交付边界'),
            h('p', { key: 'value' }, deliverable.boundary)
          ])
        ]),
        h('section', { className: 'closeout-column', 'aria-labelledby': 'coverage-title', key: 'coverage' }, [
          h('h2', { id: 'coverage-title', key: 'title' }, coverage.title || '规则覆盖情况'),
          h(CloseoutRows, { items: coverage.metrics, metric: true, key: 'metrics' }),
          h('ul', { className: 'closeout-rules', key: 'rules' }, [
            h('li', { key: 'candidate' }, '受限候选 → 企业人工审核'),
            h('li', { key: 'stop' }, '终止性停答 → 人工复核边界')
          ]),
          h('div', { className: 'closeout-boundary', key: 'boundary' }, [
            h('p', { className: 'closeout-boundary-label', key: 'label' }, '覆盖边界'),
            h('p', { key: 'value' }, coverage.boundary)
          ])
        ])
      ])
    ]);
  }

  function App() {
    const model = window.AutoGuardPublicDemoModel;
    const [activeStageId, setActiveStageId] = useState(model.currentStageId);
    const pendingFocusStageId = useRef(null);
    const activeIndex = model.stages.findIndex((stage) => stage.id === activeStageId);

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

    function onStageKeyDown(event) {
      if (event.target?.getAttribute?.('role') !== 'tab') return;
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        selectIndex(activeIndex - 1, true);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        selectIndex(activeIndex + 1, true);
      }
    }

    return h('div', { className: 'single-case-flow' }, [
      h('header', { className: 'site-header', key: 'header' }, [
        h('div', { key: 'brand' }, [
          h('strong', { key: 'name' }, 'AutoGuard'),
          h('span', { key: 'product' }, '企业异常归因方法演示')
        ]),
        h('span', { className: 'real-data-label', key: 'data' }, '企业脱敏真实案例')
      ]),
      h('main', { key: 'main' }, [
        h('section', { className: 'case-opening', 'aria-labelledby': 'case-title', key: 'opening' }, [
          h('p', { className: 'case-id', key: 'id' }, model.opening.dataLabel),
          h('h1', { id: 'case-title', key: 'title' }, model.opening.problem),
          h('p', { className: 'case-goal', key: 'goal' }, model.opening.goal),
          h('p', { className: 'case-status', key: 'status' }, model.opening.status)
        ]),
        h('nav', { className: 'stage-rail', 'aria-label': '完整归因链阶段', key: 'rail' }, [
          h('div', { role: "tablist", 'aria-label': '归因链阶段', onKeyDown: onStageKeyDown, key: 'tabs' }, model.stages.map((stage) => h('button', {
            id: `stage-tab-${stage.id}`,
            type: 'button',
            role: 'tab',
            key: stage.id,
            className: `stage-tab ${stage.state} ${stage.id === activeStageId ? 'is-active' : ''}`,
            'aria-selected': stage.id === activeStageId,
            'aria-controls': `stage-panel-${stage.id}`,
            tabIndex: stage.id === activeStageId ? 0 : -1,
            onClick: () => setActiveStageId(stage.id)
          }, `${stage.code} ${stage.shortTitle}`)))
        ]),
        model.stages.map((stage) => h(StagePanel, {
          stage,
          isActive: stage.id === activeStageId,
          key: stage.id
        })),
        h('nav', { className: 'stage-navigation', 'aria-label': '阶段翻页', key: 'navigation' }, [
          h('button', {
            type: 'button',
            disabled: activeIndex === 0,
            onClick: () => selectIndex(activeIndex - 1, true),
            key: 'previous'
          }, '上一步'),
          h('span', { key: 'position' }, `${activeIndex + 1} / ${model.stages.length}`),
          h('button', {
            type: 'button',
            disabled: activeIndex === model.stages.length - 1,
            onClick: () => selectIndex(activeIndex + 1, true),
            key: 'continue'
          }, '继续')
        ]),
        h(DemoCloseout, {
          deliverable: model.deliverable,
          coverage: model.coverage,
          key: 'closeout'
        })
      ])
    ]);
  }

  const model = window.AutoGuardPublicDemoModel;
  const stageViews = window.AutoGuardStageViews;
  const root = ReactDOM.createRoot(document.getElementById('root'));

  if (!model || !Array.isArray(model.stages) || !model.stages.some((stage) => stage.id === model.currentStageId)
    || !stageViews || typeof stageViews.renderStageView !== 'function') {
    root.render(h('main', { role: 'alert' }, '公开展示数据未加载'));
  } else {
    root.render(h(App));
  }
})();
