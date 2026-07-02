import { PERSON, SITE_NAME, SITE_URL } from "./site";
import type { PublicArchiveData } from "./public-data";
import { archiveLinkItems } from "./dynamic";
import { SEO_SECTION_PATHS } from "./paths";

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#victor-grossman`,
    name: PERSON.name,
    alternateName: [PERSON.alternateName, "Victor Grossman Berlin"],
    additionalName: PERSON.alternateName,
    description: PERSON.description,
    birthDate: PERSON.birthDate,
    deathDate: PERSON.deathDate,
    birthPlace: {
      "@type": "Place",
      name: PERSON.birthPlace,
    },
    deathPlace: {
      "@type": "Place",
      name: PERSON.deathPlace,
    },
    jobTitle: PERSON.jobTitle,
    knowsAbout: PERSON.knowsAbout,
    sameAs: PERSON.sameAs,
    image: PERSON.heroImage,
    url: SITE_URL,
    mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: [
      "Victor Grossman Memorial Website",
      "Victor Grossman Official Site",
      "victorgrossman.com",
    ],
    url: SITE_URL,
    description: PERSON.description,
    inLanguage: ["en", "de"],
    about: { "@id": `${SITE_URL}/#victor-grossman` },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}${SEO_SECTION_PATHS.berlinBulletin}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "Victor Grossman (1928–2025) — Memorial & Digital Archive",
    description: PERSON.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#victor-grossman` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: PERSON.heroImage,
    },
    inLanguage: "en",
  };
}

export function buildProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: "Victor Grossman Memorial Profile",
    mainEntity: { "@id": `${SITE_URL}/#victor-grossman` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function buildHomeJsonLdGraph(archive?: PublicArchiveData) {
  const graph: Record<string, unknown>[] = [
    buildPersonJsonLd(),
    buildWebSiteJsonLd(),
    buildWebPageJsonLd(),
    buildProfilePageJsonLd(),
    buildOrganizationJsonLd(),
    buildFaqJsonLd(),
  ];

  if (archive) {
    const links = archiveLinkItems(archive);
    graph.push(
      buildItemListJsonLd(
        "Victor Grossman Berlin Bulletin Archive",
        SEO_SECTION_PATHS.berlinBulletin,
        links.bulletins,
      ),
      buildItemListJsonLd(
        "Books by Victor Grossman",
        SEO_SECTION_PATHS.books,
        links.books,
      ),
    );
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "Who was Victor Grossman?",
        acceptedAnswer: {
          "@type": "Answer",
          text: PERSON.description,
        },
      },
      {
        "@type": "Question",
        name: "What was Victor Grossman's birth name?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Victor Grossman was born Stephen Wechsler on March 11, 1928 in New York City. He adopted the name Victor Grossman after defecting to East Germany in 1952.`,
        },
      },
      {
        "@type": "Question",
        name: "What is the Berlin Bulletin by Victor Grossman?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The Berlin Bulletin was Victor Grossman's newsletter on politics, history, and life in Berlin and Germany. The official archive at ${SITE_URL} covers issues from 2017 through 2025.`,
        },
      },
      {
        "@type": "Question",
        name: "Where is the official Victor Grossman memorial website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `The official memorial website for Victor Grossman is ${SITE_URL}, featuring biography, Berlin Bulletins, books, articles, interviews, photos, and tributes.`,
        },
      },
    ],
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: PERSON.heroImage,
    sameAs: PERSON.sameAs,
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };
}

export function buildArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string | null;
  author?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: input.image ?? PERSON.heroImage,
    author: {
      "@type": "Person",
      name: input.author ?? PERSON.name,
      "@id": `${SITE_URL}/#victor-grossman`,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}${input.path}`,
    inLanguage: ["en", "de"],
  };
}

export function buildNewsArticleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  bulletinNumber?: string | null;
}) {
  return {
    ...buildArticleJsonLd({
      title: input.title,
      description: input.description,
      path: input.path,
      datePublished: input.datePublished,
    }),
    "@type": "NewsArticle",
    articleSection: "Berlin Bulletin",
    ...(input.bulletinNumber
      ? { identifier: input.bulletinNumber }
      : {}),
  };
}

export function buildBookJsonLd(input: {
  title: string;
  description: string;
  path: string;
  author: string;
  image?: string | null;
  amazonUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: input.title,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    author: {
      "@type": "Person",
      name: input.author,
      "@id": `${SITE_URL}/#victor-grossman`,
    },
    image: input.image ?? PERSON.heroImage,
    ...(input.amazonUrl ? { offers: { "@type": "Offer", url: input.amazonUrl } } : {}),
  };
}

export function buildItemListJsonLd(
  name: string,
  path: string,
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: `${SITE_URL}${path}`,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 100).map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
