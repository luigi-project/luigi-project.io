// Unit tests for the markdown/slug helpers in scripts/generate-feeds.js.
// Run with the built-in Node test runner (`npm test`); no extra deps.

import assert from 'node:assert/strict';
import { beforeEach, describe, test } from 'node:test';
import { makeSlug, renderMarkdown } from '../scripts/generate-feeds.js';

describe('makeSlug', () => {
  // The slugger keeps per-document state; renderMarkdown clears it, but these
  // tests hit makeSlug directly, so reset by exercising a fresh base each time.
  test('lowercases and hyphenates', () => {
    assert.equal(makeSlug('Category Selection Indicator'), 'category-selection-indicator');
  });

  test('drops punctuation and HTML/entity delimiters', () => {
    assert.equal(makeSlug('Hello, <b>World</b> & Friends!'), 'hello-bworldb-friends');
  });

  test('de-duplicates repeated headings within a document', () => {
    const base = 'unique-heading-xyz';
    assert.equal(makeSlug(base), base);
    assert.equal(makeSlug(base), `${base}-1`);
    assert.equal(makeSlug(base), `${base}-2`);
  });
});

describe('renderMarkdown', () => {
  test('emits GitHub-style heading IDs', () => {
    const html = renderMarkdown('#### Category Selection Indicator\n');
    assert.match(html, /<h4 id="category-selection-indicator">Category Selection Indicator<\/h4>/);
  });

  test('resets the slugger between documents', () => {
    const first = renderMarkdown('# Same Title\n');
    const second = renderMarkdown('# Same Title\n');
    // Without a per-document reset the second render would be `same-title-1`.
    assert.match(first, /id="same-title"/);
    assert.match(second, /id="same-title"/);
    assert.doesNotMatch(second, /id="same-title-1"/);
  });

  test('preserves the Excerpt marker with a trailing newline', () => {
    const html = renderMarkdown('intro\n<!-- Excerpt -->\n## Body\n');
    assert.match(html, /<!-- Excerpt -->\n/);
  });

  test('renders standard markdown (links, emphasis)', () => {
    const html = renderMarkdown('See [Luigi](https://luigi-project.io) for **more**.');
    assert.match(html, /<a href="https:\/\/luigi-project\.io">Luigi<\/a>/);
    assert.match(html, /<strong>more<\/strong>/);
  });
});
