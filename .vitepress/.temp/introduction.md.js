import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse('{"title":"Introduction","description":"COGEXT tracks commitments made in conversations and monitors whether they are fulfilled.","frontmatter":{"title":"Introduction","description":"COGEXT tracks commitments made in conversations and monitors whether they are fulfilled."},"headers":[],"relativePath":"introduction.md","filePath":"introduction.md"}');
const _sfc_main = { name: "introduction.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}><h1 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h1><p>COGEXT is a commitment intelligence API. It detects promises, obligations, and commitments made in text — emails, Slack messages, call transcripts, support tickets — and tracks them through their full lifecycle until they are fulfilled, failed, or cancelled.</p><h2 id="how-it-works" tabindex="-1">How it works <a class="header-anchor" href="#how-it-works" aria-label="Permalink to &quot;How it works&quot;">​</a></h2><p><strong>1. Detect</strong> — Send any text to the <code>/commitments/track</code> endpoint. COGEXT extracts all commitments it finds, assigns each a unique ID, and normalizes deadlines to UTC.</p><p><strong>2. Monitor</strong> — Each commitment moves through a 12-state lifecycle automatically (<code>DETECTED → OPEN → DUE → OVERDUE</code>). You don&#39;t manage timers — COGEXT does.</p><p><strong>3. Alert</strong> — Receive webhook events the moment commitments change state, go overdue, or need human review.</p><h2 id="key-capabilities" tabindex="-1">Key capabilities <a class="header-anchor" href="#key-capabilities" aria-label="Permalink to &quot;Key capabilities&quot;">​</a></h2><ul><li>Extract commitments from unstructured text with confidence scoring (0–1)</li><li>Normalize deadlines to UTC regardless of how they were expressed (&quot;by EOD Friday&quot;, &quot;next week&quot;, &quot;in 3 days&quot;)</li><li>Track evidence for or against fulfillment</li><li>Receive real-time HMAC-signed webhook events on all state transitions</li><li>Filter and query commitments by state, source, recipient, and deadline</li><li>Python and TypeScript SDKs included</li></ul><h2 id="where-to-go-next" tabindex="-1">Where to go next <a class="header-anchor" href="#where-to-go-next" aria-label="Permalink to &quot;Where to go next&quot;">​</a></h2><table tabindex="0"><thead><tr><th></th><th></th></tr></thead><tbody><tr><td><a href="/quickstart.html">Quickstart</a></td><td>Track your first commitment in under 5 minutes</td></tr><tr><td><a href="/core-concepts/commitments.html">Commitments model</a></td><td>Understand what COGEXT extracts from text</td></tr><tr><td><a href="/core-concepts/lifecycle.html">Lifecycle</a></td><td>The 12 states a commitment moves through</td></tr><tr><td><a href="/api-reference/track.html">API Reference</a></td><td>Full endpoint documentation</td></tr><tr><td><a href="/sdks/python.html">SDKs</a></td><td>Python and TypeScript libraries</td></tr></tbody></table></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("introduction.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const introduction = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  introduction as default
};
