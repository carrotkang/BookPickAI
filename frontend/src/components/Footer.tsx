import { Code2, Sparkles } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-black/8 bg-[#efede5] py-12">
      <div className="page-shell grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-extrabold">
            <Sparkles size={19} className="text-[var(--brand)]" />
            BookPickAI
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-[var(--muted)]">
            흩어진 리뷰를 읽기 쉬운 정보로 바꾸고, 나에게 맞는 다음 책을 발견하도록 돕습니다.
          </p>
          <p className="mt-5 text-xs text-black/40">
            현재 화면의 리뷰 분석 결과는 UI 개발을 위한 데모 데이터입니다.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
          <a
            href="https://github.com/carrotkang/BookPickAI"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 hover:border-[var(--brand)] hover:text-[var(--brand)]"
          >
            <Code2 size={16} />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
