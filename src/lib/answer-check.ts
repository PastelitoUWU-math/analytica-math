// Decimal answer validation per spec.
// - User answer ignores trailing zeros after decimal point.
// - Must have at least 2 decimal digits of precision (after stripping trailing zeros from user input)
//   OR the exact answer rounded to the user's precision matches.
// - Specifically: let n = number of significant decimal digits the user provided (trailing zeros ignored).
//   The answer is correct iff n >= 2 AND round(exact, n) === parseFloat(userInput rounded to n).
//
// Examples (exact=0.5555...): "0.56" ok (n=2, round=0.56). "0.555" wrong (n=3, round=0.556). "0.6" wrong (n=1).
// Examples (exact=1.0975): "1.1" ok (n=1 of user but trailing zero rule => "1.10" -> n=2, round(1.0975,2)=1.10). 

export function checkAnswer(userInput: string, exact: number): boolean {
  const s = userInput.trim().replace(",", ".");
  if (!/^-?\d+(\.\d+)?$/.test(s)) return false;
  const userNum = parseFloat(s);
  if (!Number.isFinite(userNum)) return false;

  // count decimals in user input (raw)
  const dotIdx = s.indexOf(".");
  let rawDecimals = dotIdx === -1 ? 0 : s.length - dotIdx - 1;

  // The rule: trailing zeros on decimals don't count toward precision required,
  // but DO define the precision at which we compare.
  // Strip trailing zeros to find "significant" decimals provided.
  let stripped = s;
  if (dotIdx !== -1) {
    stripped = s.replace(/0+$/, "").replace(/\.$/, "");
  }
  const sDot = stripped.indexOf(".");
  const sigDecimals = sDot === -1 ? 0 : stripped.length - sDot - 1;

  // Precision required: at least 2 significant decimals,
  // unless the exact value rounded to 2 decimals has trailing zeros that match user's shorter form.
  // Easiest: compare at precision = max(rawDecimals, 2) and require sigDecimals>=2 OR
  // that round(exact, rawDecimals) when written without trailing zeros equals stripped numeric form
  // AND round(exact, 2) when stripped equals user numeric form.
  // Practical approach: accept if there exists k in [max(2, sigDecimals)..max(rawDecimals,2)]
  // such that round(exact, k) === round(userNum, k). But we must also enforce "at least 2 sig decimals".

  // Compute round(exact, 2) and write w/o trailing zeros => "minForm"
  const minForm = trimTrailingZeros(exact.toFixed(2));
  const minSigDecimals = decimalsOf(minForm);

  // Required minimum significant decimals = minSigDecimals (could be 0 if exact rounds to integer at 2dp like 1.00 -> "1")
  if (sigDecimals < minSigDecimals) return false;

  // Compare at precision = max(rawDecimals, 2)
  const k = Math.max(rawDecimals, 2);
  const roundedExact = roundTo(exact, k);
  const roundedUser = roundTo(userNum, k);
  return Math.abs(roundedExact - roundedUser) < Math.pow(10, -k) / 2 + 1e-12;
}

function roundTo(x: number, k: number) {
  const f = Math.pow(10, k);
  return Math.round(x * f) / f;
}
function trimTrailingZeros(s: string) {
  if (!s.includes(".")) return s;
  return s.replace(/0+$/, "").replace(/\.$/, "");
}
function decimalsOf(s: string) {
  const i = s.indexOf(".");
  return i === -1 ? 0 : s.length - i - 1;
}
