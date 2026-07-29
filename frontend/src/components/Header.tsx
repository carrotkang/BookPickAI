import { Bookmark, Menu, Search, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const navItems = [
  { label: "책 찾기", href: "/search" },
  { label: "AI 추천", href: "/#recommend" },
  { label: "내 서재", href: "/library" },
];

export function Header() {
  const [location, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/6 bg-[rgba(247,245,239,0.9)] backdrop-blur-xl">
      <div className="page-shell flex h-18 items-center gap-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2" aria-label="BookPickAI 홈">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--brand)] text-white shadow-[0_6px_20px_rgba(23,107,91,0.2)] group-hover:-rotate-3">
            <Sparkles size={18} strokeWidth={2.2} />
          </span>
          <span className="text-lg font-extrabold tracking-[-0.04em]">
            BookPick<span className="text-[var(--brand)]">AI</span>
          </span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="주요 메뉴">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  location === item.href
                    ? "bg-white text-[var(--ink)] shadow-sm"
                    : "text-[var(--muted)] hover:bg-white/70 hover:text-[var(--ink)]"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={submitSearch}
          className="ml-auto hidden w-full max-w-72 items-center rounded-full border border-black/8 bg-white px-4 py-2.5 lg:flex"
        >
          <Search size={17} className="mr-2 text-[var(--muted)]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-black/35"
            placeholder="제목, 작가를 검색해보세요"
            aria-label="도서 검색"
          />
        </form>

        <Link
          href="/library"
          className="hidden size-10 items-center justify-center rounded-full border border-black/8 bg-white text-[var(--ink)] hover:-translate-y-0.5 hover:border-[var(--brand)] sm:flex"
          aria-label="내 서재"
        >
          <Bookmark size={18} />
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-auto flex size-10 items-center justify-center rounded-full border border-black/8 bg-white md:hidden"
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-black/6 bg-[var(--paper)] px-5 py-5 md:hidden">
          <form onSubmit={submitSearch} className="mb-4 flex rounded-2xl border border-black/8 bg-white px-4 py-3">
            <Search size={18} className="mr-2 text-[var(--muted)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              placeholder="어떤 책을 찾으세요?"
              aria-label="모바일 도서 검색"
            />
          </form>
          <nav className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 font-semibold hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
