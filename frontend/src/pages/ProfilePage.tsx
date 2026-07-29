import {
  ArrowRight,
  Bookmark,
  Check,
  Clock3,
  Heart,
  History,
  LogOut,
  Settings2,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { BookCover } from "@/components/BookCover";
import { mockBooks } from "@/data/mockBooks";
import { useAuth } from "@/store/AuthContext";

const preferenceOptions = ["소설", "인문", "에세이", "경제·경영", "과학·기술"];

export function ProfilePage() {
  const [, navigate] = useLocation();
  const { user, logout, updateName } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [genres, setGenres] = useState(["소설", "에세이"]);
  const [saved, setSaved] = useState(false);

  if (!user) {
    return (
      <div className="page-shell py-24 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#e9f3ef] text-[var(--brand)]">
          <UserRound size={25} />
        </span>
        <h1 className="display-serif mt-6 text-3xl font-bold">로그인이 필요한 페이지예요</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">로그인하면 취향과 독서 활동을 한곳에서 관리할 수 있어요.</p>
        <Link href="/login" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-black text-white">
          로그인하기 <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const toggleGenre = (genre: string) => {
    setSaved(false);
    setGenres((current) =>
      current.includes(genre) ? current.filter((item) => item !== genre) : [...current, genre],
    );
  };

  return (
    <div className="page-shell py-12 sm:py-16">
      <section className="grid overflow-hidden rounded-[32px] bg-[var(--ink)] text-white lg:grid-cols-[1fr_0.85fr]">
        <div className="p-8 sm:p-11">
          <div className="flex flex-wrap items-start gap-5">
            <span className="flex size-16 items-center justify-center rounded-3xl bg-white/10 text-[var(--lime)]">
              <UserRound size={29} />
            </span>
            <div>
              <p className="text-xs font-black tracking-[0.15em] text-[var(--lime)] uppercase">My reading profile</p>
              <h1 className="display-serif mt-2 text-3xl font-bold">{user.name}님의 책장</h1>
              <p className="mt-2 text-sm text-white/50">{user.email}</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {["잔잔한 문체", "감정 묘사", "소설", "주말 독서"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs text-white/65">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-px bg-white/8">
          {[
            { value: "3", label: "찜한 책" },
            { value: "12", label: "최근 본 책" },
            { value: "8", label: "추천 피드백" },
          ].map((stat) => (
            <div key={stat.label} className="flex min-h-32 flex-col items-center justify-center bg-[var(--ink)] px-3 text-center">
              <strong className="display-serif text-3xl text-[var(--lime)]">{stat.value}</strong>
              <span className="mt-2 text-xs text-white/45">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-7 lg:grid-cols-[0.75fr_1.25fr]">
        <section className="rounded-[28px] border border-black/8 bg-white p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-[#e9f3ef] text-[var(--brand)]">
              <Settings2 size={18} />
            </span>
            <div>
              <p className="text-xs text-[var(--muted)]">추천에 반영되는 정보</p>
              <h2 className="font-black">프로필 및 취향 설정</h2>
            </div>
          </div>
          <label className="mt-7 block text-xs font-black text-[var(--muted)]">
            표시 이름
            <input
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setSaved(false);
              }}
              className="mt-2 w-full rounded-2xl border border-black/9 bg-[#faf9f5] px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--brand)]"
            />
          </label>
          <p className="mt-6 text-xs font-black text-[var(--muted)]">선호 장르</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {preferenceOptions.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => toggleGenre(genre)}
                className={`rounded-full border px-3.5 py-2 text-xs font-bold ${
                  genres.includes(genre)
                    ? "border-[var(--brand)] bg-[#e9f3ef] text-[var(--brand)]"
                    : "border-black/8 text-[var(--muted)]"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
          <label className="mt-6 block text-xs font-black text-[var(--muted)]">
            평소 독서 시간
            <select
              defaultValue="1시간 정도"
              className="mt-2 w-full rounded-2xl border border-black/9 bg-[#faf9f5] px-4 py-3 text-sm font-bold outline-none"
            >
              <option>30분 이내</option>
              <option>1시간 정도</option>
              <option>주말 동안</option>
              <option>천천히 오래</option>
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              updateName(name);
              setSaved(true);
            }}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-5 py-3.5 text-sm font-black text-white"
          >
            {saved ? <Check size={16} /> : <Sparkles size={16} />}
            {saved ? "저장했어요" : "취향 저장하기"}
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold text-[var(--muted)] hover:bg-[#f5f4ef]"
          >
            <LogOut size={15} /> 로그아웃
          </button>
        </section>

        <div className="grid gap-7">
          <section className="rounded-[28px] border border-black/8 bg-white p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black text-[var(--brand)]">RECENT ACTIVITY</p>
                <h2 className="display-serif mt-2 text-2xl font-bold">최근 독서 활동</h2>
              </div>
              <Link href="/library" className="text-xs font-black text-[var(--brand)]">내 서재 전체보기</Link>
            </div>
            <div className="mt-6 grid gap-3">
              {[
                { icon: Bookmark, text: "‘파도가 머문 자리’를 찜했어요", time: "오늘" },
                { icon: Heart, text: "AI 추천 ‘생각의 온도’가 마음에 들어요", time: "어제" },
                { icon: History, text: "‘작은 팀의 큰 기술’을 살펴봤어요", time: "3일 전" },
              ].map(({ icon: Icon, text, time }) => (
                <div key={text} className="flex items-center gap-4 rounded-2xl bg-[#f7f6f1] p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[var(--brand)]">
                    <Icon size={16} />
                  </span>
                  <p className="min-w-0 flex-1 text-sm font-bold">{text}</p>
                  <span className="shrink-0 text-[11px] text-[var(--muted)]">{time}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-black/8 bg-white p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <h2 className="display-serif text-2xl font-bold">최근 본 책</h2>
              <span className="flex items-center gap-1.5 text-xs text-[var(--muted)]"><Clock3 size={14} /> 최근 30일</span>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {mockBooks.slice(0, 3).map((book) => (
                <Link key={book.id} href={`/books/${book.isbn13}`} className="group min-w-0">
                  <BookCover book={book} compact className="w-full transition group-hover:-translate-y-1" />
                  <p className="mt-3 truncate text-xs font-black">{book.title}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
