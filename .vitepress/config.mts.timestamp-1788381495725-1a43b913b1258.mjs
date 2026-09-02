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
      { text: "Dashboard", link: "https://app.cogextai.com" },
      {
        text: "Get API Key",
        link: "https://app.cogextai.com",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Nlc3Npb25zL3Jjdy0wMWdtbHlieXVhNG1ibm5qZHJ6eTVlcjYvbW50L0Rlc2t0b3AvY29nZXh0LWRvY3MvLnZpdGVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Nlc3Npb25zL3Jjdy0wMWdtbHlieXVhNG1ibm5qZHJ6eTVlcjYvbW50L0Rlc2t0b3AvY29nZXh0LWRvY3MvLnZpdGVwcmVzcy9jb25maWcubXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9zZXNzaW9ucy9yY3ctMDFnbWx5Ynl1YTRtYm5uamRyenk1ZXI2L21udC9EZXNrdG9wL2NvZ2V4dC1kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgdGl0bGU6ICdDT0dFWFQnLFxuICBkZXNjcmlwdGlvbjogJ0NvbW1pdG1lbnQgSW50ZWxsaWdlbmNlIEFQSSBcdTIwMTQgZGV0ZWN0LCB0cmFjaywgYW5kIHJlc29sdmUgcHJvbWlzZXMgbWFkZSBpbiB0ZXh0LicsXG4gIGxhbmc6ICdlbi1VUycsXG5cbiAgYXBwZWFyYW5jZTogJ2RhcmsnLFxuXG4gIGhlYWQ6IFtcbiAgICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiAnL2Zhdmljb24ucG5nJyB9XSxcbiAgICBbJ21ldGEnLCB7IG5hbWU6ICd0aGVtZS1jb2xvcicsIGNvbnRlbnQ6ICcjNjM2NkYxJyB9XSxcbiAgXSxcblxuICB0aGVtZUNvbmZpZzoge1xuICAgIGxvZ286ICcvbG9nby1kYXJrLnBuZycsXG4gICAgc2l0ZVRpdGxlOiAnQ09HRVhUJyxcblxuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiAnRG9jcycsIGxpbms6ICcvJyB9LFxuICAgICAgeyB0ZXh0OiAnRGFzaGJvYXJkJywgbGluazogJ2h0dHBzOi8vYXBwLmNvZ2V4dGFpLmNvbScgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0dldCBBUEkgS2V5JyxcbiAgICAgICAgbGluazogJ2h0dHBzOi8vYXBwLmNvZ2V4dGFpLmNvbScsXG4gICAgICAgIGFjdGl2ZU1hdGNoOiAnXi8kJyxcbiAgICAgIH0sXG4gICAgXSxcblxuICAgIHNpZGViYXI6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0dldHRpbmcgU3RhcnRlZCcsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnSW50cm9kdWN0aW9uJywgbGluazogJy9pbnRyb2R1Y3Rpb24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUXVpY2tzdGFydCcsIGxpbms6ICcvcXVpY2tzdGFydCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdBdXRoZW50aWNhdGlvbicsIGxpbms6ICcvYXV0aGVudGljYXRpb24nIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQ29yZSBDb25jZXB0cycsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnQ29tbWl0bWVudHMnLCBsaW5rOiAnL2NvcmUtY29uY2VwdHMvY29tbWl0bWVudHMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTGlmZWN5Y2xlJywgbGluazogJy9jb3JlLWNvbmNlcHRzL2xpZmVjeWNsZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdFdmlkZW5jZScsIGxpbms6ICcvY29yZS1jb25jZXB0cy9ldmlkZW5jZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdXZWJob29rcycsIGxpbms6ICcvY29yZS1jb25jZXB0cy93ZWJob29rcycgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdBUEkgUmVmZXJlbmNlJyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdUcmFjayBDb21taXRtZW50cycsIGxpbms6ICcvYXBpLXJlZmVyZW5jZS90cmFjaycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdHZXQgQ29tbWl0bWVudCcsIGxpbms6ICcvYXBpLXJlZmVyZW5jZS9nZXQtY29tbWl0bWVudCcgfSxcbiAgICAgICAgICB7IHRleHQ6ICdMaXN0IENvbW1pdG1lbnRzJywgbGluazogJy9hcGktcmVmZXJlbmNlL2xpc3QtY29tbWl0bWVudHMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQWRkIEV2aWRlbmNlJywgbGluazogJy9hcGktcmVmZXJlbmNlL2FkZC1ldmlkZW5jZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdVcGRhdGUgU3RhdGUnLCBsaW5rOiAnL2FwaS1yZWZlcmVuY2UvdXBkYXRlLXN0YXRlJyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1NES3MnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ1B5dGhvbicsIGxpbms6ICcvc2Rrcy9weXRob24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnVHlwZVNjcmlwdCcsIGxpbms6ICcvc2Rrcy90eXBlc2NyaXB0JyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdLFxuXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vY29nZXh0JyB9LFxuICAgIF0sXG5cbiAgICBmb290ZXI6IHtcbiAgICAgIG1lc3NhZ2U6ICdDT0dFWFQgXHUyMDE0IENvbW1pdG1lbnQgSW50ZWxsaWdlbmNlJyxcbiAgICAgIGNvcHlyaWdodDogJ2NvZ2V4dGFpLmNvbScsXG4gICAgfSxcblxuICAgIHNlYXJjaDoge1xuICAgICAgcHJvdmlkZXI6ICds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
