import type { Book, CoverTheme } from "@/types/book";

const themes: Record<CoverTheme, string> = {
  forest: "from-[#164f42] via-[#2b765d] to-[#d9e6bd]",
  sunset: "from-[#b95136] via-[#e79a64] to-[#f4d6a2]",
  midnight: "from-[#101a30] via-[#253a62] to-[#7ca4a2]",
  ocean: "from-[#123c56] via-[#1f7891] to-[#b9e0d8]",
  clay: "from-[#7f4637] via-[#bf795d] to-[#edd1ae]",
  lavender: "from-[#3f355d] via-[#75669a] to-[#d8cee6]",
};

type BookCoverProps = {
  book: Book;
  className?: string;
  compact?: boolean;
};

export function BookCover({ book, className = "", compact = false }: BookCoverProps) {
  return (
    <div
      className={`relative isolate aspect-[2/3] overflow-hidden rounded-[4px_16px_16px_4px] bg-gradient-to-br ${themes[book.coverTheme]} shadow-[12px_18px_34px_rgba(26,39,35,0.17)] ${className}`}
      aria-label={`${book.title} 표지`}
      role="img"
    >
      <span className="absolute inset-y-0 left-0 w-[5%] bg-black/13" />
      <span className="absolute -right-[28%] top-[8%] size-[62%] rounded-full border border-white/30 bg-white/10" />
      <span className="absolute -bottom-[12%] -left-[15%] size-[58%] rounded-full bg-black/10 blur-sm" />
      <span className="absolute left-[14%] top-[12%] text-[7px] font-bold tracking-[0.25em] text-white/70 sm:text-[9px]">
        BOOKPICK EDITION
      </span>
      <div className="absolute inset-x-[14%] top-[28%]">
        <strong
          className={`display-serif block break-keep font-semibold leading-[1.25] text-white drop-shadow-sm ${
            compact ? "text-base sm:text-lg" : "text-2xl sm:text-3xl"
          }`}
        >
          {book.title}
        </strong>
        {!compact && (
          <span className="mt-3 block text-[10px] leading-4 text-white/75">{book.subtitle}</span>
        )}
      </div>
      <span className="absolute bottom-[10%] left-[14%] text-[8px] font-medium tracking-[0.18em] text-white/75 sm:text-[10px]">
        {book.author}
      </span>
    </div>
  );
}
