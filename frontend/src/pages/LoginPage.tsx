import { ArrowRight, Check, KeyRound, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth, type UserRole } from "@/store/AuthContext";

export function LoginPage() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>("member");
  const [email, setEmail] = useState("reader@bookpick.ai");
  const [password, setPassword] = useState("bookpick1234");

  const selectRole = (nextRole: UserRole) => {
    setRole(nextRole);
    setEmail(nextRole === "admin" ? "admin@bookpick.ai" : "reader@bookpick.ai");
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    login(role, undefined, email);
    navigate(role === "admin" ? "/admin" : "/profile");
  };

  return (
    <section className="soft-grid min-h-[calc(100vh-72px)] py-12 sm:py-20">
      <div className="page-shell grid overflow-hidden rounded-[32px] border border-black/7 bg-white shadow-[0_28px_80px_rgba(31,48,42,0.11)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden overflow-hidden bg-[var(--ink)] p-12 text-white lg:block">
          <div className="absolute -bottom-20 -right-20 size-72 rounded-full border-[55px] border-white/5" />
          <span className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-[var(--lime)]">
            <Sparkles size={23} />
          </span>
          <p className="mt-12 text-xs font-black tracking-[0.16em] text-[var(--lime)] uppercase">Welcome back</p>
          <h1 className="display-serif mt-4 text-4xl font-bold leading-tight">
            취향을 기억하는
            <br />
            나만의 책장
          </h1>
          <p className="mt-6 max-w-sm break-keep text-sm leading-7 text-white/55">
            검색, 찜, 추천 피드백이 쌓일수록 BookPickAI가 다음 책을 더 정교하게 골라드려요.
          </p>
          <div className="mt-12 grid gap-4">
            {["찜한 책과 최근 본 책 저장", "나의 독서 취향과 추천 기록 관리", "추천 피드백을 다음 결과에 반영"].map(
              (benefit) => (
                <div key={benefit} className="flex items-center gap-3 text-sm text-white/70">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[var(--lime)] text-[var(--ink)]">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {benefit}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="p-7 sm:p-12 lg:p-16">
          <div className="mx-auto max-w-md">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-[#e9f3ef] text-[var(--brand)]">
              <KeyRound size={20} />
            </span>
            <h2 className="display-serif mt-6 text-3xl font-bold">로그인</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              현재는 화면 흐름 확인을 위한 데모 계정입니다.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-2 rounded-2xl bg-[#f3f2ed] p-1.5">
              {[
                { value: "member" as const, label: "일반 사용자" },
                { value: "admin" as const, label: "관리자 데모" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectRole(option.value)}
                  className={`rounded-xl px-3 py-3 text-sm font-black ${
                    role === option.value ? "bg-white text-[var(--brand)] shadow-sm" : "text-[var(--muted)]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {role === "admin" && (
              <div className="mt-4 flex gap-3 rounded-2xl border border-[#ddc98e]/50 bg-[#fff7dd] p-4">
                <ShieldCheck size={19} className="shrink-0 text-[#896b19]" />
                <p className="text-xs leading-5 text-[#6f5a1f]">
                  관리자 데모에서는 데이터 수집, AI 분석 작업, 오류 현황을 확인할 수 있어요.
                </p>
              </div>
            )}

            <form onSubmit={submit} className="mt-7">
              <label className="block text-xs font-black text-[var(--muted)]">
                이메일
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf9f5] px-4 py-3.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--brand)]"
                  required
                />
              </label>
              <label className="mt-5 block text-xs font-black text-[var(--muted)]">
                비밀번호
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-black/10 bg-[#faf9f5] px-4 py-3.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--brand)]"
                  required
                />
              </label>
              <div className="mt-4 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-[var(--muted)]">
                  <input type="checkbox" defaultChecked className="accent-[var(--brand)]" />
                  로그인 상태 유지
                </label>
                <button type="button" className="font-bold text-[var(--brand)]">
                  비밀번호 찾기
                </button>
              </div>
              <button
                type="submit"
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-5 py-4 text-sm font-black text-white hover:bg-[var(--brand-dark)]"
              >
                {role === "admin" ? "관리자 화면 둘러보기" : "내 취향 불러오기"} <ArrowRight size={16} />
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-[var(--muted)]">
              처음 오셨나요?{" "}
              <Link href="/signup" className="font-black text-[var(--brand)]">
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
