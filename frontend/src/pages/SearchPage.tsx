import { Grid2X2, ListFilter, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { BookCard } from "@/components/BookCard";
import { categories, mockBooks } from "@/data/mockBooks";

export function SearchPage() {
  const searchString = useSearch();
  const [, navigate] = useLocation();
  const searchParams = new URLSearchParams(searchString);
  const initialQuery = searchParams.get("q") ?? "";
  const requestedGenre = searchParams.get("genre") ?? "전체";
  const initialCategory = categories.includes(requestedGenre) ? requestedGenre : "전체";
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("추천순");
  const [filterOpen, setFilterOpen] = useState(false);

  const results = useMemo(() => {
    const keyword = initialQuery.toLowerCase();
    const filtered = mockBooks.filter((book) => {
      const matchesQuery =
        !keyword ||
        `${book.title} ${book.author} ${book.subtitle} ${book.category} ${book.insight.keywords.join(" ")}`
          .toLowerCase()
          .includes(keyword);
      const matchesCategory = category === "전체" || book.category === category;
      return matchesQuery && matchesCategory;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "평점 높은순") return b.rating - a.rating;
      if (sort === "최신순") return b.publishedDate.localeCompare(a.publishedDate);
      return (a.rank ?? 99) - (b.rank ?? 99);
    });
  }, [category, initialQuery, sort]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next = new URLSearchParams(searchString);
    if (query.trim()) next.set("q", query.trim());
    else next.delete("q");
    const value = next.toString();
    navigate(value ? `/search?${value}` : "/search");
  };

  return (
    <div className="page-shell py-12 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-extrabold tracking-[0.15em] text-[var(--brand)] uppercase">Find your book</p>
        <h1 className="display-serif mt-3 text-4xl font-bold sm:text-5xl">어떤 책을 찾고 있나요?</h1>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          제목이나 작가뿐 아니라 읽고 싶은 분위기와 키워드로도 찾아보세요.
        </p>
      </div>

      <form
        onSubmit={submit}
        className="mt-9 flex max-w-3xl items-center rounded-2xl border border-black/10 bg-white p-2 shadow-[0_12px_35px_rgba(31,48,42,0.07)]"
      >
        <Search size={20} className="ml-3 shrink-0 text-[var(--brand)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="제목, 작가, 키워드 검색"
          className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none sm:text-base"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} className="p-2 text-black/35" aria-label="검색어 지우기">
            <X size={17} />
          </button>
        )}
        <button className="rounded-xl bg-[var(--ink)] px-5 py-3 text-sm font-bold text-white hover:bg-[var(--brand)]">
          검색
        </button>
      </form>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-b border-black/8 pb-5">
        <div>
          <p className="text-sm text-[var(--muted)]">
            {initialQuery ? (
              <>
                <strong className="text-[var(--ink)]">‘{initialQuery}’</strong> 검색 결과
              </>
            ) : (
              "전체 도서"
            )}
          </p>
          <p className="mt-1 text-2xl font-black">{results.length}권</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterOpen((open) => !open)}
            className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-bold lg:hidden"
          >
            <SlidersHorizontal size={16} /> 필터
          </button>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold outline-none"
            aria-label="검색 결과 정렬"
          >
            <option>추천순</option>
            <option>평점 높은순</option>
            <option>최신순</option>
          </select>
          <span className="hidden size-10 items-center justify-center rounded-xl bg-[var(--ink)] text-white sm:flex">
            <Grid2X2 size={17} />
          </span>
        </div>
      </div>

      <div className="grid gap-10 pt-8 lg:grid-cols-[210px_1fr]">
        <aside className={`${filterOpen ? "block" : "hidden"} lg:block`}>
          <div className="sticky top-28 rounded-2xl border border-black/8 bg-white p-5">
            <div className="flex items-center gap-2 font-bold">
              <ListFilter size={17} />
              카테고리
            </div>
            <div className="mt-4 grid gap-1">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setCategory(item);
                    setFilterOpen(false);
                  }}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm ${
                    category === item
                      ? "bg-[#e9f3ef] font-bold text-[var(--brand)]"
                      : "text-[var(--muted)] hover:bg-[#f5f4ef] hover:text-[var(--ink)]"
                  }`}
                >
                  {item}
                  {category === item && <span className="size-1.5 rounded-full bg-[var(--brand)]" />}
                </button>
              ))}
            </div>
            <div className="mt-6 border-t border-black/7 pt-5">
              <p className="text-xs font-bold text-[var(--muted)]">평점</p>
              <label className="mt-3 flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-[var(--brand)]" /> 4.0 이상
              </label>
              <label className="mt-3 flex items-center gap-2 text-sm">
                <input type="checkbox" className="accent-[var(--brand)]" /> 리뷰 분석 있음
              </label>
            </div>
          </div>
        </aside>

        <section>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 xl:grid-cols-4">
              {results.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-black/15 bg-white/60 py-24 text-center">
              <Search className="mx-auto text-black/20" size={38} />
              <h2 className="mt-5 text-lg font-bold">검색 결과가 없어요</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">다른 제목이나 키워드로 다시 검색해 보세요.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  navigate("/search");
                  setCategory("전체");
                }}
                className="mt-6 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-bold text-white"
              >
                전체 도서 보기
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
