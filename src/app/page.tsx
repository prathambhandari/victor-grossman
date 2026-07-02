import type { Metadata } from "next";

import VictorApp from "@/components/victor/App";
import { CrawlableArchiveIndex } from "@/components/seo/CrawlableArchiveIndex";
import { CrawlableIntro } from "@/components/seo/CrawlableIntro";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { buildHomeMetadata } from "@/lib/seo/dynamic";
import { buildHomeJsonLdGraph } from "@/lib/seo/json-ld";
import { loadPublicArchive } from "@/lib/seo/public-data";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const archive = await loadPublicArchive();
  return buildHomeMetadata(archive);
}

export default async function Home() {
  const archive = await loadPublicArchive();

  return (
    <>
      <JsonLdScript data={buildHomeJsonLdGraph(archive)} />
      <CrawlableIntro />
      <CrawlableArchiveIndex archive={archive} />
      <VictorApp />
    </>
  );
}
