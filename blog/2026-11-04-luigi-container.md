---
title: Luigi Container v1.8
seoMetaDescription: Release notes for Luigi Container v1.8
author:
  - Johannes Doberer
layout: blog
---

You can read about the new features in Luigi Container v1.8 in the release notes below.

<!-- Excerpt -->

#### Pass user settings to compound container children by group

A `LuigiCompoundContainer` can now distribute user settings per group, so each micro frontend in the compound only receives the settings scoped to it, instead of the same flat object being passed to every child. See [#5550](https://github.com/luigi-project/luigi/pull/5550).

See our [changelog](https://github.com/luigi-project/luigi/releases/tag/container%2Fv1.8.0).
