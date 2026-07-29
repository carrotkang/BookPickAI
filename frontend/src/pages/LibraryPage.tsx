import { Bookmark, Sparkles } from "lucide-react";
import { BookCard } from "@/components/BookCard";
import { mockBooks } from "@/data/mockBooks";

export function LibraryPage() {
  return (
    <div className="page-shell py-14 sm:py-18">
      <div className="rounded-[32px] bg-[var(--ink)] px-7 py-10 text-white sm:px-12 sm:py-14">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-[var(--lime)]">
          <Bookmark size={20} />
        </span>
        <h1 className="display-serif mt-6 text-4xl font-bold sm:text-5xl">나의 책장</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
          관심 있는 책을 담고 평가할수록 취향에 맞는 추천이 정교해져요. 지금은 화면 확인을 위한 데모
          책장을 보여드리고 있습니다.
        </p>
      </div>

      <div className="mt-14 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[var(--brand)]">SAVED BOOKS</p>
          <h2 className="display-serif mt-2 text-3xl font-bold">읽어보고 싶은 책</h2>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-[#e9f3ef] px-4 py-2 text-xs font-bold text-[var(--brand)]">
          <Sparkles size={14} /> 3권
        </span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {mockBooks.slice(0, 3).map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
