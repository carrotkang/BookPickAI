import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  link?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
  tone = "light",
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <p
            className={`mb-2 text-xs font-extrabold tracking-[0.16em] uppercase ${
              isDark ? "text-[var(--lime)]" : "text-[var(--brand)]"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h2 className="display-serif text-3xl font-bold sm:text-4xl">{title}</h2>
        {description && (
          <p className={`mt-3 text-sm leading-6 ${isDark ? "text-white/55" : "text-[var(--muted)]"}`}>
            {description}
          </p>
        )}
      </div>
      {link && (
        <Link
          href={link}
          className={`hidden shrink-0 items-center gap-1 text-sm font-bold hover:gap-2 sm:flex ${
            isDark ? "text-[var(--lime)]" : "text-[var(--brand)]"
          }`}
        >
          모두 보기 <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
