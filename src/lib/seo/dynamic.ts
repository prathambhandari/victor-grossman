import type { Metadata } from "next";

import { stripHtml } from "@/lib/html";

import {
  articlePath,
  bookPath,
  bulletinPath,
  interviewPath,
  SEO_SECTION_PATHS,
} from "./paths";
import type { PublicArchiveData } from "./public-data";
import {
  DEFAULT_TITLE,
  KEYWORDS,
  PERSON,
  SITE_NAME,
  SITE_URL,
} from "./site";

/** Primary brand keyword — used in titles and descriptions. */
export const BRAND_QUERY = "Victor Grossman";

export function buildDynamicHomeDescription(archive: PublicArchiveData): string {
  const { bulletins, articles, books, interviews } = archive;
  return (
    `Official ${BRAND_QUERY} memorial at www.victorgrossman.com — biography of Stephen Wechsler (1928–2025), ` +
    `${bulletins.length} Berlin Bulletins, ${books.length} books, ${articles.length} articles, ` +
    `${interviews.length} interviews, photo archive, funeral eulogies, and wall of memories. ` +
    `American journalist and author in East Germany and Berlin.`
  );
}

export function buildHomeMetadata(archive: PublicArchiveData): Metadata {
  const description = buildDynamicHomeDescription(archive);
  const ogImage = PERSON.heroImage;

  return {
    title: DEFAULT_TITLE,
    description,
    keywords: [
      ...KEYWORDS,
      `${BRAND_QUERY} official website`,
      `${BRAND_QUERY} memorial site`,
      `${BRAND_QUERY} biography`,
      `${BRAND_QUERY} Berlin Bulletin archive`,
    ],
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["de_DE"],
      url: SITE_URL,
      siteName: SITE_NAME,
      title: DEFAULT_TITLE,
      description,
      images: [
        {
          url: ogImage,
          width: 1920,
          height: 1080,
          alt: `${BRAND_QUERY} (1928–2025) — official memorial`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_TITLE,
      description,
      images: [ogImage],
    },
  };
}

/** SEO title: leads with Victor Grossman for brand queries. */
export function victorGrossmanPageTitle(
  headline: string,
  section?: string,
): string {
  const base = headline.includes(BRAND_QUERY)
    ? headline
    : `${headline} — ${BRAND_QUERY}`;
  return section ? `${base} | ${section}` : base;
}

/** Meta description prefixed with Victor Grossman when missing. */
export function victorGrossmanDescription(
  text: string,
  fallback: string,
): string {
  const body = (text && stripHtml(text).slice(0, 155)) || fallback;
  if (body.toLowerCase().includes("victor grossman")) return body;
  return `${BRAND_QUERY}: ${body}`;
}

export function victorGrossmanKeywords(
  extra: string[] = [],
): string[] {
  return [
    BRAND_QUERY,
    PERSON.alternateName,
    "Victor Grossman official site",
    "Victor Grossman Berlin",
    "Victor Grossman Berlin Bulletin",
    "Stephen Wechsler",
    ...extra,
  ].filter(Boolean);
}

export type ArchiveLinkItem = { name: string; url: string };

export function archiveLinkItems(archive: PublicArchiveData): {
  bulletins: ArchiveLinkItem[];
  articles: ArchiveLinkItem[];
  books: ArchiveLinkItem[];
  interviews: ArchiveLinkItem[];
  sections: ArchiveLinkItem[];
} {
  return {
    sections: [
      { name: `${BRAND_QUERY} Biography`, url: SEO_SECTION_PATHS.biography },
      {
        name: `${BRAND_QUERY} Berlin Bulletin`,
        url: SEO_SECTION_PATHS.berlinBulletin,
      },
      { name: `${BRAND_QUERY} Books`, url: SEO_SECTION_PATHS.books },
      { name: `${BRAND_QUERY} Articles`, url: SEO_SECTION_PATHS.articles },
      {
        name: `${BRAND_QUERY} Interviews`,
        url: SEO_SECTION_PATHS.interviews,
      },
    ],
    bulletins: archive.bulletins.map((b) => ({
      name: b.title,
      url: bulletinPath(b),
    })),
    articles: archive.articles.map((a) => ({
      name: a.title,
      url: articlePath(a),
    })),
    books: archive.books.map((b) => ({
      name: b.title,
      url: bookPath(b),
    })),
    interviews: archive.interviews.map((i) => ({
      name: i.title,
      url: interviewPath(i),
    })),
  };
}
