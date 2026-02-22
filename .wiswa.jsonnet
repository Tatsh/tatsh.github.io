{
  project_type: 'other',
  want_tests: false,
  want_codeql: false,
  project_name: 'Tatsh',
  version: '0.0.0',
  description: 'Profile project.',
  keywords: ['github', 'profile', 'tatsh'],
  want_main: false,
  copilot+: {
    intro: 'This repository is a profile project. The contents of README.md are displayed on the GitHub profile page. index.html redirects to the GitHub profile site.',
  },
  package_json+: {
    scripts: {
      'check-formatting': "yarn prettier -c . && yarn markdownlint-cli2",
      'check-spelling': "yarn cspell --no-progress './**/*'  './**/.*'",
      format: "prettier -w . && yarn markdownlint-cli2 --fix",
      qa: 'yarn check-spelling && yarn check-formatting',
    },
  },
}
