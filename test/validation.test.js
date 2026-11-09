'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { normalizePositiveAmount, validateMemoText, MAX_STROOPS } = require('../src/validation');

test('normalizes positive decimal values without floating-point rounding', () => {
  assert.equal(normalizePositiveAmount('00012.3400000'), '12.34');
  assert.equal(normalizePositiveAmount('1.0000001'), '1.0000001');
  assert.equal(normalizePositiveAmount('7'), '7');
});

test('rejects zero, negative, malformed, scientific, and over-precision amounts', () => {
  for (const value of ['0', '0.0000000', '-1', '+1', '1e-7', '1.12345678', '', '  ']) {
    assert.throws(() => normalizePositiveAmount(value), /Amount|positive decimal|greater than zero/);
  }
});

test('enforces the signed int64 stroop boundary', () => {
  assert.equal(normalizePositiveAmount('922337203685.4775807'), '922337203685.4775807');
  assert.equal(MAX_STROOPS, 9223372036854775807n);
  assert.throws(() => normalizePositiveAmount('922337203685.4775808'), /maximum Stellar int64/);
});

test('preserves empty and valid UTF-8 memo text', () => {
  assert.equal(validateMemoText(''), '');
  assert.equal(validateMemoText('invoice #42'), 'invoice #42');
  assert.equal(validateMemoText('π'.repeat(14)), 'π'.repeat(14));
});

test('rejects memo text longer than 28 UTF-8 bytes', () => {
  assert.throws(() => validateMemoText('x'.repeat(29)), /28 UTF-8 bytes/);
  assert.throws(() => validateMemoText('😀'.repeat(8)), /28 UTF-8 bytes/);
  assert.throws(() => validateMemoText(null), /Memo must be text/);
});
