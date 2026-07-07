import { describe, expect, it } from "vitest";
import { cleanSpaces } from "../clean-spaces";

describe("cleanSpaces", () => {
  it("collapses double and multiple spaces into one", () => {
    expect(cleanSpaces("hola   mundo  como  estas")).toBe(
      "hola mundo como estas",
    );
  });

  it("trims leading and trailing whitespace per line", () => {
    expect(cleanSpaces("  hola mundo  \n  otra linea  ")).toBe(
      "hola mundo\notra linea",
    );
  });

  it("collapses 3+ consecutive blank lines into a single blank line", () => {
    expect(cleanSpaces("parrafo uno\n\n\n\nparrafo dos")).toBe(
      "parrafo uno\n\nparrafo dos",
    );
  });

  it("returns an empty string when given an empty string", () => {
    expect(cleanSpaces("")).toBe("");
  });

  it("leaves already-clean text unchanged", () => {
    expect(cleanSpaces("texto limpio\nsin problemas")).toBe(
      "texto limpio\nsin problemas",
    );
  });

  it("handles a large input without throwing", () => {
    const large = "palabra  con  espacios  ".repeat(3000);
    expect(() => cleanSpaces(large)).not.toThrow();
  });
});
