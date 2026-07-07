import { describe, expect, it } from "vitest";
import { cleanTrackingParams } from "../clean-urls";

describe("cleanTrackingParams", () => {
  it("removes known tracking params by default", () => {
    const input = "Mira esto: https://example.com?utm_source=fb&ref=123";
    expect(cleanTrackingParams(input)).toBe(
      "Mira esto: https://example.com?ref=123",
    );
  });

  it("removes the leftover '?' when no params remain", () => {
    const input = "https://example.com?utm_source=fb&utm_medium=social";
    expect(cleanTrackingParams(input)).toBe("https://example.com");
  });

  it("removes fbclid and gclid too", () => {
    const input = "https://example.com?fbclid=abc&gclid=xyz&page=2";
    expect(cleanTrackingParams(input)).toBe("https://example.com?page=2");
  });

  it("removes ALL query params in aggressive mode", () => {
    const input = "https://example.com?page=2&sort=asc";
    expect(cleanTrackingParams(input, "all-query-params")).toBe(
      "https://example.com",
    );
  });

  it("preserves a trailing period that belongs to the sentence, not the URL", () => {
    const input = "Visita https://example.com/page?utm_source=x.";
    expect(cleanTrackingParams(input)).toBe("Visita https://example.com/page.");
  });

  it("keeps a URL with a hash fragment intact after removing tracking params", () => {
    const input = "https://example.com/page?utm_source=x#section";
    expect(cleanTrackingParams(input)).toBe("https://example.com/page#section");
  });

  it("leaves URLs without query params unchanged", () => {
    const input = "https://example.com/pricing";
    expect(cleanTrackingParams(input)).toBe(input);
  });

  it("leaves text without URLs unchanged", () => {
    const input = "este texto no tiene ningun enlace";
    expect(cleanTrackingParams(input)).toBe(input);
  });

  it("does not modify non-tracking query params", () => {
    const input = "https://example.com?page=2&sort=asc";
    expect(cleanTrackingParams(input)).toBe(input);
  });

  it("handles multiple URLs in the same text independently", () => {
    const input =
      "Primero https://a.com?utm_source=x luego https://b.com?utm_medium=y&keep=1";
    expect(cleanTrackingParams(input)).toBe(
      "Primero https://a.com luego https://b.com?keep=1",
    );
  });

  it("keeps a URL's own balanced parenthesis but strips the sentence's wrapping one", () => {
    const input =
      "(ver https://en.wikipedia.org/wiki/Example_(disambiguation)?utm_source=x)";
    expect(cleanTrackingParams(input)).toBe(
      "(ver https://en.wikipedia.org/wiki/Example_(disambiguation))",
    );
  });

  it("handles a large input without throwing (ReDoS guard)", () => {
    const large = `https://example.com?utm_source=${"a".repeat(20000)}`;
    expect(() => cleanTrackingParams(large)).not.toThrow();
  });
});
