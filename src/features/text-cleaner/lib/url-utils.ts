/**
 * Trailing punctuation is almost never part of a URL when it's pasted inside a
 * sentence ("visit https://example.com."). But a lone ")" is kept when the URL
 * itself contains an unmatched "(" (e.g. Wikipedia disambiguation links), since
 * stripping it there would break the link instead of cleaning it.
 */
const TRAILING_PUNCTUATION_CHARS = /[.,;:!?\]"'`]/;

export function splitTrailingPunctuation(rawUrl: string): {
  core: string;
  trailing: string;
} {
  let core = rawUrl;
  let trailing = "";

  while (core.length > 0) {
    const lastChar = core[core.length - 1];

    if (lastChar === ")") {
      const opens = (core.match(/\(/g) ?? []).length;
      const closes = (core.match(/\)/g) ?? []).length;
      if (opens >= closes) break;
    } else if (!TRAILING_PUNCTUATION_CHARS.test(lastChar)) {
      break;
    }

    trailing = lastChar + trailing;
    core = core.slice(0, -1);
  }

  return { core, trailing };
}
