export type CaseMode = "upper" | "lower" | "title" | "sentence";

const WORD_START_REGEX = /(^|[\s\-–—"'([{])(\p{L})/gu;
const SENTENCE_START_REGEX = /(^\s*|[.!?]\s+)(\p{L})/gu;

function toTitleCase(text: string): string {
  return text
    .toLocaleLowerCase("es")
    .replace(
      WORD_START_REGEX,
      (_match, sep, letter) => sep + letter.toLocaleUpperCase("es"),
    );
}

function toSentenceCase(text: string): string {
  return text
    .toLocaleLowerCase("es")
    .replace(
      SENTENCE_START_REGEX,
      (_match, sep, letter) => sep + letter.toLocaleUpperCase("es"),
    );
}

export function changeCase(text: string, mode: CaseMode): string {
  switch (mode) {
    case "upper":
      return text.toLocaleUpperCase("es");
    case "lower":
      return text.toLocaleLowerCase("es");
    case "title":
      return toTitleCase(text);
    case "sentence":
      return toSentenceCase(text);
  }
}
