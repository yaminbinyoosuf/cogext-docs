import { ssrRenderAttrs } from "vue/server-renderer";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./plugin-vue_export-helper.1tPrXgE0.js";
const __pageData = JSON.parse(`{"title":"","description":"","frontmatter":{"layout":"home","hero":{"name":"COGEXT","text":"Commitment Intelligence API","tagline":"Detect promises. Track obligations. Know when they're kept — or broken.","actions":[{"theme":"brand","text":"Quickstart →","link":"/quickstart"},{"theme":"alt","text":"API Reference","link":"/api-reference/track"},{"theme":"alt","text":"Get API Key","link":"https://app.cogextai.com"}]},"features":[{"icon":"🔍","title":"Detect","details":"Send any text — email, Slack, transcript — and COGEXT extracts every commitment with confidence scoring and normalized deadlines."},{"icon":"🔄","title":"Track","details":"Each commitment moves through a 12-state lifecycle automatically. OPEN → DUE → OVERDUE, with time-based transitions you don't have to manage."},{"icon":"⚡","title":"Alert","details":"Receive HMAC-signed webhook events the moment a commitment changes state — fulfilled, overdue, contradicted, or cancelled."},{"icon":"🧩","title":"Integrate","details":"Python and TypeScript SDKs. REST API. Works with email, Slack, CRM transcripts, support tickets, or any text source you route through it."}]},"headers":[],"relativePath":"index.md","filePath":"index.md"}`);
const _sfc_main = { name: "index.md" };
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("index.md");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __pageData,
  index as default
};
