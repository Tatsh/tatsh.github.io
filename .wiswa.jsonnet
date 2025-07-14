(import 'defaults.libjsonnet') + {
  // General settings
  project_type: 'other',

  // Shared
  github_username: 'Tatsh',
  security_policy_supported_versions: { '0.0.x': ':white_check_mark:' },
  authors: [
    {
      'family-names': 'Udvare',
      'given-names': 'Andrew',
      email: 'audvare@gmail.com',
      name: '%s %s' % [self['given-names'], self['family-names']],
    },
  ],
  project_name: 'Tatsh',
  version: '0.0.0',
  description: 'Profile project.',
  keywords: ['github', 'profile', 'tatsh'],
  want_main: false,
  copilot: {
    intro: 'This repository is a profile project. The contents of README.md are displayed on the GitHub profile page. index.html redirects to the GitHub profile site.',
  },
  social+: {
    mastodon+: { id: '109370961877277568' },
  },

  // GitHub
  github+: {
    funding+: {
      ko_fi: 'tatsh2',
      liberapay: 'tatsh2',
      patreon: 'tatsh2',
    },
  },

  package_json+: {
    scripts: {
      'check-formatting': "yarn prettier -c . && yarn markdownlint-cli2 '**/*.md' '#node_modules'",
      'check-spelling': "yarn cspell --no-progress './**/*'  './**/.*'",
      format: "prettier -w . && yarn markdownlint-cli2 --fix '**/*.md' '#node_modules'",
      qa: 'yarn check-spelling && yarn check-formatting',
    },
  },
}
