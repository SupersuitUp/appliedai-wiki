import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import wiki from './wiki.config.json';

const config: Config = {
  title: wiki.title,
  tagline: wiki.tagline,
  favicon: 'img/favicon.png',

  url: wiki.url,
  baseUrl: '/',

  organizationName: wiki.organizationName,
  projectName: wiki.projectName,

  onBrokenLinks: 'throw',

  future: {
    v4: true,
    faster: true,
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: wiki.noindex
    ? [{ tagName: 'meta', attributes: { name: 'robots', content: 'noindex, nofollow' } }]
    : [],

  plugins: [
    './plugins/search-plugin',
    './plugins/creation-date-plugin',
    [
      '@docusaurus/plugin-client-redirects',
      {
        // The Foundations section was retired; its pages moved to
        // perspectives / concepts / disciplines. A handful of POV theses and
        // failure-mode essays also moved out of concepts/ and disciplines/
        // into perspectives/. These redirects keep every old URL alive so an
        // old /foundations/* (or moved /concepts|/disciplines) link resolves
        // to the page's new home instead of 404ing.
        redirects: [
          { from: '/foundations/the-token-economy', to: '/perspectives/the-token-economy' },
          { from: '/foundations/the-survivor-economy', to: '/perspectives/the-survivor-economy' },
          { from: '/foundations/the-elevator-economy', to: '/perspectives/the-elevator-economy' },
          { from: '/foundations/the-lock-in-is-coming', to: '/perspectives/the-lock-in-is-coming' },
          { from: '/foundations/the-tradeoff-era', to: '/perspectives/the-tradeoff-era' },
          { from: '/foundations/the-chat-is-not-the-product', to: '/perspectives/the-chat-is-not-the-product' },
          { from: '/foundations/ephemeral-software-precious-context', to: '/perspectives/ephemeral-software-precious-context' },
          { from: '/foundations/what-wont-change-as-strategy', to: '/perspectives/what-wont-change-as-strategy' },
          { from: '/foundations/the-chatbot-trap', to: '/perspectives/the-chatbot-trap' },
          { from: '/foundations/ai-eats-labor-allocation', to: '/perspectives/ai-eats-labor-allocation' },
          { from: '/foundations/mid-markets-are-the-ai-sweet-spot', to: '/perspectives/mid-markets-are-the-ai-sweet-spot' },
          { from: '/foundations/services-firm-re-rating-threshold', to: '/perspectives/services-firm-re-rating-threshold' },
          { from: '/foundations/effective-agi', to: '/perspectives/effective-agi' },
          { from: '/foundations/the-token-rug-pull', to: '/perspectives/the-token-rug-pull' },
          { from: '/foundations/the-flaming-red-elephant', to: '/perspectives/the-flaming-red-elephant' },
          { from: '/foundations/the-gui-is-becoming-legacy', to: '/perspectives/the-gui-is-becoming-legacy' },
          { from: '/foundations/the-transformation-arc', to: '/perspectives/the-transformation-arc' },
          { from: '/foundations/compounding-docs', to: '/concepts/compounding-docs' },
          { from: '/foundations/jevons-paradox', to: '/concepts/jevons-paradox' },
          { from: '/foundations/signal-theory', to: '/concepts/signal-theory' },
          { from: '/foundations/minimum-viable-infrastructure', to: '/concepts/minimum-viable-infrastructure' },
          { from: '/foundations/clips', to: '/concepts/clips' },
          { from: '/foundations/teammate-discipline', to: '/disciplines/teammate-discipline' },
          { from: '/foundations/version-control-your-prompts', to: '/disciplines/version-control-your-prompts' },
          { from: '/concepts/strategy-is-the-new-execution', to: '/perspectives/strategy-is-the-new-execution' },
          { from: '/concepts/you-are-the-bottleneck', to: '/perspectives/you-are-the-bottleneck' },
          { from: '/concepts/slop-factory', to: '/perspectives/slop-factory' },
          { from: '/concepts/judgment-burnout', to: '/perspectives/judgment-burnout' },
          { from: '/concepts/three-waves-of-ai-adoption', to: '/perspectives/three-waves-of-ai-adoption' },
          { from: '/concepts/the-jagged-frontier', to: '/perspectives/the-jagged-frontier' },
          { from: '/concepts/comparative-human-edge', to: '/perspectives/comparative-human-edge' },
          { from: '/concepts/the-prolific-mode', to: '/perspectives/the-prolific-mode' },
          { from: '/concepts/the-moving-bottleneck', to: '/perspectives/the-moving-bottleneck' },
          { from: '/disciplines/the-overconfidence-trap', to: '/perspectives/the-overconfidence-trap' },
          { from: '/disciplines/llm-psychosis', to: '/perspectives/llm-psychosis' },
          { from: '/disciplines/the-judgment-line', to: '/perspectives/the-judgment-line' },
          { from: '/disciplines/the-permission-surface', to: '/perspectives/the-permission-surface' },
          { from: '/foundations', to: '/start-here/executive-summary' },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
          // Filter folder index docs out of every autogenerated section.
          // Each category in sidebars.ts links to its section's index via
          // `link: { type: 'doc', id: 'X/index' }`, so the category header
          // IS the navigation to the index. Without this filter, Docusaurus
          // 3.10 also includes the index as a duplicate child entry.
          sidebarItemsGenerator: async ({defaultSidebarItemsGenerator, ...args}) => {
            const items = await defaultSidebarItemsGenerator(args);
            const stripIndex = (list: any[]): any[] =>
              list
                .filter((item) => !(item.type === 'doc' && typeof item.id === 'string' && item.id.endsWith('/index')))
                .map((item) =>
                  item.type === 'category' && Array.isArray(item.items)
                    ? {...item, items: stripIndex(item.items)}
                    : item
                );
            return stripIndex(items);
          },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: wiki.noindex ? false : undefined,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    navbar: {
      title: wiki.title,
      logo: undefined,
      items: [],
    },
    footer: {
      style: 'light',
      links: [],
      copyright: wiki.copyright,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
