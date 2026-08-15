(() => {
  const { createElement: h, useEffect, useRef, useState } = React;

  function stateLabel(state) {
    return { completed: '已完成', current: '待审核', locked: '未解锁' }[state] || '待处理';
  }

  function MethodBlock({ label, value, tone = '' }) {
    return h('section', { className: `method-block ${tone}` }, [
      h('p', { className: 'method-block-label', key: 'label' }, label),
      h('p', { className: 'method-block-value', key: 'value' }, value)
    ]);
  }

  function EvidenceComparison({ comparison }) {
    return h('div', { className: 'evidence-comparison' },
      ['support', 'counter', 'missing'].map((key) => {
        const group = comparison[key];
        return h('section', { className: `evidence-group ${key}`, key }, [
          h('h3', { key: 'title' }, group.title),
          h('ul', { key: 'items' }, group.items.map((item) => h('li', { key: item }, item)))
        ]);
      })
    );
  }

  function StagePanel({ stage }) {
    return h('article', {
      className: `stage-workspace ${stage.state}`,
      id: `stage-panel-${stage.id}`,
      role: "tabpanel",
      'aria-labelledby': `stage-tab-${stage.id}`
    }, [
      h('header', { className: 'stage-heading', key: 'heading' }, [
        h('p', { className: 'stage-code', key: 'code' }, stage.code),
        h('div', { key: 'copy' }, [
          h('h2', { key: 'title' }, stage.title),
          h('p', { key: 'summary' }, stage.purpose)
        ]),
        h('span', { className: `stage-state ${stage.state}`, key: 'state' }, stateLabel(stage.state))
      ]),
      h('div', { className: 'method-grid', key: 'grid' }, [
        h(MethodBlock, { label: '本步要解决', value: stage.purpose, key: 'purpose' }),
        h(MethodBlock, { label: 'AutoGuard 怎么处理', value: stage.method, tone: 'method', key: 'method' }),
        h('section', { className: 'method-block finding', key: 'finding' }, [
          h('p', { className: 'method-block-label', key: 'label' }, '真实案例发现'),
          h('p', { className: 'method-block-value', key: 'value' }, stage.finding),
          stage.evidenceComparison
            ? h(EvidenceComparison, { comparison: stage.evidenceComparison, key: 'comparison' })
            : null
        ]),
        h(MethodBlock, { label: '下一步门禁', value: stage.gate, tone: 'gate', key: 'gate' })
      ])
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
          h('h2', { id: 'coverage-title', key: 'title' }, '真实案例覆盖摘要'),
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
    const [activeStageId, setActiveStageId] = useState('G1');
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
        if (event.key === 'ArrowLeft') selectIndex(activeIndex - 1, true);
        if (event.key === 'ArrowRight') selectIndex(activeIndex + 1, true);
      }
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [activeIndex]);

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
          h('div', { role: "tablist", 'aria-label': '归因链阶段', key: 'tabs' }, model.stages.map((stage) => h('button', {
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
        h(StagePanel, { stage: activeStage, key: activeStage.id }),
        h('nav', { className: 'stage-navigation', 'aria-label': '阶段翻页', key: 'navigation' }, [
          h('button', {
            type: 'button',
            disabled: activeIndex === 0,
            onClick: () => selectIndex(activeIndex - 1),
            key: 'previous'
          }, '上一步'),
          h('span', { key: 'position' }, `${activeIndex + 1} / ${model.stages.length}`),
          h('button', {
            type: 'button',
            disabled: activeIndex === model.stages.length - 1,
            onClick: () => selectIndex(activeIndex + 1),
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

  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
