'use strict';

const MAX_STROOPS = 9223372036854775807n;
const STROOPS_PER_UNIT = 10_000_000n;

function normalizePositiveAmount(value, label = 'Amount') {
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new TypeError(label + ' must be a decimal amount.');
  }

  const input = String(value).trim();
  if (!/^\d+(?:\.\d{1,7})?$/.test(input)) {
    throw new TypeError(label + ' must be a positive decimal with at most 7 fractional digits; scientific notation and signs are not accepted.');
  }

  const parts = input.split('.');
  const wholeText = parts[0].replace(/^0+(?=\d)/, '');
  const fractionText = (parts[1] || '').padEnd(7, '0');
  const stroops = BigInt(wholeText) * STROOPS_PER_UNIT + BigInt(fractionText || '0');

  if (stroops <= 0n) {
    throw new RangeError(label + ' must be greater than zero.');
  }
  if (stroops > MAX_STROOPS) {
    throw new RangeError(label + ' exceeds the maximum Stellar int64 amount.');
  }

  const normalizedFraction = (parts[1] || '').replace(/0+$/, '');
  return normalizedFraction ? wholeText + '.' + normalizedFraction : wholeText;
}

function validateMemoText(value) {
  if (typeof value !== 'string') {
    throw new TypeError('Memo must be text.');
  }
  if (Buffer.byteLength(value, 'utf8') > 28) {
    throw new RangeError('Text memo must be 28 UTF-8 bytes or fewer.');
  }
  return value;
}

module.exports = { normalizePositiveAmount, validateMemoText, MAX_STROOPS };
