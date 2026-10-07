// .vitepress/config.mts
import { defineConfig } from "file:///sessions/rcw-01gmlybyua4mbnnjdrzy5er6/mnt/Desktop/cogext-docs/node_modules/vitepress/dist/node/index.js";
var config_default = defineConfig({
  title: "COGEXT",
  description: "Commitment Intelligence API \u2014 detect, track, and resolve promises made in text.",
  lang: "en-US",
  appearance: "dark",
  head: [
    ["link", { rel: "icon", href: "/favicon.png" }],
    ["meta", { name: "theme-color", content: "#6366F1" }]
  ],
  themeConfig: {
    logo: "/logo-dark.png",
    siteTitle: "COGEXT",
    nav: [
      { text: "Docs", link: "/" },
      { text: "Dashboard", link: "https://cogextai.com/portal" },
      {
        text: "Get API Key",
        link: "https://cogextai.com",
        activeMatch: "^/$"
      }
    ],
    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Quickstart", link: "/quickstart" },
          { text: "Authentication", link: "/authentication" }
        ]
      },
      {
        text: "Core Concepts",
        items: [
          { text: "Commitments", link: "/core-concepts/commitments" },
          { text: "Lifecycle", link: "/core-concepts/lifecycle" },
          { text: "Evidence", link: "/core-concepts/evidence" },
          { text: "Webhooks", link: "/core-concepts/webhooks" }
        ]
      },
      {
        text: "API Reference",
        items: [
          { text: "Track Commitments", link: "/api-reference/track" },
          { text: "Get Commitment", link: "/api-reference/get-commitment" },
          { text: "List Commitments", link: "/api-reference/list-commitments" },
          { text: "Add Evidence", link: "/api-reference/add-evidence" },
          { text: "Update State", link: "/api-reference/update-state" }
        ]
      },
      {
        text: "SDKs",
        items: [
          { text: "Python", link: "/sdks/python" },
          { text: "TypeScript", link: "/sdks/typescript" }
        ]
      }
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/cogext" }
    ],
    footer: {
      message: "COGEXT \u2014 Commitment Intelligence",
      copyright: "cogextai.com"
    },
    search: {
      provider: "local"
    },
    editLink: false
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Nlc3Npb25zL3Jjdy0wMWdtbHlieXVhNG1ibm5qZHJ6eTVlcjYvbW50L0Rlc2t0b3AvY29nZXh0LWRvY3MvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Nlc3Npb25zL3Jjdy0wMWdtbHlieXVhNG1ibm5qZHJ6eTVlcjYvbW50L0Rlc2t0b3AvY29nZXh0LWRvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9zZXNzaW9ucy9yY3ctMDFnbWx5Ynl1YTRtYm5uamRyenk1ZXI2L21udC9EZXNrdG9wL2NvZ2V4dC1kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgdGl0bGU6ICdDT0dFWFQnLFxuICBkZXNjcmlwdGlvbjogJ0NvbW1pdG1lbnQgSW50ZWxsaWdlbmNlIEFQSSBcdTIwMTQgZGV0ZWN0LCB0cmFjaywgYW5kIHJlc29sdmUgcHJvbWlzZXMgbWFkZSBpbiB0ZXh0LicsXG4gIGxhbmc6ICdlbi1VUycsXG5cbiAgYXBwZWFyYW5jZTogJ2RhcmsnLFxuXG4gIGhlYWQ6IFtcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiAnL2Zhdmljb24ucG5nJyB9XSxcbiAgICBbJ21ldGEnLCB7IG5hbWU6ICd0aGVtZS1jb2xvcicsIGNvbnRlbnQ6ICcjNjM2NkYxJyB9XSxcbiAgXSxcblxuICB0aGVtZUNvbmZpZzoge1xuICAgIGxvZ286ICcvbG9nby1kYXJrLnBuZycsXG4gICAgc2l0ZVRpdGxlOiAnQ09HRVhUJyxcblxuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiAnRG9jcycsIGxpbms6ICcvJyB9LFxuICAgICAgeyB0ZXh0OiAnRGFzaGJvYXJkJywgbGluazogJ2h0dHBzOi8vY29nZXh0YWkuY29tL3BvcnRhbCcgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0dldCBBUEkgS2V5JyxcbiAgICAgICAgbGluazogJ2h0dHBzOi8vY29nZXh0YWkuY29tJyxcbiAgICAgICAgYWN0aXZlTWF0Y2g6ICdeLyQnLFxuICAgICAgfSxcbiAgICBdLFxuXG4gICAgc2lkZWJhcjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnR2V0dGluZyBTdGFydGVkJyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdJbnRyb2R1Y3Rpb24nLCBsaW5rOiAnL2ludHJvZHVjdGlvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdRdWlja3N0YXJ0JywgbGluazogJy9xdWlja3N0YXJ0JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0F1dGhlbnRpY2F0aW9uJywgbGluazogJy9hdXRoZW50aWNhdGlvbicgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdDb3JlIENvbmNlcHRzJyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdDb21taXRtZW50cycsIGxpbms6ICcvY29yZS1jb25jZXB0cy9jb21taXRtZW50cycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdMaWZlY3ljbGUnLCBsaW5rOiAnL2NvcmUtY29uY2VwdHMvbGlmZWN5Y2xlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0V2aWRlbmNlJywgbGluazogJy9jb3JlLWNvbmNlcHRzL2V2aWRlbmNlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1dlYmhvb2tzJywgbGluazogJy9jb3JlLWNvbmNlcHRzL3dlYmhvb2tzJyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0FQSSBSZWZlcmVuY2UnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ1RyYWNrIENvbW1pdG1lbnRzJywgbGluazogJy9hcGktcmVmZXJlbmNlL3RyYWNrJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0dldCBDb21taXRtZW50JywgbGluazogJy9hcGktcmVmZXJlbmNlL2dldC1jb21taXRtZW50JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0xpc3QgQ29tbWl0bWVudHMnLCBsaW5rOiAnL2FwaS1yZWZlcmVuY2UvbGlzdC1jb21taXRtZW50cycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdBZGQgRXZpZGVuY2UnLCBsaW5rOiAnL2FwaS1yZWZlcmVuY2UvYWRkLWV2aWRlbmNlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1VwZGF0ZSBTdGF0ZScsIGxpbms6ICcvYXBpLXJlZmVyZW5jZS91cGRhdGUtc3RhdGUnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnU0RLcycsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnUHl0aG9uJywgbGluazogJy9zZGtzL3B5dGhvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdUeXBlU2NyaXB0JywgbGluazogJy9zZGtzL3R5cGVzY3JpcHQnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG5cbiAgICBzb2NpYWxMaW5rczogW1xuICAgICAgeyBpY29uOiAnZ2l0aHViJywgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9jb2dleHQnIH0sXG4gICAgXSxcblxuICAgIGZvb3Rlcjoge1xuICAgICAgbWVzc2FnZTogJ0NPR0VYVCBcdTIwMTQgQ29tbWl0bWVudCBJbnRlbGxpZ2VuY2UnLFxuICAgICAgY29weXJpZ2h0OiAnY29nZXh0YWkuY29tJyxcbiAgICB9LFxuXG4gICAgc2VhcmNoOiB7XG4gICAgICBwcm92aWRlcjogJ2xv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
