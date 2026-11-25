import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import path from 'node:path';

test('Memories and default config integrity', async () => {
  const memoriesFile = fs.readFileSync(path.resolve('src/data/memories.ts'), 'utf8');
  assert.ok(memoriesFile.includes("image: 'images/tole.webp'"), 'Memories should use public webp asset');
  assert.ok(!memoriesFile.includes('data:image/jpeg;base64'), 'Memories should not include heavy base64 strings');
  assert.ok(memoriesFile.includes('DEFAULT_CONFIG'), 'DEFAULT_CONFIG must be exported');
});

test('Performance CSS rules applied', async () => {
  const css = fs.readFileSync(path.resolve('src/styles/polaroid.css'), 'utf8');
  assert.ok(css.includes('touch-action: manipulation;'), 'Touch-action manipulation must be applied');
  assert.ok(css.includes('will-change: transform'), 'will-change transform should be applied to animated elements');
  assert.ok(css.includes('translateZ(0)'), 'GPU layer promotion should be applied');
  assert.ok(!css.includes('blur(4px)'), 'Heavy dynamic blur transition on image should be eliminated');
});

test('Production build outputs exist and are optimized', async () => {
  assert.ok(fs.existsSync(path.resolve('dist/index.html')), 'dist/index.html should exist');
  const files = fs.readdirSync(path.resolve('dist/assets'));
  const jsFile = files.find(f => f.endsWith('.js'));
  const cssFile = files.find(f => f.endsWith('.css'));
  assert.ok(jsFile, 'Production JS bundle should exist');
  assert.ok(cssFile, 'Production CSS bundle should exist');

  const jsSize = fs.statSync(path.resolve('dist/assets', jsFile)).size;
  // Previously bundle was >500kB with base64, now should be <300kB
  assert.ok(jsSize < 300 * 1024, `JS bundle (${jsSize} bytes) should be under 300kB`);
});
