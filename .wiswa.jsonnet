{
  uses_user_defaults: true,
  project_type: 'other',
  want_tests: false,
  want_codeql: false,
  want_claude: false,
  want_cursor: false,
  project_name: 'Tatsh',
  version: '0.0.2',
  description: 'Profile project.',
  keywords: ['github', 'profile', 'tatsh'],
  want_main: false,
  // The resume data file carries the published version; keep it bumped.
  cz+: {
    commitizen+: {
      version_files+: ['_data/resume.yml'],
    },
  },
  // Prettier's HTML parser rewrites Liquid tags, corrupting them when they sit
  // in attribute position. Jekyll templates are not HTML, so they are excluded.
  prettierignore+: ['/_includes/', '/_layouts/'],
  // Sponsorship links shown in the repository's Sponsor button.
  github+: {
    funding+: {
      ko_fi: 'tatsh2',
      liberapay: 'tatsh2',
      patreon: 'tatsh2',
    },
    pages_config+: {
      // Tooling and sources that should not be copied into the built site.
      exclude+: ['node_modules', 'package.json', 'yarn.lock'],
      // The resume stylesheet is Sass; assets/css/resume.scss imports _sass/_resume.scss.
      sass: { sass_dir: '_sass', style: 'compressed' },
    },
  },
  // Drives the social badge row in the generated section of README.md.
  social+: {
    bsky: 'Tatsh',
    buymeacoffee: 'Tatsh',
    libera_irc: 'Tatsh',
    mastodon+: { id: '109370961877277568' },
    patreon: 'Tatsh2',
  },
}
