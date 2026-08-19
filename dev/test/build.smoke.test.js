// Smoke test: run the full production build and assert it produces the key
// output artifacts. This is the "does it still compile / deploy" guard — if a
// template, SCSS entry, esbuild bundle, or the feed step breaks, this fails.
//
// Runs `npm run build` once (slow-ish, ~a few seconds), then inspects
// ../public. Uses the built-in Node test runner; no extra deps.

import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { before, describe, test } from 'node:test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEV_DIR = join(__dirname, '..');
const PUBLIC = join(DEV_DIR, '..', 'public');

describe('production build smoke test', () => {
  before(() => {
    // Fresh, full build (prebuild copies blog posts, then css/js/11ty).
    // Command is a fixed literal, so a shell invocation is safe here and
    // avoids the execFileSync + shell arg-passing deprecation (DEP0190).
    execSync('npm run build', { cwd: DEV_DIR, stdio: 'inherit' });
  }); // build timeout guarded by the runner (--test-timeout in the npm script)

  const expectedPages = [
    'index.html',
    'about/index.html',
    'blog/overview/index.html',
    '403.html',
    '404.html'
  ];
  for (const page of expectedPages) {
    test(`writes ${page}`, () => {
      const p = join(PUBLIC, page);
      assert.ok(existsSync(p), `expected build output ${page}`);
      assert.ok(statSync(p).size > 0, `${page} should not be empty`);
    });
  }

  test('compiles CSS and JS bundles', () => {
    assert.ok(existsSync(join(PUBLIC, 'assets', 'css', 'app.css')), 'app.css missing');
    assert.ok(existsSync(join(PUBLIC, 'assets', 'js', 'app.js')), 'app.js missing');
  });

  const feeds = ['blog/feeds/rss.xml', 'blog/feeds/atom.xml', 'blog/feeds/feed.json'];
  for (const feed of feeds) {
    test(`generates ${feed}`, () => {
      assert.ok(existsSync(join(PUBLIC, feed)), `expected feed ${feed}`);
    });
  }

  test('feeds contain blog items', () => {
    const json = JSON.parse(readFileSync(join(PUBLIC, 'blog/feeds/feed.json'), 'utf8'));
    assert.equal(json.title, 'Luigi Blog');
    assert.ok(Array.isArray(json.items) && json.items.length > 0, 'feed.json has no items');

    const rss = readFileSync(join(PUBLIC, 'blog/feeds/rss.xml'), 'utf8');
    assert.match(rss, /<rss/);
    assert.match(rss, /<item>/);
  });

  test('home page renders real content, not an error placeholder', () => {
    const html = readFileSync(join(PUBLIC, 'index.html'), 'utf8');
    assert.match(html, /<\/html>/i);
    assert.doesNotMatch(html, /\{\{.*\}\}/, 'unrendered Handlebars tags left in output');
  });
});
