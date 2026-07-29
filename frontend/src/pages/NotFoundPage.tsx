import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export function NotFoundPage() {
  return (
    <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="display-serif text-8xl font-black text-[var(--brand)]/15">404</p>
      <h1 className="display-serif -mt-5 text-4xl font-bold">페이지를 찾지 못했어요</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">주소가 변경되었거나 존재하지 않는 페이지입니다.</p>
      <Link href="/" className="mt-8 flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-bold text-white hover:bg-[var(--brand)]">
        <ArrowLeft size={16} /> 홈으로 돌아가기
      </Link>
    </div>
  );
}
