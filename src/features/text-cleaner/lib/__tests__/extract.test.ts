import { describe, expect, it } from "vitest";
import { extractEmailsAndLinks } from "../extract";

describe("extractEmailsAndLinks", () => {
  it("extracts a single email", () => {
    const result = extractEmailsAndLinks("Contacto: ana@example.com");
    expect(result.emails).toEqual(["ana@example.com"]);
    expect(result.links).toEqual([]);
  });

  it("extracts multiple emails and links from a large block of text", () => {
    const text = `
      Hola, escribime a ana@example.com o a soporte@empresa.co
      Mas info en https://example.com/docs y en www.empresa.co/ayuda
    `;
    const result = extractEmailsAndLinks(text);
    expect(result.emails).toEqual(["ana@example.com", "soporte@empresa.co"]);
    expect(result.links).toEqual([
      "https://example.com/docs",
      "www.empresa.co/ayuda",
    ]);
  });

  it("deduplicates repeated emails and links", () => {
    const text = "ana@example.com y otra vez ana@example.com";
    const result = extractEmailsAndLinks(text);
    expect(result.emails).toEqual(["ana@example.com"]);
  });

  it("strips trailing sentence punctuation from links but not from the URL itself", () => {
    const text = "Visita https://example.com/pagina.";
    const result = extractEmailsAndLinks(text);
    expect(result.links).toEqual(["https://example.com/pagina"]);
  });

  it("returns empty arrays when nothing is found", () => {
    const result = extractEmailsAndLinks(
      "este texto no tiene nada que extraer",
    );
    expect(result.emails).toEqual([]);
    expect(result.links).toEqual([]);
  });

  it("does not match a version number like 1.2.3 as a link", () => {
    const result = extractEmailsAndLinks("La version 1.2.3 ya salio");
    expect(result.links).toEqual([]);
  });

  it("handles a large input without throwing (ReDoS guard)", () => {
    const large = "ana@example.com ".repeat(5000);
    expect(() => extractEmailsAndLinks(large)).not.toThrow();
  });
});
