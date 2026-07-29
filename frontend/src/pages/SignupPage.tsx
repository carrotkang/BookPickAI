import { ArrowLeft, ArrowRight, BookHeart, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/store/AuthContext";

const genres = ["소설", "인문", "에세이", "경제·경영", "과학·기술", "자기계발"];
const moods = ["마음이 편안해지는", "깊이 몰입하는", "새로운 관점을 얻는", "가볍게 웃을 수 있는"];

export function SignupPage() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>(["소설", "에세이"]);
  const [selectedMood, setSelectedMood] = useState(moods[0]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((current) =>
      current.includes(genre) ? current.filter((item) => item !== genre) : [...current, genre],
    );
  };

  const finish = () => {
    login("member", name || "새로운 독자", email || "reader@bookpick.ai");
    navigate("/profile");
  };

  return (
    <section className="soft-grid min-h-[calc(100vh-72px)] py-12 sm:py-20">
      <div className="page-shell max-w-3xl">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--muted)] hover:text-[var(--brand)]">
          <ArrowLeft size={16} /> 로그인으로 돌아가기
        </Link>
        <div className="mt-6 rounded-[32px] border border-black/7 bg-white p-7 shadow-[0_24px_70px_rgba(31,48,42,0.09)] sm:p-12">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black tracking-[0.15em] text-[var(--brand)] uppercase">
                Step {step} of 2
              </p>
              <h1 className="display-serif mt-3 text-3xl font-bold sm:text-4xl">
                {step === 1 ? "BookPickAI 시작하기" : "첫 취향을 알려주세요"}
              </h1>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                {step === 1
                  ? "기본 정보만 입력하면 바로 나만의 책장을 만들 수 있어요."
                  : "언제든 프로필에서 바꿀 수 있으니 편하게 골라보세요."}
              </p>
            </div>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#e9f3ef] text-[var(--brand)]">
              {step === 1 ? <BookHeart size={22} /> : <Sparkles size={22} />}
            </span>
          </div>

          <div className="mt-8 flex gap-2">
            {[1, 2].map((number) => (
              <span
                key={number}
                className={`h-1.5 flex-1 rounded-full ${number <= step ? "bg-[var(--brand)]" : "bg-black/8"}`}
              />
            ))}
          </div>

          {step === 1 ? (
            <form
              className="mt-9 grid gap-5"
              onSubmit={(event) => {
                event.preventDefault();
                setStep(2);
              }}
            >
              <label className="text-xs font-black text-[var(--muted)]">
                이름
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="책장에서 사용할 이름"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf9f5] px-4 py-3.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--brand)]"
                  required
                />
              </label>
              <label className="text-xs font-black text-[var(--muted)]">
                이메일
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="reader@example.com"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf9f5] px-4 py-3.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--brand)]"
                  required
                />
              </label>
              <label className="text-xs font-black text-[var(--muted)]">
                비밀번호
                <input
                  type="password"
                  defaultValue="bookpick1234"
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf9f5] px-4 py-3.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--brand)]"
                  required
                />
              </label>
              <label className="flex items-start gap-3 rounded-2xl bg-[#f5f4ef] p-4 text-xs leading-5 text-[var(--muted)]">
                <input type="checkbox" required className="mt-0.5 accent-[var(--brand)]" />
                서비스 이용약관과 개인정보 처리방침에 동의합니다. 실제 연동 단계에서 약관 전문과 동의 이력이 추가됩니다.
              </label>
              <button className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-5 py-4 text-sm font-black text-white">
                취향 설정으로 <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <div className="mt-9">
              <p className="text-sm font-black">자주 읽는 장르</p>
              <p className="mt-1 text-xs text-[var(--muted)]">두 개 이상 선택하면 첫 추천이 더 자연스러워요.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {genres.map((genre) => {
                  const selected = selectedGenres.includes(genre);
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleGenre(genre)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold ${
                        selected
                          ? "border-[var(--brand)] bg-[#e9f3ef] text-[var(--brand)]"
                          : "border-black/8 bg-white text-[var(--muted)]"
                      }`}
                    >
                      {selected && <Check size={14} />} {genre}
                    </button>
                  );
                })}
              </div>

              <p className="mt-8 text-sm font-black">지금 끌리는 독서 분위기</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setSelectedMood(mood)}
                    className={`rounded-2xl border p-4 text-left text-sm font-bold ${
                      selectedMood === mood
                        ? "border-[var(--brand)] bg-[#e9f3ef] text-[var(--brand)]"
                        : "border-black/8 text-[var(--muted)]"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>

              <div className="mt-9 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-2xl border border-black/10 px-5 py-4 text-sm font-black"
                >
                  이전
                </button>
                <button
                  type="button"
                  onClick={finish}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-5 py-4 text-sm font-black text-white"
                >
                  나만의 책장 만들기 <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
