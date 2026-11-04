---
title: Luigi v2.32.0
seoMetaDescription: Release notes for Luigi v2.32.0
author:
  - Johannes Doberer
layout: blog
---

You can read about the new features in Luigi v2.32.0 in the release notes below.

<!-- Excerpt -->

#### Keyboard navigation for the context switcher dropdown

The context switcher dropdown is now fully operable via the keyboard, with arrow-key navigation and focus handling wired into both the context switcher and its nav. This improves accessibility for users relying on keyboard interaction. See [#5480](https://github.com/luigi-project/luigi/pull/5480).

#### ARIA landmark roles

Luigi core now exposes ARIA landmark roles for its main regions — `role="banner"` on the shellbar and `role="main"` on the content container — alongside the existing `role="navigation"`. This lets assistive technologies identify the page header, navigation, and main content, in line with WCAG 2.1 Success Criterion 1.3.1. See [#5472](https://github.com/luigi-project/luigi/pull/5472).

#### F6 fast navigation

Users can now jump between the main sections of the page using F6 (forward) and Shift+F6 (backward), instead of tabbing through every individual element. Focus moves to the first focusable element in the next group, and complex elements such as tables and trees are exitable via F6. See [#5471](https://github.com/luigi-project/luigi/pull/5471).

#### Bugfixes

For a full list of bugfixes in this release, see our [changelog](https://github.com/luigi-project/luigi/blob/main/CHANGELOG.md).
