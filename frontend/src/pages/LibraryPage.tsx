import { ArrowRight, Bookmark, History, Sparkles, UserRound } from "lucide-react";
import { Link } from "wouter";
import { BookCard } from "@/components/BookCard";
import { mockBooks } from "@/data/mockBooks";
import { useAuth } from "@/store/AuthContext";

export function LibraryPage() {
  const { user } = useAuth();

  return (
    <div className="page-shell py-14 sm:py-18">
      <div className="rounded-[32px] bg-[var(--ink)] px-7 py-10 text-white sm:px-12 sm:py-14">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 text-[var(--lime)]">
          <Bookmark size={20} />
        </span>
        <h1 className="display-serif mt-6 text-4xl font-bold sm:text-5xl">나의 책장</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/60">
          {user
            ? `${user.name}님이 관심 있게 본 책과 추천 기록을 모았어요. 활동이 쌓일수록 추천이 더 정교해집니다.`
            : "관심 있는 책을 담고 평가할수록 취향에 맞는 추천이 정교해져요. 지금은 화면 확인을 위한 데모 책장을 보여드리고 있습니다."}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {user ? (
            <Link href="/profile" className="inline-flex items-center gap-2 rounded-full bg-[var(--lime)] px-5 py-3 text-sm font-black text-[var(--ink)]">
              <UserRound size={16} /> 취향 프로필 관리
            </Link>
          ) : (
            <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--lime)] px-5 py-3 text-sm font-black text-[var(--ink)]">
              로그인하고 내 책장 만들기 <ArrowRight size={16} />
            </Link>
          )}
          <Link href="/recommend" className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-5 py-3 text-sm font-bold text-white">
            <Sparkles size={16} /> AI 추천받기
          </Link>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
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

      <section className="mt-20 rounded-[28px] border border-black/8 bg-white p-7 sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-black text-[var(--brand)]"><History size={14} /> READING HISTORY</p>
            <h2 className="display-serif mt-2 text-2xl font-bold">최근 본 책</h2>
          </div>
          {!user && <span className="text-xs text-[var(--muted)]">로그인 후 기기 간 기록이 동기화됩니다.</span>}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {mockBooks.slice(3, 6).map((book) => (
            <Link key={book.id} href={`/books/${book.isbn13}`} className="flex min-w-0 items-center gap-4 rounded-2xl bg-[#f7f6f1] p-4 hover:bg-[#efeee7]">
              <div className="h-16 w-11 shrink-0 overflow-hidden rounded-md bg-[var(--brand)]" />
              <div className="min-w-0">
                <p className="truncate text-sm font-black">{book.title}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{book.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
