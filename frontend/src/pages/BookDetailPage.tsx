import {
  ArrowLeft,
  Bookmark,
  Check,
  ChevronRight,
  ExternalLink,
  Heart,
  Info,
  MessageSquareText,
  Minus,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "wouter";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { BookCard } from "@/components/BookCard";
import { BookCover } from "@/components/BookCover";
import { DemoBadge } from "@/components/DemoBadge";
import { findBookByIsbn, mockBooks } from "@/data/mockBooks";

const aspectLabels = {
  story: "내용",
  writingStyle: "문체",
  readability: "가독성",
  usefulness: "유익함",
};

export function BookDetailPage() {
  const { isbn13 = "" } = useParams();
  const book = findBookByIsbn(isbn13);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!book) {
    return (
      <div className="page-shell py-28 text-center">
        <h1 className="display-serif text-4xl font-bold">책을 찾지 못했어요</h1>
        <Link href="/search" className="mt-7 inline-flex rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-bold text-white">
          도서 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const radarData = Object.entries(book.insight.aspects).map(([key, value]) => ({
    subject: aspectLabels[key as keyof typeof aspectLabels],
    score: value,
    fullMark: 5,
  }));

  return (
    <>
      <section className="border-b border-black/7 bg-[#efede5]">
        <div className="page-shell py-6">
          <Link href="/search" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)] hover:text-[var(--brand)]">
            <ArrowLeft size={16} /> 검색 결과
          </Link>
        </div>
        <div className="page-shell grid gap-12 pb-16 pt-5 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] lg:gap-20">
          <div className="mx-auto w-[220px] md:w-full">
            <BookCover book={book} />
          </div>
          <div className="self-center">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[var(--brand)]">
              <span>{book.category}</span>
              <ChevronRight size={12} />
              <span>국내도서</span>
            </div>
            <h1 className="display-serif mt-5 break-keep text-4xl font-bold leading-[1.2] sm:text-5xl lg:text-6xl">
              {book.title}
            </h1>
            <p className="mt-4 text-base text-[var(--muted)] sm:text-lg">{book.subtitle}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <strong>{book.author} 지음</strong>
              <span className="text-[var(--muted)]">{book.publisher}</span>
              <span className="text-[var(--muted)]">{book.publishedDate.replaceAll("-", ". ")}</span>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 rounded-2xl border border-black/8 bg-white/70 px-4 py-3">
                <Star size={19} fill="currentColor" className="text-[#c7782f]" />
                <strong className="text-xl">{book.rating.toFixed(1)}</strong>
                <span className="text-xs text-[var(--muted)]">/ 5.0</span>
              </div>
              <div className="text-sm">
                <p className="font-bold">{book.insight.reviewCount.toLocaleString()}개 리뷰 분석</p>
                <p className="mt-1 text-xs text-[var(--muted)]">AI 분석 결과는 아래에서 확인하세요</p>
              </div>
            </div>

            <p className="mt-8 max-w-2xl break-keep text-sm leading-7 text-[var(--muted)]">{book.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setSaved((value) => !value)}
                className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${
                  saved
                    ? "bg-[var(--brand)] text-white"
                    : "border border-black/12 bg-white text-[var(--ink)] hover:border-[var(--brand)]"
                }`}
              >
                <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
                {saved ? "내 서재에 담았어요" : "내 서재에 담기"}
              </button>
              <button
                type="button"
                onClick={() => setLiked((value) => !value)}
                className={`flex size-11 items-center justify-center rounded-full border ${
                  liked ? "border-[#d76a67] bg-[#fff0ef] text-[#c9514e]" : "border-black/12 bg-white"
                }`}
                aria-label={liked ? "좋아요 취소" : "좋아요"}
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
              </button>
              <a
                href="#source"
                className="flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-[var(--muted)] hover:text-[var(--brand)]"
              >
                서점에서 보기 <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-[#e9f3ef] text-[var(--brand)]">
                <Sparkles size={19} />
              </span>
              <DemoBadge />
            </div>
            <h2 className="display-serif mt-5 text-3xl font-bold sm:text-4xl">AI가 읽은 리뷰 인사이트</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              여러 독자의 의견을 감정과 주제별로 정리했어요.
            </p>
          </div>
          <p className="flex items-center gap-2 rounded-full bg-[#f0eee7] px-4 py-2 text-xs text-[var(--muted)]">
            <Info size={14} /> 현재는 화면 확인용 모의 결과입니다
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[28px] bg-[var(--ink)] p-7 text-white sm:p-10">
            <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--lime)] uppercase">AI Summary</p>
            <p className="display-serif mt-5 max-w-3xl break-keep text-2xl font-semibold leading-[1.65] sm:text-3xl">
              {book.insight.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {book.insight.keywords.map((keyword) => (
                <span key={keyword} className="rounded-full border border-white/12 bg-white/7 px-3 py-2 text-xs text-white/75">
                  #{keyword}
                </span>
              ))}
            </div>
          </article>

          <article className="rounded-[28px] border border-black/8 bg-white p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[var(--muted)]">전체적인 반응</p>
                <h3 className="mt-2 text-xl font-black">긍정적이에요</h3>
              </div>
              <span className="display-serif text-5xl font-black text-[var(--brand)]">
                {book.insight.sentiment.positive}%
              </span>
            </div>
            <div className="mt-8 flex h-3 overflow-hidden rounded-full bg-[#ecebe6]">
              <span className="bg-[var(--brand)]" style={{ width: `${book.insight.sentiment.positive}%` }} />
              <span className="bg-[#d7b269]" style={{ width: `${book.insight.sentiment.neutral}%` }} />
              <span className="bg-[#cf716d]" style={{ width: `${book.insight.sentiment.negative}%` }} />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
              {[
                ["긍정", book.insight.sentiment.positive, "bg-[var(--brand)]"],
                ["중립", book.insight.sentiment.neutral, "bg-[#d7b269]"],
                ["부정", book.insight.sentiment.negative, "bg-[#cf716d]"],
              ].map(([label, value, color]) => (
                <div key={label} className="rounded-xl bg-[#f5f4ef] p-3">
                  <span className={`mb-2 block size-2 rounded-full ${color}`} />
                  <span className="text-[var(--muted)]">{label}</span>
                  <strong className="ml-1">{value}%</strong>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[28px] border border-black/8 bg-white p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-[#e9f3ef] text-[var(--brand)]">
                <ThumbsUp size={18} />
              </span>
              <h3 className="text-xl font-black">많이 언급된 장점</h3>
            </div>
            <ul className="mt-7 space-y-4">
              {book.insight.strengths.map((strength) => (
                <li key={strength} className="flex items-start gap-3 text-sm leading-6">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e1f3a9] text-[var(--brand-dark)]">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {strength}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[28px] border border-black/8 bg-white p-7 sm:p-9">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-[#fff0e4] text-[#b15d38]">
                <MessageSquareText size={18} />
              </span>
              <h3 className="text-xl font-black">구매 전 참고할 점</h3>
            </div>
            <ul className="mt-7 space-y-4">
              {book.insight.cautions.map((caution) => (
                <li key={caution} className="flex items-start gap-3 text-sm leading-6">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#ffdfca] text-[#a65331]">
                    <Minus size={12} strokeWidth={3} />
                  </span>
                  {caution}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[28px] border border-black/8 bg-white p-7 sm:p-9">
            <h3 className="text-xl font-black">리뷰로 본 독서 경험</h3>
            <p className="mt-2 text-xs leading-5 text-[var(--muted)]">5점 만점으로 분석한 항목별 평가</p>
            <div className="mt-2 h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="68%">
                  <PolarGrid stroke="#dde2dc" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#68736f", fontSize: 12 }} />
                  <Radar
                    dataKey="score"
                    stroke="#176b5b"
                    fill="#73b89f"
                    fillOpacity={0.45}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-[28px] bg-[#d9f29d] p-8 sm:p-10">
            <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--brand)] uppercase">Perfect for</p>
            <h3 className="display-serif mt-3 text-3xl font-bold">이런 독자에게 잘 맞아요</h3>
            <div className="mt-8 grid gap-3">
              {book.insight.recommendedFor.map((reader, index) => (
                <div key={reader} className="flex items-center gap-4 rounded-2xl bg-white/65 p-4">
                  <span className="display-serif flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--ink)] font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm font-bold">{reader}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside id="source" className="mt-8 rounded-2xl border border-dashed border-black/15 bg-[#f1efe8] p-5 text-xs leading-6 text-[var(--muted)]">
          <strong className="text-[var(--ink)]">데이터 출처 안내</strong>
          <br />
          현재 도서와 리뷰 분석 정보는 UI 개발을 위해 제작한 모의 데이터입니다. 실제 서비스에서는 데이터
          제공처의 이용 허가 범위와 출처를 명확히 표시하고, 원문 서점 페이지로 연결할 예정입니다.
        </aside>
      </section>

      <section className="border-t border-black/7 bg-white py-20">
        <div className="page-shell">
          <h2 className="display-serif text-3xl font-bold">이 책과 함께 살펴보세요</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockBooks
              .filter((item) => item.id !== book.id)
              .slice(0, 5)
              .map((item) => (
                <BookCard key={item.id} book={item} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
