import { Bookmark, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import type { Book } from "@/types/book";
import { BookCover } from "@/components/BookCover";

type BookCardProps = {
  book: Book;
  showRank?: boolean;
};

export function BookCard({ book, showRank = false }: BookCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <article className="group min-w-0">
      <div className="relative px-2 pt-2">
        {showRank && book.rank && (
          <span
            className="absolute left-0 top-0 z-20 flex size-10 -translate-x-1 -translate-y-1 items-center justify-center rounded-full border-2 border-[var(--paper)] bg-[var(--ink)] text-sm font-black tabular-nums text-white shadow-[0_8px_20px_rgba(29,41,38,0.2)]"
            aria-label={`${book.rank}위`}
          >
            {book.rank}
          </span>
        )}
        <Link href={`/books/${book.isbn13}`} className="block">
          <BookCover
            book={book}
            compact
            className="w-full transition duration-300 group-hover:-translate-y-2 group-hover:shadow-[15px_24px_38px_rgba(26,39,35,0.22)]"
          />
        </Link>
        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          className={`absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border backdrop-blur ${
            saved
              ? "border-[var(--brand)] bg-[var(--brand)] text-white"
              : "border-white/50 bg-white/85 text-[var(--ink)] hover:bg-white"
          }`}
          aria-label={saved ? `${book.title} 찜 해제` : `${book.title} 찜하기`}
        >
          <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="px-2 pt-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-[var(--muted)]">
          <span>{book.category}</span>
          <span className="size-0.5 rounded-full bg-black/25" />
          <span className="flex items-center gap-1 font-bold text-[#b16a26]">
            <Star size={12} fill="currentColor" /> {book.rating.toFixed(1)}
          </span>
        </div>
        <Link href={`/books/${book.isbn13}`}>
          <h3 className="line-clamp-2 font-bold leading-6 tracking-[-0.025em] group-hover:text-[var(--brand)]">
            {book.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-[var(--muted)]">{book.author}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {book.insight.keywords.slice(0, 2).map((keyword) => (
            <span key={keyword} className="rounded-full bg-white px-2.5 py-1 text-[11px] text-[var(--muted)]">
              #{keyword}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
