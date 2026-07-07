import { describe, expect, it } from "vitest";

import {
  BRAND_QUERY,
  buildHomeMetaDescription,
  buildDynamicHomeSummary,
  victorGrossmanDescription,
  victorGrossmanPageTitle,
} from "./dynamic";
import { META_DESCRIPTION_MAX } from "./truncate";

describe("dynamic SEO", () => {
  it("uses Victor Grossman as brand query", () => {
    expect(BRAND_QUERY).toBe("Victor Grossman");
  });

  it("builds short homepage meta description", () => {
    const archive = {
      articles: [{ id: "1", title: "A", created_at: "", category: "", is_published: true }],
      bulletins: Array.from({ length: 114 }, (_, i) => ({
        id: String(i),
        title: "B",
        created_at: "",
      })),
      books: Array.from({ length: 11 }, (_, i) => ({
        id: String(i),
        title: "Book",
        author: "VG",
        created_at: "",
      })),
      interviews: [],
    };
    const desc = buildHomeMetaDescription(archive);
    expect(desc).toContain("Victor Grossman");
    expect(desc).toContain("114 Berlin Bulletins");
    expect(desc.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
  });

  it("keeps long summary separate from meta description", () => {
    const archive = {
      articles: [],
      bulletins: [{ id: "1", title: "B", created_at: "" }],
      books: [],
      interviews: [],
    };
    const summary = buildDynamicHomeSummary(archive);
    expect(summary.length).toBeGreaterThan(META_DESCRIPTION_MAX);
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
