import { expect, test } from "@playwright/test";

test.use({
  permissions: ["clipboard-read", "clipboard-write"],
});

test("cleans spaces and tracking params, then copies the result", async ({
  page,
}) => {
  await page.goto("/");

  const dirtyText =
    "Hola   Mundo   con   espacios  raros\nVisita https://example.com/promo?utm_source=newsletter&utm_medium=email&ref=abc para más info.";

  await page.getByPlaceholder("Pega aquí tu texto sucio…").fill(dirtyText);
  await page.getByRole("button", { name: "Limpiar espacios" }).click();
  await page.getByRole("button", { name: "Limpiar enlaces" }).click();

  await expect(page.getByPlaceholder("Pega aquí tu texto sucio…")).toHaveValue(
    "Hola Mundo con espacios raros\nVisita https://example.com/promo?ref=abc para más info.",
  );

  await page.getByRole("button", { name: "Copiar" }).click();
  await expect(page.getByText("Copiado al portapapeles")).toBeVisible();
});

test("extracts emails and links into a separate panel", async ({ page }) => {
  await page.goto("/");

  const text =
    "Contacto: ana@example.com y soporte@empresa.co, ver https://empresa.co/docs";

  await page.getByPlaceholder("Pega aquí tu texto sucio…").fill(text);
  await page.getByRole("button", { name: "Extraer emails y links" }).click();

  await expect(page.getByText("EMAILS ENCONTRADOS (2)")).toBeVisible();
  await expect(page.getByText("LINKS ENCONTRADOS (1)")).toBeVisible();
  await expect(
    page.getByText("ana@example.com", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("https://empresa.co/docs", { exact: true }),
  ).toBeVisible();
});
