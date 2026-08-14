(function attachAutoGuardAgentClient(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AutoGuardAgentClient = api;
})(typeof window !== 'undefined' ? window : null, function createAutoGuardAgentClient() {
  async function loadWorkbench(fetchImpl, fallback, endpoint = '/api/v1/workbench') {
    try {
      if (typeof fetchImpl !== 'function') throw new Error('fetch unavailable');
      const response = await fetchImpl(endpoint, { headers: { accept: 'application/json' } });
      if (!response.ok) throw new Error(`workbench endpoint returned ${response.status}`);
      const data = await response.json();
      if (!data || !Array.isArray(data.cases)) throw new Error('workbench response is invalid');
      return data;
    } catch (error) {
      return {
        ...(fallback || {}),
        runtime: {
          ...(fallback?.runtime || {}),
          source: 'static_fallback',
          degraded: true,
          reason: error.message
        }
      };
    }
  }

  async function loadHistoricalEvidence(fetchImpl, caseId) {
    try {
      if (typeof fetchImpl !== 'function') throw new Error('fetch unavailable');
      const endpoint = `/api/v1/cases/${encodeURIComponent(caseId)}/history`;
      const response = await fetchImpl(endpoint, { headers: { accept: 'application/json' } });
      if (!response.ok) throw new Error(`history endpoint returned ${response.status}`);
      const data = await response.json();
      if (!data || !Array.isArray(data.references)) throw new Error('history response is invalid');
      return data;
    } catch (error) {
      return {
        query_case_id: caseId,
        method: 'unavailable',
        score_meaning: 'retrieval_relevance_not_causal_confidence',
        references: [],
        degraded: true,
        reason: error.message
      };
    }
  }

  async function loadMethodRoute(fetchImpl, fallback, endpoint = './data/method-route.json') {
    try {
      if (typeof fetchImpl !== 'function') throw new Error('fetch unavailable');
      const response = await fetchImpl(endpoint, { headers: { accept: 'application/json' } });
      if (!response.ok) throw new Error(`method route endpoint returned ${response.status}`);
      const data = await response.json();
      if (
        !data
        || data.summary?.requirement_count !== 11
        || !Array.isArray(data.requirements)
        || data.requirements.length !== 11
        || !Array.isArray(data.nodes)
      ) {
        throw new Error('method route response is invalid');
      }
      return {
        ...data,
        runtime: {
          ...(data.runtime || {}),
          source: 'local_api',
          degraded: false
        }
      };
    } catch (error) {
      return {
        ...(fallback || {}),
        runtime: {
          ...(fallback?.runtime || {}),
          source: 'static_fallback',
          degraded: true,
          reason: error.message
        }
      };
    }
  }

  async function loadNewDataReviewDemo(fetchImpl, fallback, endpoint = './data/new-data-review.json') {
    try {
      if (typeof fetchImpl !== 'function') throw new Error('fetch unavailable');
      const response = await fetchImpl(endpoint, { headers: { accept: 'application/json' } });
      if (!response.ok) throw new Error(`new-data review endpoint returned ${response.status}`);
      const data = await response.json();
      if (!data || !Array.isArray(data.scenarios) || data.scenarios.length !== 5) {
        throw new Error('new-data review response is invalid');
      }
      return {
        ...data,
        runtime: {
          ...(data.runtime || {}),
          source: 'local_api',
          degraded: false
        }
      };
    } catch (error) {
      return {
        ...(fallback || {}),
        runtime: {
          ...(fallback?.runtime || {}),
          source: 'static_fallback',
          degraded: true,
          reason: error.message
        }
      };
    }
  }

  return Object.freeze({ loadWorkbench, loadHistoricalEvidence, loadMethodRoute, loadNewDataReviewDemo });
});
