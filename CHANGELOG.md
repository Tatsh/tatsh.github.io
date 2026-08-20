<!-- markdownlint-configure-file {"MD024": { "siblings_only": true } } -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.1/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2026-08-20

### Added

- One-page résumé at the site root, laid out so that it prints to a single sheet on both US letter
  and A4 paper.
  - Toolbar controls to switch between one and two columns, expand the page to the full window
    width, step the text through four sizes, print or save as a PDF, and open a list of the
    available shortcuts and gestures (<kbd>Ctrl</kbd> <kbd>/</kbd>).
  - Display choices are remembered between visits. <kbd>Esc</kbd>, a middle-click on the toolbar,
    or a triple-tap on it restores every option to its default.
  - The 'Selected earlier roles' section expands into full entries on the web page, while the
    printed sheet always uses the compact list.
  - A footer giving the résumé version and the date it was last updated.
  - Source Sans 3 is bundled with the site under the SIL Open Font License, so the page loads no
    fonts from a third-party service.

### Removed

- The placeholder page previously served at the site root.

[unreleased]: https://github.com/Tatsh/tatsh.github.io/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/Tatsh/tatsh.github.io/releases/tag/v0.0.1
