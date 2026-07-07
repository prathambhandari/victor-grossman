/** Canonical site URL — must match Vercel primary domain (www). */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.victorgrossman.com";

export const SITE_NAME = "Victor Grossman Memorial";

export const PERSON = {
  name: "Victor Grossman",
  alternateName: "Stephen Wechsler",
  birthDate: "1928-03-11",
  deathDate: "2025-12-17",
  birthPlace: "New York City, United States",
  deathPlace: "Berlin, Germany",
  description:
    "Victor Grossman (born Stephen Wechsler, March 11, 1928 – December 17, 2025) was an American socialist journalist, author, and translator who lived in East Germany and Berlin. The only person known to hold degrees from both Harvard University and Karl Marx University in Leipzig, he wrote the Berlin Bulletin and worked as a bridge between East and West.",
  jobTitle: "Journalist, author, and translator",
  knowsAbout: [
    "East Germany (GDR)",
    "Berlin Bulletin",
    "Cold War history",
    "Socialist journalism",
    "Paul Robeson Archive",
    "German-American relations",
  ],
  sameAs: [
    "https://en.wikipedia.org/wiki/Victor_Grossman",
    "https://victorgrossmansberlinbulletin.wordpress.com/",
    "https://www.victorgrossman.com/",
  ],
  heroImage:
    "https://bilder.deutschlandfunk.de/FI/LE/_3/70/FILE_37094d6d0577fb2093d8e96b3ff84bd9/2630844420-victor-2019-jpg-100-1920x1080.jpg",
} as const;

export const DEFAULT_TITLE =
  "Victor Grossman | Official Memorial Site (1928–2025)";

export const DEFAULT_DESCRIPTION =
  "Victor Grossman (1928–2025) — official memorial. Biography, Berlin Bulletins, books, interviews & photos. Stephen Wechsler, journalist in Berlin.";

export const KEYWORDS = [
  "Victor Grossman",
  "Victor Grossman official website",
  "Victor Grossman memorial",
  "Victor Grossman site",
  "Stephen Wechsler",
  "www.victorgrossman.com",
  "victorgrossman.com",
  "Victor Grossman biography",
  "Victor Grossman Berlin",
  "Berlin Bulletin Victor Grossman",
  "Victor Grossman Berlin Bulletin",
  "GDR journalist",
  "East Germany author",
  "Harvard Karl Marx University",
  "Trauerfeier Victor Grossman",
  "Victor Grossman books",
  "Crossing the River Victor Grossman",
  "Victor Grossman archive",
  "Victor Grossman interviews",
  "Victor Grossman 1928 2025",
] as const;
