---
title: Luigi v2.33.0
seoMetaDescription: Release notes for Luigi v2.33.0
author:
  - Johannes Doberer
layout: blog
---

You can read about the new features in Luigi v2.33.0 in the release notes below.

<!-- Excerpt -->

#### Optionally skip adding modal data to the URL

When opening a modal, you can now override the global `routing.showModalPathInUrl` default on a per-modal basis, so individual modals can skip appending their data to the URL query params and adding a history state. This prevents them from reappearing when navigating back through the browser history. See [#5561](https://github.com/luigi-project/luigi/pull/5561).

#### Fullscreen mode for the user settings dialog

The user settings dialog in core can now be displayed in fullscreen mode, with a new `showFullScreenOnMobile` option in core-modular to control this behavior on mobile. See [#5560](https://github.com/luigi-project/luigi/pull/5560).

#### Fullscreen mode for the user menu

The user menu now supports a fullscreen mode for the `vega` profile type, including adjustments to how profile menu categories are rendered in fullscreen. See [#5543](https://github.com/luigi-project/luigi/pull/5543) and [#5562](https://github.com/luigi-project/luigi/pull/5562).

#### withOptions support for the Core API

The Core API now supports `withOptions`, bringing additional configuration flexibility to core-api navigation calls. See [#5523](https://github.com/luigi-project/luigi/pull/5523).

#### Bugfixes

For a full list of bugfixes in this release, see our [changelog](https://github.com/luigi-project/luigi/blob/main/CHANGELOG.md).
