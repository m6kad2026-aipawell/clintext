import { splitTrailingPunctuation } from "./url-utils";

export type UrlCleanMode = "known-tracking" | "all-query-params";

// Bounded character class, no nested quantifiers — safe against ReDoS on long inputs.
// ')' and ']' are intentionally allowed here (URLs can legitimately contain them,
// e.g. Wikipedia disambiguation links) — splitTrailingPunctuation decides afterward
// whether a trailing one belongs to the URL or to the surrounding prose.
const URL_REGEX = /\bhttps?:\/\/[^\s<>"']+/gi;

const TRACKING_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
  "mc_eid",
  "mc_cid",
  "igshid",
  "msclkid",
  "yclid",
  "twclid",
]);

function cleanSingleUrl(rawUrl: string, mode: UrlCleanMode): string {
  const { core, trailing } = splitTrailingPunctuation(rawUrl);

  const queryIndex = core.indexOf("?");
  if (queryIndex === -1) return rawUrl;

  const base = core.slice(0, queryIndex);
  const hashIndex = core.indexOf("#", queryIndex);
  const queryString =
    hashIndex === -1
      ? core.slice(queryIndex + 1)
      : core.slice(queryIndex + 1, hashIndex);
  const hash = hashIndex === -1 ? "" : core.slice(hashIndex);

  if (mode === "all-query-params") {
    return base + hash + trailing;
  }

  const remainingParams = queryString
    .split("&")
    .filter((pair) => pair.length > 0)
    .filter((pair) => !TRACKING_PARAMS.has(pair.split("=")[0].toLowerCase()));

  const newQuery =
    remainingParams.length > 0 ? `?${remainingParams.join("&")}` : "";
  return base + newQuery + hash + trailing;
}

export function cleanTrackingParams(
  text: string,
  mode: UrlCleanMode = "known-tracking",
): string {
  return text.replace(URL_REGEX, (match) => cleanSingleUrl(match, mode));
}
