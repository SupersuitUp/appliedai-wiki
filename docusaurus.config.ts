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
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: wiki.noindex
    ? [{ tagName: 'meta', attributes: { name: 'robots', content: 'noindex, nofollow' } }]
    : [],

  plugins: [
    './plugins/search-plugin',
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
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
