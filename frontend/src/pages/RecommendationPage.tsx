import {
  ArrowRight,
  BookHeart,
  Check,
  Clock3,
  Compass,
  RefreshCw,
  SlidersHorizontal,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  WandSparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { BookCover } from "@/components/BookCover";
import { DemoBadge } from "@/components/DemoBadge";
import { mockBooks } from "@/data/mockBooks";
import type { Book } from "@/types/book";

const moods = ["마음이 편안해지는", "깊이 몰입하는", "새로운 관점을 얻는", "가볍게 웃을 수 있는"];
const genres = ["소설", "인문", "에세이", "경제·경영", "과학·기술"];
const readingTimes = ["30분 이내", "1시간 정도", "주말 동안", "천천히 오래"];

type RecommendationCardProps = {
  book: Book;
  score: number;
  reason: string;
  index: number;
  feedback?: "up" | "down";
  onFeedback: (value: "up" | "down") => void;
};

function RecommendationCard({
  book,
  score,
  reason,
  index,
  feedback,
  onFeedback,
}: RecommendationCardProps) {
  return (
    <article className="group grid gap-5 rounded-[28px] border border-black/8 bg-white p-5 shadow-[0_14px_40px_rgba(31,48,42,0.055)] sm:grid-cols-[132px_1fr] sm:p-6">
      <div className="relative mx-auto w-[132px]">
        <BookCover book={book} compact className="w-full transition duration-300 group-hover:-translate-y-1" />
        <span className="display-serif absolute -left-3 -top-3 flex size-9 items-center justify-center rounded-full bg-[var(--ink)] text-sm font-black text-white shadow-lg">
          {index + 1}
        </span>
      </div>
      <div className="min-w-0 self-center">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="rounded-full bg-[#e9f3ef] px-3 py-1.5 text-xs font-black text-[var(--brand)]">
            취향 일치 {score}%
          </span>
          <span className="text-xs text-[var(--muted)]">{book.category}</span>
        </div>
        <h3 className="display-serif mt-4 text-2xl font-bold">{book.title}</h3>
        <p className="mt-1 text-sm text-[var(--muted)]">{book.author}</p>
        <p className="mt-4 break-keep text-sm leading-6 text-[var(--muted)]">{reason}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {book.insight.keywords.slice(0, 3).map((keyword) => (
            <span key={keyword} className="rounded-full bg-[#f3f2ed] px-2.5 py-1 text-[11px] text-[var(--muted)]">
              #{keyword}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-black/6 pt-4">
          <Link
            href={`/books/${book.isbn13}`}
            className="inline-flex items-center gap-2 text-sm font-black text-[var(--brand)] hover:gap-3"
          >
            추천 이유 자세히 보기 <ArrowRight size={15} />
          </Link>
          <div className="flex items-center gap-2">
            <span className="mr-1 text-[11px] text-[var(--muted)]">
              {feedback ? "의견이 반영됐어요" : "이 추천은 어때요?"}
            </span>
            <button
              type="button"
              onClick={() => onFeedback("up")}
              aria-label={`${book.title} 추천이 마음에 들어요`}
              className={`flex size-8 items-center justify-center rounded-full border ${
                feedback === "up"
                  ? "border-[var(--brand)] bg-[#e9f3ef] text-[var(--brand)]"
                  : "border-black/8 text-[var(--muted)] hover:border-[var(--brand)]/40"
              }`}
            >
              <ThumbsUp size={14} />
            </button>
            <button
              type="button"
              onClick={() => onFeedback("down")}
              aria-label={`${book.title} 추천이 아쉬워요`}
              className={`flex size-8 items-center justify-center rounded-full border ${
                feedback === "down"
                  ? "border-[#b86b5d] bg-[#f8eae6] text-[#9b5145]"
                  : "border-black/8 text-[var(--muted)] hover:border-[#b86b5d]/40"
              }`}
            >
              <ThumbsDown size={14} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function RecommendationPage() {
  const [mood, setMood] = useState(moods[0]);
  const [genre, setGenre] = useState("전체");
  const [readingTime, setReadingTime] = useState(readingTimes[1]);
  const [submitted, setSubmitted] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [mode, setMode] = useState<"familiar" | "discover">("familiar");
  const [feedback, setFeedback] = useState<Record<number, "up" | "down" | undefined>>({});

  const recommendations = useMemo(() => {
    const genreMatches =
      genre === "전체" ? mockBooks : mockBooks.filter((book) => book.category === genre);
    const pool = genreMatches.length >= 3 ? genreMatches : [...genreMatches, ...mockBooks];
    return [...new Map(pool.map((book) => [book.id, book])).values()]
      .sort((a, b) => {
        const direction = mode === "familiar" ? 1 : -1;
        const offsetA = (direction * a.id + refreshCount + mockBooks.length) % mockBooks.length;
        const offsetB = (direction * b.id + refreshCount + mockBooks.length) % mockBooks.length;
        return offsetA - offsetB;
      })
      .slice(0, 3);
  }, [genre, mode, refreshCount]);

  const reasons = [
    `${mood} 분위기를 찾는 독자들이 특히 좋아한 책이에요. 문체와 감정 흐름에 대한 긍정적인 평가가 많습니다.`,
    `${readingTime} 읽기에 부담 없는 구성과 높은 가독성이 돋보여요. 지금 선택한 독서 상황과 잘 맞습니다.`,
    `평소 관심사와 비슷한 키워드가 리뷰에서 자주 언급됐어요. 새로운 책으로 취향을 넓히기 좋습니다.`,
  ];

  const discoveryReasons = [
    `평소 선호하는 ${genre === "전체" ? "분야" : genre}의 분위기는 살리면서, 새로운 문체와 관점을 경험할 수 있는 책이에요.`,
    `${readingTime} 안에 몰입할 수 있고, 최근 읽은 책과는 다른 키워드를 가진 작품으로 추천의 폭을 넓혔어요.`,
    `익숙한 취향에서 한 걸음 벗어나도록 골랐지만, ${mood} 독서 상황과는 자연스럽게 이어지는 책이에요.`,
  ];

  const choose = (
    value: string,
    current: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => (
    <button
      key={value}
      type="button"
      onClick={() => {
        setter(value);
        setSubmitted(false);
      }}
      className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold ${
        current === value
          ? "border-[var(--brand)] bg-[#e9f3ef] text-[var(--brand)]"
          : "border-black/8 bg-white text-[var(--muted)] hover:border-[var(--brand)]/40 hover:text-[var(--ink)]"
      }`}
    >
      <span className="flex items-center justify-between gap-3">
        {value}
        {current === value && (
          <span className="flex size-5 items-center justify-center rounded-full bg-[var(--brand)] text-white">
            <Check size={12} strokeWidth={3} />
          </span>
        )}
      </span>
    </button>
  );

  return (
    <>
      <section className="soft-grid relative overflow-hidden border-b border-black/7">
        <div className="absolute -right-24 top-10 size-80 rounded-full bg-[#d9f29d]/40 blur-3xl" />
        <div className="page-shell relative py-16 text-center sm:py-20">
          <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[var(--brand)] text-white shadow-[0_12px_30px_rgba(23,107,91,0.22)]">
            <WandSparkles size={22} />
          </span>
          <p className="mt-6 text-xs font-extrabold tracking-[0.16em] text-[var(--brand)] uppercase">
            Personal book curator
          </p>
          <h1 className="recommendation-hero-title display-serif mx-auto mt-3 font-bold">
            <span>지금의 나에게 맞는</span>
            <span>책을 골라드릴게요</span>
          </h1>
          <p className="recommendation-hero-copy mx-auto mt-5 text-sm text-[var(--muted)]">
            <span>읽고 싶은 분위기와 관심사를 알려주세요.</span>
            <span>리뷰 분석 결과를 바탕으로 추천 이유까지 함께 설명해 드려요.</span>
          </p>
          <div className="mt-7 flex justify-center">
            <DemoBadge />
          </div>
        </div>
      </section>

      <section className="recommendation-layout page-shell py-12 lg:py-16">
        <aside className="recommendation-sidebar">
          <div className="rounded-[28px] border border-black/8 bg-white p-6 shadow-[0_14px_40px_rgba(31,48,42,0.055)]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-[#e9f3ef] text-[var(--brand)]">
                <SlidersHorizontal size={18} />
              </span>
              <div>
                <p className="text-xs text-[var(--muted)]">나의 독서 상황</p>
                <h2 className="font-black">추천 조건 선택</h2>
              </div>
            </div>

            <div className="mt-7">
              <p className="mb-3 text-xs font-black text-[var(--muted)]">원하는 분위기</p>
              <div className="recommendation-mood-options grid gap-2">
                {moods.map((value) => choose(value, mood, setMood))}
              </div>
            </div>

            <div className="mt-7">
              <p className="mb-3 text-xs font-black text-[var(--muted)]">선호 장르</p>
              <div className="recommendation-genre-options flex flex-wrap gap-2">
                {["전체", ...genres].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setGenre(value);
                      setSubmitted(false);
                    }}
                    className={`rounded-full px-3.5 py-2 text-xs font-bold ${
                      genre === value
                        ? "bg-[var(--ink)] text-white"
                        : "border border-black/8 bg-[#f5f4ef] text-[var(--muted)] hover:border-[var(--brand)]/40"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <p className="mb-3 flex items-center gap-1.5 text-xs font-black text-[var(--muted)]">
                <Clock3 size={13} /> 독서 시간
              </p>
              <select
                value={readingTime}
                onChange={(event) => {
                  setReadingTime(event.target.value);
                  setSubmitted(false);
                }}
                className="w-full rounded-2xl border border-black/8 bg-[#f5f4ef] px-4 py-3 text-sm font-bold outline-none"
              >
                {readingTimes.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-5 py-4 text-sm font-black text-white shadow-[0_10px_24px_rgba(23,107,91,0.2)] hover:-translate-y-0.5 hover:bg-[var(--brand-dark)]"
            >
              <Sparkles size={17} /> 내 취향으로 추천받기
            </button>
          </div>
        </aside>

        <div className="recommendation-results min-w-0">
          <div className="mb-5 rounded-[24px] border border-black/8 bg-white p-5 shadow-[0_10px_30px_rgba(31,48,42,0.045)] sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black tracking-[0.12em] text-[var(--brand)] uppercase">
                  My taste summary
                </p>
                <h2 className="mt-2 text-lg font-black">현재 반영 중인 취향</h2>
              </div>
              <span className="rounded-full bg-[#f5f4ef] px-3 py-1.5 text-[11px] font-bold text-[var(--muted)]">
                데모 프로필
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[mood, genre === "전체" ? "장르를 골고루" : genre, readingTime].map((taste) => (
                <span
                  key={taste}
                  className="rounded-full border border-[var(--brand)]/12 bg-[#e9f3ef] px-3 py-1.5 text-xs font-bold text-[var(--brand)]"
                >
                  {taste}
                </span>
              ))}
            </div>
            <p className="mt-4 break-keep text-xs leading-5 text-[var(--muted)]">
              왼쪽 조건을 바꾸면 요약과 추천 결과가 함께 달라져요. 이후에는 검색·찜·좋아요 기록도 이 영역에 반영됩니다.
            </p>
          </div>

          <div className="rounded-[28px] bg-[var(--ink)] p-7 text-white sm:p-9">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold tracking-[0.15em] text-[var(--lime)] uppercase">
                  {submitted ? "Curated for you" : "Recommendation preview"}
                </p>
                <h2 className="display-serif mt-3 text-3xl font-bold sm:text-4xl">
                  {submitted ? "취향에 맞는 3권을 찾았어요" : "이런 책은 어떠세요?"}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
                  {mood} · {genre === "전체" ? "장르 무관" : genre} · {readingTime}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRefreshCount((count) => count + 1);
                  setSubmitted(true);
                }}
                className="flex items-center gap-2 rounded-full border border-white/12 bg-white/7 px-4 py-2.5 text-xs font-bold text-white/75 hover:bg-white/12 hover:text-white"
              >
                <RefreshCw size={14} /> 다른 추천
              </button>
            </div>
            <div className="mt-7 flex items-center gap-3 rounded-2xl bg-white/6 p-4">
              <BookHeart className="shrink-0 text-[var(--lime)]" size={21} />
              <p className="text-xs leading-5 text-white/65">
                현재는 모의 취향 데이터로 추천을 구성합니다. 로그인과 사용자 행동 데이터가 연결되면 찜,
                검색, 좋아요 기록을 함께 반영할 예정입니다.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-[24px] border border-black/8 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black text-[var(--muted)]">추천 방식</p>
                <h3 className="mt-1 font-black">지금 원하는 발견의 폭을 골라보세요</h3>
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--muted)]">
                <Compass size={14} className="text-[var(--brand)]" /> 추천 다양성 직접 조절
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: "familiar" as const,
                  title: "취향에 가까운 추천",
                  description: "좋아할 가능성이 높은 안정적인 선택",
                },
                {
                  value: "discover" as const,
                  title: "새로운 발견",
                  description: "취향과 연결되지만 예상 밖인 선택",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setMode(option.value);
                    setSubmitted(true);
                  }}
                  className={`rounded-2xl border p-4 text-left ${
                    mode === option.value
                      ? "border-[var(--brand)] bg-[#e9f3ef]"
                      : "border-black/8 bg-[#faf9f5] hover:border-[var(--brand)]/35"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <strong className={mode === option.value ? "text-[var(--brand)]" : ""}>
                      {option.title}
                    </strong>
                    {mode === option.value && <Check size={16} className="text-[var(--brand)]" />}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[var(--muted)]">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            {recommendations.map((book, index) => (
              <RecommendationCard
                key={`${book.id}-${refreshCount}`}
                book={book}
                index={index}
                score={94 - index * 4}
                reason={mode === "familiar" ? reasons[index] : discoveryReasons[index]}
                feedback={feedback[book.id]}
                onFeedback={(value) =>
                  setFeedback((current) => ({
                    ...current,
                    [book.id]: current[book.id] === value ? undefined : value,
                  }))
                }
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
