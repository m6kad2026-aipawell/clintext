import { describe, expect, it } from "vitest";
import { changeCase } from "../text-case";

describe("changeCase", () => {
  it("converts to uppercase respecting Spanish accents", () => {
    expect(changeCase("canción sin límites", "upper")).toBe(
      "CANCIÓN SIN LÍMITES",
    );
  });

  it("converts to lowercase respecting Spanish accents", () => {
    expect(changeCase("CANCIÓN SIN LÍMITES", "lower")).toBe(
      "canción sin límites",
    );
  });

  it("converts to title case, capitalizing each word", () => {
    expect(changeCase("el señor de los anillos", "title")).toBe(
      "El Señor De Los Anillos",
    );
  });

  it("title case handles hyphenated and parenthesized words", () => {
    expect(changeCase("teoría (avanzada) y práctico-real", "title")).toBe(
      "Teoría (Avanzada) Y Práctico-Real",
    );
  });

  it("converts to sentence case, capitalizing only after sentence boundaries", () => {
    expect(changeCase("hola mundo. como estas? bien!", "sentence")).toBe(
      "Hola mundo. Como estas? Bien!",
    );
  });

  it("returns an empty string when given an empty string", () => {
    expect(changeCase("", "upper")).toBe("");
    expect(changeCase("", "title")).toBe("");
    expect(changeCase("", "sentence")).toBe("");
  });
});
