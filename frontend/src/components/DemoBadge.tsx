import { FlaskConical } from "lucide-react";

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d9a764]/35 bg-[#fff5df] px-3 py-1.5 text-[11px] font-bold text-[#926027]">
      <FlaskConical size={13} />
      데모 분석 데이터
    </span>
  );
}
