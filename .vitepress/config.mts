import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'COGEXT',
  description: 'Commitment Intelligence API — detect, track, and resolve promises made in text.',
  lang: 'en-US',

  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { name: 'theme-color', content: '#6366F1' }],
  ],

  themeConfig: {
    logo: '/logo-dark.png',
    siteTitle: 'COGEXT',

    nav: [
      { text: 'Docs', link: '/' },
      { text: 'Dashboard', link: 'https://app.cogextai.com' },
      {
        text: 'Get API Key',
        link: 'https://app.cogextai.com',
        activeMatch: '^/$',
      },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Quickstart', link: '/quickstart' },
          { text: 'Authentication', link: '/authentication' },
        ],
      },
      {
        text: 'Core Concepts',
        items: [
          { text: 'Commitments', link: '/core-concepts/commitments' },
          { text: 'Lifecycle', link: '/core-concepts/lifecycle' },
          { text: 'Evidence', link: '/core-concepts/evidence' },
          { text: 'Webhooks', link: '/core-concepts/webhooks' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Track Commitments', link: '/api-reference/track' },
          { text: 'Get Commitment', link: '/api-reference/get-commitment' },
          { text: 'List Commitments', link: '/api-reference/list-commitments' },
          { text: 'Add Evidence', link: '/api-reference/add-evidence' },
          { text: 'Update State', link: '/api-reference/update-state' },
        ],
      },
      {
        text: 'SDKs',
        items: [
          { text: 'Python', link: '/sdks/python' },
          { text: 'TypeScript', link: '/sdks/typescript' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cogext' },
    ],

    footer: {
      message: 'COGEXT — Commitment Intelligence',
      copyright: 'cogextai.com',
    },

    search: {
      provider: 'local',
    },

    editLink: false,
  },
})
