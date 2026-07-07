import { splitTrailingPunctuation } from "./url-utils";

export interface ExtractResult {
  emails: string[];
  links: string[];
}

// Bounded classes only — no nested quantifiers, safe against ReDoS on long inputs.
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const LINK_REGEX = /\b(?:https?:\/\/|www\.)[^\s<>"']+/gi;

function dedupeInOrder(values: string[]): string[] {
  return Array.from(new Set(values));
}

export function extractEmailsAndLinks(text: string): ExtractResult {
  const emails = dedupeInOrder(text.match(EMAIL_REGEX) ?? []);

  const rawLinks = text.match(LINK_REGEX) ?? [];
  const links = dedupeInOrder(
    rawLinks.map((link) => splitTrailingPunctuation(link).core),
  );

  return { emails, links };
}
