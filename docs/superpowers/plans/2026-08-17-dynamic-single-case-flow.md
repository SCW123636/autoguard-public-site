# AutoGuard Dynamic Single-Case Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a ten-case dynamic input that renders every selected enterprise case through the original reference-style G1-G7 single-case attribution flow.

**Architecture:** Keep `demo-engine.js` as the deterministic evidence-gate evaluator, expand `presentation.js` into a pure adapter from one real case plus one gate result to a complete reference-style case-flow model, and replace the current summary-first `app.js` with a focused single-case React renderer. The browser reads only the bundled ten-case data, and every visible case-specific value comes from the selected case or the adapter result.

**Tech Stack:** Static HTML, React 18 UMD, browser JavaScript, CSS, Node.js built-in test runner.

## Global Constraints

- The first release selects only from the ten enterprise-provided anonymized real cases.
- Preserve the reference flow: case opening, G1-G7 stage rail, one active stage, previous/next navigation, and case closeout.
- Do not claim confirmed root cause, responsibility domain, OTA causality, diagnostic accuracy, replay success, repair success, or CAPA closure.
- Missing fields render as `当前数据未提供`; no defaults may fabricate evidence or engineering results.
- Do not add a dashboard, ten-case charts, secondary query workbench, vehicle-compute explanation, or unrelated architecture content.
- Every candidate evidence reference must resolve within the selected case snapshot or registered missing evidence.

---

### Task 1: Lock the Ten-Case Evidence-Gate Contract

**Files:**
- Modify: `tests/public-runtime.test.cjs`
- Modify: `demo-engine.js`

**Interfaces:**
- Consumes: `AutoGuardRealRcaCases.cases: RealCase[]`
- Produces: `runCase(caseItem): { input, audit, stages, decision }`

- [ ] **Step 1: Replace the three-case gate test with the full ten-case matrix**

Add an expected decision map:

```js
const expected = {
  'RCA-EXT-001': 'LIMITED_CANDIDATES_READY',
  'RCA-EXT-002': 'LIMITED_CANDIDATES_READY',
  'RCA-EXT-003': 'TERMINAL_STOP',
  'RCA-EXT-004': 'EVIDENCE_TENSION_AND_STOP',
  'RCA-EXT-005': 'LIMITED_CANDIDATES_READY',
  'RCA-EXT-006': 'LIMITED_CANDIDATES_READY',
  'RCA-EXT-007': 'TERMINAL_STOP',
  'RCA-EXT-008': 'SAFETY_PRIORITY_REVIEW_AND_STOP',
  'RCA-EXT-009': 'TERMINAL_STOP',
  'RCA-EXT-010': 'EVIDENCE_TENSION_AND_STOP'
};
```

Assert for every case that `rootCauseClaimAllowed` and `otaCausalityClaimAllowed` are `false`, the audit is snapshot-bound, and repeated runs are deeply equal.

- [ ] **Step 2: Add mutation tests proving the result is not selected by case ID**

Clone `RCA-EXT-005`, remove its hypotheses, and assert the result becomes `TERMINAL_STOP`. Clone it again, inject an unknown support Evidence ID, and assert `EVIDENCE_REFERENCE_BLOCKED`.

- [ ] **Step 3: Run the focused test and verify the new assertions fail where behavior is incomplete**

Run: `node --test tests/public-runtime.test.cjs`

Expected: the full matrix passes; any missing audit or mutation guarantee fails before implementation.

- [ ] **Step 4: Make the minimal engine corrections**

Keep decision priority exactly:

```text
invalid reference > safety route > evidence tension > supported candidate > terminal stop
```

Ensure `decision.summary` exists on every output, including rejected input and invalid references.

- [ ] **Step 5: Run tests**

Run: `node --test tests/public-runtime.test.cjs`

Expected: all engine tests pass.

- [ ] **Step 6: Commit**

```powershell
git add demo-engine.js tests/public-runtime.test.cjs
git commit -m "test: lock ten-case evidence gate behavior"
```

### Task 2: Build the Dynamic G1-G7 Presentation Adapter

**Files:**
- Modify: `presentation.js`
- Create: `tests/presentation.test.cjs`

**Interfaces:**
- Consumes: `buildCaseFlow(caseItem, runResult)` arguments from Task 1.
- Produces: `{ opening, stages, deliverable }`, where `stages` contains exactly seven ordered stage objects.

- [ ] **Step 1: Write adapter tests for all ten cases**

For every case, assert:

```js
assert.equal(model.opening.caseId, caseItem.case_id);
assert.equal(model.opening.problem, caseItem.enterprise.problem);
assert.deepEqual(model.stages.map((stage) => stage.id), ['G1','G2','G3','G4','G5','G6','G7']);
assert.equal(model.stages.length, 7);
assert.match(model.deliverable.boundary, /不确认根因/);
```

Also assert two selected cases have different G2 findings and different G3 findings.

- [ ] **Step 2: Add missing-data tests**

Delete `enterprise.next_action`, `engineering.hypotheses`, and future validation/result/closure fields from a cloned case. Assert the adapter renders `当前数据未提供` or a specific locked explanation rather than another case's content.

- [ ] **Step 3: Run the adapter tests and verify failure**

Run: `node --test tests/presentation.test.cjs`

Expected: FAIL because `buildCaseFlow` does not exist.

- [ ] **Step 4: Implement `buildCaseFlow(caseItem, runResult)`**

Implement focused helpers:

```js
buildOpening(caseItem, runResult)
buildEvidenceSummary(caseItem)
buildCandidateComparison(caseItem, runResult)
buildStageModels(caseItem, runResult)
buildDeliverable(caseItem, runResult)
```

Stage state rules:

- G1 and G2 are `completed` when input and references are valid.
- G3 is `completed` for a valid computed gate result.
- G4 is `current` because the enterprise action gate is pending.
- G5-G7 are `locked` unless traceable fields for validation, engineering result, or closure are present.
- An invalid Evidence ID makes G2 `current` and G3-G7 `locked`.

Each stage must expose:

```js
{
  id, code, shortTitle, title, state,
  purpose, method, finding, gate,
  evidenceComparison?
}
```

- [ ] **Step 5: Run adapter and runtime tests**

Run: `node --test tests/presentation.test.cjs tests/public-runtime.test.cjs`

Expected: all tests pass.

- [ ] **Step 6: Commit**

```powershell
git add presentation.js tests/presentation.test.cjs
git commit -m "feat: map real cases to complete attribution stages"
```

### Task 3: Restore the Reference Single-Case Interaction with Dynamic Input

**Files:**
- Modify: `app.js`
- Modify: `index.html`
- Modify: `tests/public-runtime.test.cjs`

**Interfaces:**
- Consumes: `window.AutoGuardRealRcaCases.cases`, `window.AutoGuardDemoEngine.runCase`, and `window.AutoGuardPresentation.buildCaseFlow`.
- Produces: one dynamic single-case flow mounted in `#root`.

- [ ] **Step 1: Replace the old live-summary source assertions**

Assert the published app contains:

```text
DynamicCaseSelector
SingleCaseFlow
StagePanel
stage-rail
stage-navigation
DemoCloseout
buildCaseFlow
```

Assert it does not contain the obsolete `LiveAnalysisDemo` or `live-method-line` entry flow.

- [ ] **Step 2: Run the test and verify failure**

Run: `node --test tests/public-runtime.test.cjs`

Expected: FAIL because the current app still renders `LiveAnalysisDemo`.

- [ ] **Step 3: Replace the public app with a focused renderer**

Implement these components in `app.js`:

```js
App
DynamicCaseSelector
SingleCaseFlow
StageRail
StagePanel
EvidenceComparison
StageNavigation
DemoCloseout
```

Behavior:

- Default to `RCA-EXT-005` as the reference example.
- Selector lists all ten cases as `case_id · domain · title`.
- Selection immediately reruns the evidence engine and rebuilds the complete presentation model.
- Selection resets the active stage to G1.
- Stage tabs, previous/next buttons, and left/right arrow keys change one active stage at a time.
- Case opening and closeout remain visible around the active stage.
- There is no separate dashboard or summary page.

- [ ] **Step 4: Keep the entry loading order deterministic**

In `index.html`, load in this order:

```html
<script src="./data/real-rca-cases.js?v=single-case-v1"></script>
<script src="./demo-engine.js?v=single-case-v1"></script>
<script src="./presentation.js?v=single-case-v1"></script>
<script src="./app.js?v=single-case-v1"></script>
```

- [ ] **Step 5: Run syntax and runtime tests**

Run:

```powershell
node --check app.js
node --test tests/presentation.test.cjs tests/public-runtime.test.cjs
```

Expected: all checks pass.

- [ ] **Step 6: Commit**

```powershell
git add app.js index.html tests/public-runtime.test.cjs
git commit -m "feat: add dynamic reference-style case flow"
```

### Task 4: Rebuild Focused Styling and Verify the Published Experience

**Files:**
- Modify: `styles.css`
- Modify: `tests/public-runtime.test.cjs`

**Interfaces:**
- Consumes: class names from Task 3.
- Produces: responsive desktop/mobile reference-style case presentation.

- [ ] **Step 1: Add structural CSS assertions**

Assert `styles.css` contains selectors for:

```text
.case-selector
.single-case-flow
.case-opening
.stage-rail
.stage-panel
.evidence-comparison
.stage-navigation
.demo-closeout
```

Assert it contains mobile breakpoints at `max-width: 720px` and no obsolete `.live-analysis-demo` selector.

- [ ] **Step 2: Run the test and verify failure**

Run: `node --test tests/public-runtime.test.cjs`

Expected: FAIL until focused styling replaces the obsolete live-summary styling.

- [ ] **Step 3: Implement the focused visual hierarchy**

Use the reference version's quiet enterprise style:

- 1100px maximum reading width.
- Compact brand header.
- Selector as a clear top control, not a dashboard card.
- Strong case problem heading.
- Seven-stage horizontal rail on desktop and horizontally scrollable or wrapped rail on mobile.
- One active stage panel with clear labels for enterprise question, real finding, method, and gate.
- Support, counter-evidence, and missing evidence shown as three distinct regions only when G3 is active.
- Closeout as a concise final section, not ten-case metrics.
- No nested cards, decorative gradients, or unrelated status blocks.

- [ ] **Step 4: Run complete local verification**

Run:

```powershell
node --check app.js
node --check demo-engine.js
node --check presentation.js
node --check data/real-rca-cases.js
node --test tests/presentation.test.cjs tests/public-runtime.test.cjs
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 5: Browser-verify desktop and mobile**

Verify at 1440x900 and 390x844:

- all ten selector options exist;
- selecting cases changes opening, G2, G3, closeout, and decision status;
- G1-G7 tabs and previous/next navigation work;
- no horizontal document overflow;
- no overlapping text;
- no console errors.

- [ ] **Step 6: Commit and publish**

```powershell
git add styles.css tests/public-runtime.test.cjs
git commit -m "style: focus public demo on dynamic case narrative"
git push origin main
```

- [ ] **Step 7: Verify GitHub Pages**

Open:

```text
https://scw123636.github.io/autoguard-public-site/?v=single-case-v1
```

Select at least `RCA-EXT-005`, `RCA-EXT-004`, and `RCA-EXT-008`; confirm their G3 outputs respectively show limited candidate, evidence tension stop, and safety-priority stop.
