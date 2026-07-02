import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { SeoPageShell } from "@/components/seo/SeoPageShell";
import { buildItemListJsonLd } from "@/lib/seo/json-ld";
import { buildSectionMetadata } from "@/lib/seo/metadata";
import { bookPath, SEO_SECTION_PATHS } from "@/lib/seo/paths";
import { loadPublicArchive } from "@/lib/seo/public-data";
import { stripHtml } from "@/lib/html";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { books } = await loadPublicArchive();
  return buildSectionMetadata(
    `Victor Grossman Books (${books.length} titles)`,
    `Victor Grossman — ${books.length} books and publications including Crossing the River. Stephen Wechsler, GDR journalist and author. Official memorial at www.victorgrossman.com.`,
    SEO_SECTION_PATHS.books,
  );
}

export default async function BooksIndexPage() {
  const { books } = await loadPublicArchive();
  const listItems = books.map((b) => ({ name: b.title, url: bookPath(b) }));

  return (
    <SeoPageShell
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Books" }]}
    >
      <JsonLdScript
        data={buildItemListJsonLd(
          "Books by Victor Grossman",
          SEO_SECTION_PATHS.books,
          listItems,
        )}
      />
      <h1 className="font-serif text-4xl font-bold italic text-slate-900">
        Books by Victor Grossman
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        Memoirs, reportage, and historical works by Victor Grossman — from{" "}
        <em>Crossing the River</em> to decades of writing on Germany and the
        GDR.
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {books.map((book) => (
          <li
            key={book.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            {book.image_url ? (
              <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={book.image_url}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 320px"
                />
              </div>
            ) : null}
            <Link
              href={bookPath(book)}
              className="font-serif text-xl font-bold italic text-slate-900 hover:text-blue-700"
            >
              {book.title}
            </Link>
            <p className="mt-1 text-sm text-slate-500">{book.author}</p>
            {book.description ? (
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {stripHtml(book.description).slice(0, 200)}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </SeoPageShell>
  );
}
