import { describe, expect, it } from "vitest";

import {
  BRAND_QUERY,
  buildDynamicHomeDescription,
  victorGrossmanDescription,
  victorGrossmanPageTitle,
} from "./dynamic";

describe("dynamic SEO", () => {
  it("uses Victor Grossman as brand query", () => {
    expect(BRAND_QUERY).toBe("Victor Grossman");
  });

  it("builds archive-aware home description", () => {
    const desc = buildDynamicHomeDescription({
      articles: [{ id: "1", title: "A", created_at: "", category: "", is_published: true }],
      bulletins: [{ id: "1", title: "B", created_at: "" }],
      books: [],
      interviews: [],
    });
    expect(desc).toContain("Victor Grossman");
    expect(desc).toContain("1 Berlin Bulletins");
    expect(desc).toContain("1 articles");
  });

  it("prefixes titles with Victor Grossman", () => {
    expect(victorGrossmanPageTitle("Rosy Skies", "Berlin Bulletin")).toContain(
      "Victor Grossman",
    );
  });

  it("prefixes descriptions when missing brand name", () => {
    expect(victorGrossmanDescription("A newsletter from Berlin.", "")).toMatch(
      /^Victor Grossman:/,
    );
  });
});
