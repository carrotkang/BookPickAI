import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  MessageCircleMore,
  Search,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BookCard } from "@/components/BookCard";
import { BookCover } from "@/components/BookCover";
import { DemoBadge } from "@/components/DemoBadge";
import { SectionHeading } from "@/components/SectionHeading";
import { mockBooks } from "@/data/mockBooks";

export function HomePage() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const featured = mockBooks[0];

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : "/search");
  };

  return (
    <>
      <section className="soft-grid relative overflow-hidden border-b border-black/6">
        <div className="absolute left-[8%] top-12 size-40 rounded-full bg-[#d9f29d]/35 blur-3xl" />
        <div className="absolute right-[7%] top-32 size-52 rounded-full bg-[#9ed8ca]/30 blur-3xl" />
        <div className="page-shell grid min-h-[680px] items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
          <div className="fade-up relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/15 bg-white/75 px-4 py-2 text-xs font-bold text-[var(--brand)] shadow-sm backdrop-blur">
              <Sparkles size={14} />
              리뷰 속 진짜 이야기를 AI로 한눈에
            </div>
            <h1 className="display-serif max-w-2xl text-[clamp(3rem,7vw,5.7rem)] font-bold leading-[1.03]">
              다음 책을 고르는
              <br />
              <span className="relative text-[var(--brand)]">
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

      <section className="page-shell py-24">
        <SectionHeading
          eyebrow="Trending now"
          title="지금, 독자들이 고른 책"
          description="평점과 관심도를 바탕으로 오늘 주목받는 책을 모았어요."
          link="/search"
        />
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 md:gap-x-7 lg:grid-cols-6">
          {mockBooks.map((book) => (
            <BookCard key={book.id} book={book} showRank />
          ))}
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
