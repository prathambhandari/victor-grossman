import type { Metadata } from "next";

import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  KEYWORDS,
  PERSON,
  SITE_NAME,
  SITE_URL,
} from "./site";
import {
  victorGrossmanDescription,
  victorGrossmanKeywords,
  victorGrossmanPageTitle,
} from "./dynamic";

type ContentMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
};

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function buildContentMetadata({
  title,
  description,
  path,
  image,
  publishedTime,
  modifiedTime,
  keywords,
  section,
}: ContentMetadataInput & { section?: string }): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image?.trim() || PERSON.heroImage;
  const seoTitle = victorGrossmanPageTitle(title, section);
  const seoDescription = victorGrossmanDescription(
    description,
    `${title} — official Victor Grossman memorial archive.`,
  );
  const seoKeywords = victorGrossmanKeywords(keywords);

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_US",
      alternateLocale: ["de_DE"],
      url,
      siteName: SITE_NAME,
      title: seoTitle,
      description: seoDescription,
      images: [{ url: ogImage, alt: `${title} — Victor Grossman` }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
    },
  };
}

export function buildSectionMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return buildContentMetadata({ title, description, path, section: SITE_NAME });
}

/** Default metadata for the root layout (homepage + fallbacks for all routes). */
export function buildRootLayoutMetadata(): Metadata {
  const ogImage = PERSON.heroImage;

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
      default: DEFAULT_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [...KEYWORDS],
    authors: [
      { name: PERSON.name, url: SITE_URL },
      { name: PERSON.alternateName, url: SITE_URL },
    ],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "memorial",
    classification: "memorial biographical archive",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    referrer: "origin-when-cross-origin",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        en: SITE_URL,
        de: SITE_URL,
      },
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["de_DE"],
      url: SITE_URL,
      siteName: SITE_NAME,
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          width: 1920,
          height: 1080,
          alt: `${PERSON.name} (1928–2025) — official memorial and Berlin Bulletin archive`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: {
        url: ogImage,
        alt: `${PERSON.name} memorial`,
      },
    },
    appleWebApp: {
      capable: true,
      title: "Victor Grossman",
      statusBarStyle: "default",
    },
    other: {
      "ai-content-declaration": "memorial-biographical-archive",
      subject: `${PERSON.name}, Berlin Bulletin, GDR journalist, Stephen Wechsler`,
    },
  };
}
