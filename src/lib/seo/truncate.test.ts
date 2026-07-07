import { describe, expect, it } from "vitest";

import { truncateMetaDescription, META_DESCRIPTION_MAX } from "./truncate";

describe("truncateMetaDescription", () => {
  it("leaves short text unchanged", () => {
    const text = "Victor Grossman official memorial.";
    expect(truncateMetaDescription(text)).toBe(text);
  });

  it("truncates long text with ellipsis", () => {
    const long = "A".repeat(200);
    const result = truncateMetaDescription(long);
    expect(result.length).toBeLessThanOrEqual(META_DESCRIPTION_MAX);
    expect(result.endsWith("…")).toBe(true);
  });
});
