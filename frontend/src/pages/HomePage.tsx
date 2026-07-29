import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  MessageCircleMore,
  Search,
  Sparkles,
} from "lucide-react";
import { useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { BookCard } from "@/components/BookCard";
import { BookCover } from "@/components/BookCover";
import { DemoBadge } from "@/components/DemoBadge";
import { SectionHeading } from "@/components/SectionHeading";
import { mockBooks } from "@/data/mockBooks";

export function HomePage() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const trendingRef = useRef<HTMLDivElement>(null);
  const featured = mockBooks[0];

  const moveTrending = (direction: -1 | 1) => {
    trendingRef.current?.scrollBy({
      left: direction * Math.min(trendingRef.current.clientWidth * 0.82, 720),
      behavior: "smooth",
    });
  };

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search");
  };

  return (
    <>
      <section className="soft-grid relative overflow-hidden border-b border-black/6">
        <div className="absolute left-[8%] top-12 size-40 rounded-full bg-[#d9f29d]/35 blur-3xl" />
        <div className="absolute right-[7%] top-32 size-52 rounded-full bg-[#9ed8ca]/30 blur-3xl" />
        <div className="page-shell grid min-h-[610px] items-center gap-12 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
          <div className="fade-up relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/15 bg-white/75 px-4 py-2 text-xs font-bold text-[var(--brand)] shadow-sm backdrop-blur">
              <Sparkles size={14} />
              리뷰 속 진짜 이야기를 AI로 한눈에
            </div>
            <h1 className="home-hero-title display-serif font-bold">
              <span>다음 책을 고르는</span>
              <span className="relative inline-block text-[var(--brand)]">
                더 나은 기준
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 360 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M3 13C88 4 241 4 357 10" stroke="#9AC66E" strokeWidth="7" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-8 max-w-xl break-keep text-base leading-8 text-[var(--muted)] sm:text-lg">
              수많은 리뷰를 직접 헤매지 마세요. BookPickAI가 감정, 키워드, 장단점을 읽고
              당신의 취향에 맞는 책을 골라드려요.
            </p>

            <form
              onSubmit={search}
              className="mt-9 flex max-w-xl items-center gap-2 rounded-[20px] border border-black/8 bg-white p-2.5 shadow-[0_18px_50px_rgba(37,59,51,0.12)]"
            >
              <Search className="ml-3 shrink-0 text-[var(--brand)]" size={21} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none sm:text-base"
                placeholder="제목, 작가, 또는 읽고 싶은 분위기"
                aria-label="도서 검색"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-[var(--ink)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--brand)] sm:px-7"
              >
                찾아보기
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[var(--muted)]">
              <span className="font-bold text-[var(--ink)]">요즘 많이 찾아요</span>
              {["마음이 편해지는 소설", "AI 입문", "여름 에세이"].map((term) => (
                <button
                  type="button"
                  key={term}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(term)}`)}
                  className="hover:text-[var(--brand)]"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="fade-up-delay relative mx-auto hidden w-full max-w-[500px] lg:block">
            <div className="absolute -left-7 top-16 z-20 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur">
              <p className="text-[10px] font-extrabold tracking-widest text-[var(--brand)] uppercase">AI Pick</p>
              <p className="mt-1 text-sm font-bold">지금 취향과 92% 일치</p>
            </div>
            <div className="relative ml-auto w-[57%] rotate-[4deg]">
              <BookCover book={featured} />
            </div>
            <div className="absolute -bottom-10 left-0 z-20 w-[67%] rounded-[24px] border border-black/7 bg-white/95 p-5 shadow-[0_24px_50px_rgba(25,49,41,0.17)] backdrop-blur">
              <div className="flex items-center justify-between">
                <DemoBadge />
                <span className="text-xs font-black text-[var(--brand)]">긍정 78%</span>
              </div>
              <p className="mt-4 text-sm font-bold leading-6">
                “잔잔한 문장과 세밀한 감정 묘사가 오래 남아요.”
              </p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e6e5de]">
                <div className="h-full w-[78%] rounded-full bg-[var(--brand)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-20">
        <div className="overflow-hidden rounded-[32px] bg-[var(--ink)] text-white shadow-[0_20px_60px_rgba(25,45,38,0.13)]">
          <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
            <div className="relative overflow-hidden border-b border-white/8 p-8 sm:p-11 lg:border-b-0 lg:border-r">
              <div className="absolute -bottom-24 -right-20 size-64 rounded-full border-[45px] border-white/5" />
              <p className="text-xs font-extrabold tracking-[0.16em] text-[var(--lime)] uppercase">
                Today&apos;s personal pick
              </p>
              <h2 className="display-serif mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                오늘 당신을 위한
                <br />
                세 권의 책
              </h2>
              <p className="mt-5 max-w-md break-keep text-sm leading-7 text-white/55">
                잔잔한 분위기와 읽기 쉬운 문체를 좋아하는 취향을 기준으로 골랐어요.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["잔잔한 분위기", "감정 묘사", "높은 가독성"].map((taste) => (
                  <span key={taste} className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/65">
                    {taste}
                  </span>
                ))}
              </div>
              <Link
                href="/recommend"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--lime)] px-5 py-3 text-sm font-black text-[var(--ink)] hover:gap-3"
              >
                추천 기준 확인하기 <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-px bg-white/8 sm:grid-cols-3">
              {mockBooks.slice(0, 3).map((book, index) => (
                <Link
                  key={book.id}
                  href={`/books/${book.isbn13}`}
                  className="group bg-[var(--ink)] p-6 hover:bg-white/[0.045] sm:p-7"
                >
                  <div className="mx-auto w-[112px]">
                    <BookCover
                      book={book}
                      compact
                      className="w-full transition duration-300 group-hover:-translate-y-1"
                    />
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[10px] font-black tracking-[0.12em] text-[var(--lime)] uppercase">
                        Match {94 - index * 3}%
                      </span>
                      <span className="text-[10px] text-white/35">{book.category}</span>
                    </div>
                    <h3 className="mt-2 line-clamp-2 font-bold leading-6">{book.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/45">
                      {book.insight.recommendedFor[0]}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-24">
        <SectionHeading
          eyebrow="Trending now"
          title="지금, 독자들이 고른 책"
          description="평점과 관심도를 바탕으로 오늘 주목받는 책을 모았어요."
          link="/search"
        />
        <div className="-mt-5 mb-7 flex items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            <span className="font-black text-[var(--brand)]">12권</span> · 옆으로 넘겨 더 살펴보세요
          </p>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => moveTrending(-1)}
              className="flex size-10 items-center justify-center rounded-full border border-black/9 bg-white text-[var(--muted)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
              aria-label="인기 도서 이전 목록"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => moveTrending(1)}
              className="flex size-10 items-center justify-center rounded-full border border-black/9 bg-white text-[var(--muted)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
              aria-label="인기 도서 다음 목록"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div
          ref={trendingRef}
          className="book-carousel -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-5 md:gap-6"
          aria-label="인기 도서 가로 목록"
        >
          {mockBooks.map((book) => (
            <div key={book.id} className="w-[158px] shrink-0 snap-start sm:w-[174px]">
              <BookCard book={book} showRank />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-black/7 bg-white py-20">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Browse by mood"
            title="장르에서 시작하는 새로운 발견"
            description="익숙한 장르부터 평소 고르지 않던 분야까지 가볍게 둘러보세요."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "소설", note: "이야기에 깊이 빠지고 싶을 때", icon: BookOpen, color: "bg-[#dceee8]" },
              { name: "인문", note: "생각의 폭을 넓히고 싶을 때", icon: BrainCircuit, color: "bg-[#eee7d8]" },
              { name: "에세이", note: "마음에 작은 쉼이 필요할 때", icon: MessageCircleMore, color: "bg-[#f4e4dd]" },
              { name: "경제·경영", note: "일과 성장을 고민하고 있을 때", icon: Sparkles, color: "bg-[#e3e7f1]" },
              { name: "과학·기술", note: "새로운 지식을 발견하고 싶을 때", icon: Search, color: "bg-[#e5efcf]" },
            ].map(({ name, note, icon: Icon, color }) => (
              <Link
                key={name}
                href={`/search?genre=${encodeURIComponent(name)}`}
                className="group rounded-[24px] border border-black/7 bg-[var(--paper)] p-5 hover:-translate-y-1 hover:border-[var(--brand)]/30 hover:shadow-lg"
              >
                <span className={`flex size-11 items-center justify-center rounded-2xl ${color} text-[var(--brand-dark)]`}>
                  <Icon size={19} />
                </span>
                <h3 className="mt-6 font-black">{name}</h3>
                <p className="mt-2 break-keep text-xs leading-5 text-[var(--muted)]">{note}</p>
                <span className="mt-5 flex items-center gap-1 text-xs font-black text-[var(--brand)] group-hover:gap-2">
                  둘러보기 <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="recommend" className="bg-[var(--ink)] py-24 text-white">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Review intelligence"
            title="별점 하나로는 알 수 없는 것"
            description="리뷰가 말하는 장점과 아쉬운 점을 균형 있게 읽어보세요."
            tone="dark"
          />
          <div className="grid overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.045] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden bg-[#d9f29d] p-12 text-[var(--ink)]">
              <div className="absolute -right-16 -top-16 size-64 rounded-full border-[45px] border-white/25" />
              <div className="relative max-w-sm">
                <DemoBadge />
                <p className="mt-8 text-xs font-extrabold tracking-[0.15em] text-[var(--brand)] uppercase">
                  184개 리뷰를 읽었어요
                </p>
                <h3 className="display-serif mt-3 text-4xl font-bold leading-tight">
                  조용한 위로와
                  <br />
                  오래 남는 문장
                </h3>
                <p className="mt-5 text-sm leading-7 text-black/65">
                  큰 사건보다 인물의 내면 변화를 천천히 따라가는 작품이에요. 감정 묘사와 분위기를
                  중요하게 생각하는 독자에게 잘 맞아요.
                </p>
                <Link
                  href={`/books/${featured.isbn13}`}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-bold text-white hover:gap-3"
                >
                  AI 분석 자세히 보기 <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="grid gap-px bg-white/10 sm:grid-cols-2">
              {[
                {
                  icon: BrainCircuit,
                  title: "감정 분석",
                  text: "리뷰의 긍정·중립·부정 비율과 문장별 뉘앙스를 분석해요.",
                },
                {
                  icon: MessageCircleMore,
                  title: "장단점 요약",
                  text: "반복해서 언급된 장점과 아쉬움을 짧고 균형 있게 정리해요.",
                },
                {
                  icon: BookOpen,
                  title: "독서 성향",
                  text: "문체, 몰입감, 난이도처럼 책을 고를 때 중요한 기준을 비교해요.",
                },
                {
                  icon: Sparkles,
                  title: "취향 추천",
                  text: "검색과 찜 기록을 토대로 지금 읽기 좋은 책을 제안해요.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-[var(--ink)] p-9 sm:p-10">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-white/8 text-[var(--lime)]">
                    <Icon size={23} />
                  </span>
                  <h3 className="mt-7 text-lg font-bold">{title}</h3>
                  <p className="mt-3 break-keep text-sm leading-7 text-white/55">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-24">
        <div className="rounded-[32px] border border-black/8 bg-white px-7 py-12 text-center shadow-[0_14px_50px_rgba(30,45,40,0.06)] sm:px-12">
          <span className="mx-auto flex size-13 items-center justify-center rounded-2xl bg-[#e9f3ef] text-[var(--brand)]">
            <Sparkles size={23} />
          </span>
          <h2 className="display-serif mt-6 text-3xl font-bold sm:text-4xl">
            오늘은 어떤 이야기가 필요하세요?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
            “퇴근 후 가볍게 읽을 책”, “몰입감 높은 추리소설”처럼 자연스럽게 물어보세요.
          </p>
          <button
            type="button"
            onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="AI에게 책 추천받기"]')?.click()}
            className="mt-7 rounded-full bg-[var(--brand)] px-7 py-3.5 text-sm font-bold text-white hover:-translate-y-0.5 hover:bg-[var(--brand-dark)]"
          >
            AI에게 추천받기
          </button>
        </div>
      </section>
    </>
  );
}
