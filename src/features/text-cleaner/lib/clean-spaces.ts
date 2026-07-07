const MULTI_SPACE_REGEX = /[ \t]{2,}/g;
const MULTI_BLANK_LINES_REGEX = /\n{3,}/g;

export function cleanSpaces(text: string): string {
  const collapsedLines = text
    .split("\n")
    .map((line) => line.replace(MULTI_SPACE_REGEX, " ").trim())
    .join("\n");

  return collapsedLines.replace(MULTI_BLANK_LINES_REGEX, "\n\n");
}
