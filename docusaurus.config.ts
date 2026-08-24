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

  customFields: {
    // Read at build time, exposed to the share-link button
    // (src/components/ShareButton.tsx) and any client gate. Set on the Vercel
    // project as WIKI_PASSWORD. Without this, "copy link" copies a URL the
    // gate has already stripped the key from, and every shared link 401s.
    wikiPassword: process.env.WIKI_PASSWORD ?? '',
  },

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
          {
            from: '/perspectives/if-your-judgment-does-not-beat-the-default-that-is-information',
            to: '/perspectives/beating-the-default-is-table-stakes',
          },
          { from: '/foundations/the-token-economy', to: '/perspectives/tokens-are-the-atomic-unit-of-ai-economics' },
          { from: '/foundations/the-survivor-economy', to: '/perspectives/every-company-is-quietly-sorting-its-people' },
          { from: '/foundations/the-elevator-economy', to: '/perspectives/there-is-no-standing-still-anymore' },
          { from: '/foundations/the-lock-in-is-coming', to: '/perspectives/the-lock-in-is-coming' },
          { from: '/foundations/the-tradeoff-era', to: '/perspectives/model-upgrades-are-no-longer-strictly-upgrades' },
          { from: '/foundations/the-chat-is-not-the-product', to: '/perspectives/the-chat-is-not-the-product' },
          { from: '/foundations/ephemeral-software-precious-context', to: '/perspectives/software-is-disposable-context-is-the-asset' },
          { from: '/foundations/what-wont-change-as-strategy', to: '/perspectives/strategy-starts-from-what-will-not-change' },
          { from: '/foundations/the-chatbot-trap', to: '/perspectives/you-cannot-reason-about-ai-you-have-not-felt' },
          { from: '/foundations/ai-eats-labor-allocation', to: '/perspectives/ai-eats-labor-allocation' },
          { from: '/foundations/mid-markets-are-the-ai-sweet-spot', to: '/perspectives/mid-markets-are-the-ai-sweet-spot' },
          { from: '/foundations/services-firm-re-rating-threshold', to: '/perspectives/crossing-5m-revenue-re-rates-a-services-firm' },
          { from: '/foundations/effective-agi', to: '/perspectives/agi-is-already-here-for-people-who-can-wield-it' },
          { from: '/foundations/the-token-rug-pull', to: '/perspectives/cheap-tokens-are-a-subsidy-that-will-be-withdrawn' },
          { from: '/foundations/the-flaming-red-elephant', to: '/perspectives/ai-discourse-refuses-to-name-its-political-reality' },
          { from: '/foundations/the-gui-is-becoming-legacy', to: '/perspectives/the-gui-is-becoming-legacy' },
          { from: '/foundations/the-transformation-arc', to: '/perspectives/the-best-transformations-follow-the-same-arc' },
          { from: '/foundations/compounding-docs', to: '/concepts/compounding-docs' },
          { from: '/foundations/jevons-paradox', to: '/concepts/jevons-paradox' },
          { from: '/foundations/signal-theory', to: '/concepts/signal-theory' },
          { from: '/foundations/minimum-viable-infrastructure', to: '/concepts/minimum-viable-infrastructure' },
          { from: '/foundations/clips', to: '/concepts/clips' },
          { from: '/foundations/teammate-discipline', to: '/disciplines/teammate-discipline' },
          { from: '/foundations/version-control-your-prompts', to: '/playbooks/version-control-your-prompts' },
          // Renamed 2026-08-12: "harness apps" / "happs" compressed in speech to a
          // sound indistinguishable from "apps", so the term was useless out loud.
          // Renamed to Coding Harness Apps / CHAPS.
          { from: '/concepts/harness-apps', to: '/concepts/coding-harness-apps' },
          { from: '/concepts/strategy-is-the-new-execution', to: '/perspectives/strategy-is-the-new-execution' },
          { from: '/concepts/you-are-the-bottleneck', to: '/perspectives/you-are-the-bottleneck' },
          { from: '/concepts/slop-factory', to: '/perspectives/throughput-without-taste-is-a-slop-factory' },
          { from: '/concepts/judgment-burnout', to: '/perspectives/agents-compress-work-onto-your-judgment' },
          { from: '/concepts/three-waves-of-ai-adoption', to: '/perspectives/efficiency-wins-do-not-predict-new-category-wins' },
          { from: '/concepts/the-jagged-frontier', to: '/perspectives/task-difficulty-does-not-predict-ai-performance' },
          { from: '/concepts/comparative-human-edge', to: '/perspectives/some-of-every-role-should-never-be-automated' },
          { from: '/concepts/the-prolific-mode', to: '/perspectives/great-work-is-a-byproduct-of-volume-plus-taste' },
          { from: '/concepts/the-moving-bottleneck', to: '/perspectives/making-one-layer-cheap-just-moves-the-bottleneck' },
          { from: '/disciplines/the-overconfidence-trap', to: '/perspectives/ai-fluency-manufactures-false-confidence' },
          { from: '/disciplines/llm-psychosis', to: '/perspectives/generation-is-cheap-discrimination-is-the-job' },
          { from: '/disciplines/the-judgment-line', to: '/perspectives/llms-handle-judgment-code-handles-everything-else' },
          { from: '/disciplines/the-permission-surface', to: '/perspectives/permissions-are-the-load-bearing-layer-of-a-harness' },
          // 2026-08-09 page-type naming conformance pass (coherence finding
          // C2-11). 61 pages were renamed so their slugs obey the naming rules
          // this wiki declares in CLAUDE.md: perspectives are claims,
          // playbooks are imperatives, concepts are noun phrases. Every old
          // path redirects to its new home so shared links keep resolving.
          { from: '/perspectives/comparative-human-edge', to: '/perspectives/some-of-every-role-should-never-be-automated' },
          { from: '/perspectives/judgment-burnout', to: '/perspectives/agents-compress-work-onto-your-judgment' },
          { from: '/perspectives/slop-factory', to: '/perspectives/throughput-without-taste-is-a-slop-factory' },
          { from: '/perspectives/llm-psychosis', to: '/perspectives/generation-is-cheap-discrimination-is-the-job' },
          { from: '/perspectives/effective-agi', to: '/perspectives/agi-is-already-here-for-people-who-can-wield-it' },
          { from: '/perspectives/the-jagged-frontier', to: '/perspectives/task-difficulty-does-not-predict-ai-performance' },
          { from: '/perspectives/the-prolific-mode', to: '/perspectives/great-work-is-a-byproduct-of-volume-plus-taste' },
          { from: '/perspectives/the-moving-bottleneck', to: '/perspectives/making-one-layer-cheap-just-moves-the-bottleneck' },
          { from: '/perspectives/the-overconfidence-trap', to: '/perspectives/ai-fluency-manufactures-false-confidence' },
          { from: '/perspectives/the-judgment-line', to: '/perspectives/llms-handle-judgment-code-handles-everything-else' },
          { from: '/perspectives/the-permission-surface', to: '/perspectives/permissions-are-the-load-bearing-layer-of-a-harness' },
          { from: '/perspectives/three-waves-of-ai-adoption', to: '/perspectives/efficiency-wins-do-not-predict-new-category-wins' },
          { from: '/perspectives/the-token-economy', to: '/perspectives/tokens-are-the-atomic-unit-of-ai-economics' },
          { from: '/perspectives/the-survivor-economy', to: '/perspectives/every-company-is-quietly-sorting-its-people' },
          { from: '/perspectives/the-elevator-economy', to: '/perspectives/there-is-no-standing-still-anymore' },
          { from: '/perspectives/the-tradeoff-era', to: '/perspectives/model-upgrades-are-no-longer-strictly-upgrades' },
          { from: '/perspectives/the-early-demand-trap', to: '/perspectives/too-many-early-pilots-will-drown-you' },
          { from: '/perspectives/the-fumble-then-hire-curve', to: '/perspectives/buyers-fumble-alone-before-they-hire-you' },
          { from: '/perspectives/the-flaming-red-elephant', to: '/perspectives/ai-discourse-refuses-to-name-its-political-reality' },
          { from: '/perspectives/the-five-things-you-get-paid-for', to: '/perspectives/execution-is-no-longer-what-you-get-paid-for' },
          { from: '/perspectives/services-firm-re-rating-threshold', to: '/perspectives/crossing-5m-revenue-re-rates-a-services-firm' },
          { from: '/perspectives/framework-first-positioning', to: '/perspectives/trust-attaches-to-operators-with-a-named-framework' },
          { from: '/perspectives/lifestyle-or-enterprise-value-posture', to: '/perspectives/lifestyle-or-enterprise-value-is-a-day-one-decision' },
          { from: '/perspectives/eleven-ways-to-monetize-ai-expertise', to: '/perspectives/every-ai-business-model-has-a-different-ceiling' },
          { from: '/perspectives/buying-relief-not-ai', to: '/perspectives/mid-market-executives-are-buying-a-narrative' },
          { from: '/perspectives/idolizing-the-build', to: '/perspectives/developers-have-started-worshipping-the-build' },
          { from: '/perspectives/humans-at-the-edges', to: '/perspectives/ai-native-org-charts-put-humans-at-the-edges' },
          { from: '/perspectives/humans-as-instigators-and-editors', to: '/perspectives/the-human-role-splits-into-instigator-and-editor' },
          { from: '/perspectives/ephemeral-software-precious-context', to: '/perspectives/software-is-disposable-context-is-the-asset' },
          { from: '/perspectives/open-weights-as-price-ceiling', to: '/perspectives/open-weights-cap-what-closed-labs-can-charge' },
          { from: '/perspectives/the-case-for-simple-harnesses', to: '/perspectives/simple-harnesses-keep-winning' },
          { from: '/perspectives/milking-humanity', to: '/perspectives/overclaiming-ai-capability-is-an-ethical-violation' },
          { from: '/perspectives/the-token-rug-pull', to: '/perspectives/cheap-tokens-are-a-subsidy-that-will-be-withdrawn' },
          { from: '/perspectives/the-loop-everything-harm', to: '/perspectives/loop-everything-advice-is-free-for-the-people-selling-it' },
          { from: '/perspectives/the-chatbot-trap', to: '/perspectives/you-cannot-reason-about-ai-you-have-not-felt' },
          { from: '/perspectives/the-transformation-arc', to: '/perspectives/the-best-transformations-follow-the-same-arc' },
          { from: '/perspectives/build-dont-buy-your-way-in', to: '/perspectives/you-cannot-acquire-product-market-fit' },
          { from: '/perspectives/clear-the-bottleneck-dont-chase-the-bubble', to: '/perspectives/applied-ai-pays-off-where-fit-is-already-proven' },
          { from: '/perspectives/default-to-determinism', to: '/perspectives/recurring-work-belongs-in-code' },
          { from: '/perspectives/dont-get-attached-to-your-process', to: '/perspectives/your-process-is-disposable-your-judgment-is-not' },
          { from: '/perspectives/fix-the-generator-not-the-output', to: '/perspectives/the-generator-is-the-only-thing-worth-fixing' },
          { from: '/perspectives/learn-the-harness-not-the-wrapper', to: '/perspectives/the-harness-is-the-thing-worth-learning' },
          { from: '/perspectives/move-a-load-bearing-measurable', to: '/perspectives/a-moved-measurable-is-the-only-proof' },
          { from: '/perspectives/name-the-best-argument-against-you-first', to: '/perspectives/your-reader-already-has-the-objection' },
          { from: '/perspectives/pick-a-stack-that-can-be-faithful-to-your-mission', to: '/perspectives/capability-is-table-stakes-faithfulness-is-the-choice' },
          { from: '/perspectives/stop-glorifying-pain-tolerance-for-drudgery', to: '/perspectives/pain-tolerance-for-drudgery-is-a-bug' },
          { from: '/perspectives/beware-of-serving-ai-instead-of-it-serving-you', to: '/perspectives/ai-is-becoming-the-thing-we-serve' },
          { from: '/perspectives/end-of-middle-management', to: '/perspectives/middle-management-is-ending' },
          { from: '/perspectives/what-wont-change-as-strategy', to: '/perspectives/strategy-starts-from-what-will-not-change' },
          { from: '/playbooks/activation', to: '/playbooks/engineer-the-first-hour' },
          { from: '/playbooks/icp-clarity', to: '/playbooks/nail-your-icp-first' },
          { from: '/playbooks/pilot-pitch', to: '/playbooks/pitch-the-pilot' },
          { from: '/playbooks/pilot-scope', to: '/playbooks/scope-the-pilot' },
          { from: '/playbooks/pilot-to-engagement', to: '/playbooks/convert-the-pilot-to-an-engagement' },
          { from: '/playbooks/workflow-decomposition', to: '/playbooks/decompose-the-workflow' },
          { from: '/playbooks/knowledge-repo-design', to: '/playbooks/design-a-knowledge-repo' },
          { from: '/playbooks/website-deployed-slide-decks', to: '/playbooks/deploy-a-slide-deck-as-a-website' },
          { from: '/playbooks/first-eval-harness', to: '/playbooks/stand-up-an-eval-harness-in-week-one' },
          { from: '/concepts/convert-business-logic-to-ai-system', to: '/concepts/business-logic-as-ai-system' },
          { from: '/concepts/save-your-progress', to: '/concepts/the-session-save' },
          { from: '/concepts/see-your-own-thinking', to: '/concepts/visible-thinking' },
          { from: '/concepts/the-product-is-an-operation', to: '/concepts/the-product-as-operation' },
          { from: '/concepts/ai-neither-tool-nor-agent', to: '/concepts/the-tool-agent-category-error' },
          { from: '/disciplines/version-control-your-prompts', to: '/playbooks/version-control-your-prompts' },
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
