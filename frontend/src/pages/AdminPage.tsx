import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  Clock3,
  Copy,
  Database,
  FileText,
  LogOut,
  PauseCircle,
  Play,
  RefreshCw,
  RotateCcw,
  ServerCog,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/store/AuthContext";

type JobTone = "success" | "progress" | "waiting" | "warning";

type PipelineJob = {
  id: string;
  name: string;
  status: string;
  count: string;
  time: string;
  tone: JobTone;
  progress: number;
  runId: string;
  source: string;
  target: string;
  startedAt: string;
  updatedAt: string;
  success: number;
  failed: number;
  skipped: number;
  steps: { label: string; status: "done" | "active" | "waiting" }[];
  logs: string[];
};

const jobs: PipelineJob[] = [
  {
    id: "aladin-sync",
    name: "알라딘 도서 정보 동기화",
    status: "완료",
    count: "1,248건",
    time: "오늘 09:30",
    tone: "success",
    progress: 100,
    runId: "COL-20260729-0930",
    source: "알라딘 Open API",
    target: "PostgreSQL · books",
    startedAt: "2026.07.29 09:30:02",
    updatedAt: "2026.07.29 09:34:18",
    success: 1248,
    failed: 0,
    skipped: 37,
    steps: [
      { label: "API 응답 수집", status: "done" },
      { label: "ISBN 중복 검사", status: "done" },
      { label: "도서 정보 저장", status: "done" },
      { label: "검색 인덱스 반영", status: "done" },
    ],
    logs: [
      "09:30:02  INFO  알라딘 도서 동기화를 시작합니다.",
      "09:32:41  INFO  신규 86건 · 갱신 1,162건을 확인했습니다.",
      "09:34:18  DONE  1,248건 저장, 중복 37건 제외",
    ],
  },
  {
    id: "sentiment-batch",
    name: "리뷰 감정 분석 배치",
    status: "처리 중",
    count: "684 / 920건",
    time: "약 6분 남음",
    tone: "progress",
    progress: 74,
    runId: "AI-20260729-1015",
    source: "미분석 리뷰 큐",
    target: "FastAPI · sentiment-v0.1",
    startedAt: "2026.07.29 10:15:09",
    updatedAt: "2026.07.29 10:42:31",
    success: 681,
    failed: 3,
    skipped: 0,
    steps: [
      { label: "분석 대상 로드", status: "done" },
      { label: "텍스트 전처리", status: "done" },
      { label: "BERT 감정 분석", status: "active" },
      { label: "분석 결과 저장", status: "waiting" },
    ],
    logs: [
      "10:15:09  INFO  리뷰 920건 분석을 시작합니다.",
      "10:36:22  WARN  빈 문자열 리뷰 3건을 실패 큐로 이동했습니다.",
      "10:42:31  INFO  684 / 920건 처리 · 평균 184ms",
    ],
  },
  {
    id: "summary-keyword",
    name: "키워드·요약 생성",
    status: "대기",
    count: "236건",
    time: "감정 분석 후",
    tone: "waiting",
    progress: 0,
    runId: "AI-20260729-QUEUE-03",
    source: "감정 분석 완료 리뷰",
    target: "FastAPI · summary-worker",
    startedAt: "아직 시작하지 않음",
    updatedAt: "2026.07.29 10:42:31",
    success: 0,
    failed: 0,
    skipped: 0,
    steps: [
      { label: "선행 작업 대기", status: "active" },
      { label: "키워드 추출", status: "waiting" },
      { label: "장단점 요약", status: "waiting" },
      { label: "결과 저장", status: "waiting" },
    ],
    logs: [
      "10:15:10  QUEUE 선행 작업 AI-20260729-1015를 기다립니다.",
      "10:42:31  INFO  예상 처리 대상 236건",
    ],
  },
  {
    id: "yes24-collect",
    name: "YES24 데이터 수집",
    status: "연결 대기",
    count: "-",
    time: "API 협의 중",
    tone: "warning",
    progress: 0,
    runId: "CONNECTION-PENDING",
    source: "YES24 · 연결 미정",
    target: "수집 정책 검토 중",
    startedAt: "실행 이력 없음",
    updatedAt: "2026.07.29 09:00:00",
    success: 0,
    failed: 0,
    skipped: 0,
    steps: [
      { label: "데이터 이용 문의", status: "done" },
      { label: "API·수집 범위 확인", status: "active" },
      { label: "연결 정보 등록", status: "waiting" },
      { label: "시험 수집", status: "waiting" },
    ],
    logs: [
      "07.28 14:20  INFO  데이터 활용 문의를 발송했습니다.",
      "07.29 09:00  WAIT  YES24 담당자 답변을 기다리고 있습니다.",
    ],
  },
];

export function AdminPage() {
  const [, navigate] = useLocation();
  const { user, logout } = useAuth();
  const [selectedJob, setSelectedJob] = useState<PipelineJob | null>(null);
  const [actionMessage, setActionMessage] = useState("");
  const [refreshedAt, setRefreshedAt] = useState("10:42");

  if (user?.role !== "admin") {
    return (
      <div className="page-shell py-24 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#fff1dd] text-[#9a671f]">
          <ShieldCheck size={26} />
        </span>
        <h1 className="display-serif mt-6 text-3xl font-bold">관리자 권한이 필요해요</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">로그인 화면의 관리자 데모 계정으로 전체 흐름을 확인할 수 있습니다.</p>
        <Link href="/login" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-black text-white">
          관리자 데모 로그인 <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#f1f3ef]">
      <div className="page-shell py-10 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-[0.14em] text-[var(--brand)] uppercase">
              <ShieldCheck size={15} /> Admin console
            </div>
            <h1 className="display-serif mt-3 text-3xl font-bold sm:text-4xl">BookPickAI 운영 현황</h1>
            <p className="mt-3 text-sm text-[var(--muted)]">도서 수집부터 AI 분석, 서비스 반영까지 한곳에서 확인합니다.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-black/8 bg-white px-4 py-2 text-xs font-bold text-[var(--muted)]">
              최근 갱신 {refreshedAt}
            </span>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-xs font-bold text-[var(--muted)]"
            >
              <LogOut size={14} /> 로그아웃
            </button>
          </div>
        </div>

        <section className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "수집 도서", value: "1,248", note: "오늘 +86", icon: BookOpen, color: "bg-[#dceee8]" },
            { label: "확보 리뷰", value: "18,420", note: "분석률 92%", icon: Database, color: "bg-[#eee7d8]" },
            { label: "가입 사용자", value: "326", note: "이번 주 +24", icon: Users, color: "bg-[#e3e7f1]" },
            { label: "처리 오류", value: "7", note: "확인 필요 2건", icon: AlertTriangle, color: "bg-[#f5e3dc]" },
          ].map(({ label, value, note, icon: Icon, color }) => (
            <article key={label} className="rounded-[24px] border border-black/6 bg-white p-5">
              <div className="flex items-start justify-between">
                <span className={`flex size-10 items-center justify-center rounded-2xl ${color} text-[var(--brand-dark)]`}>
                  <Icon size={18} />
                </span>
                <span className="text-[11px] text-[var(--muted)]">{note}</span>
              </div>
              <strong className="mt-6 block text-3xl tracking-tight">{value}</strong>
              <p className="mt-1 text-xs font-bold text-[var(--muted)]">{label}</p>
            </article>
          ))}
        </section>

        <div className="mt-7 grid gap-7 xl:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-[28px] border border-black/6 bg-white p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black text-[var(--brand)]">DATA PIPELINE</p>
                <h2 className="mt-2 text-xl font-black">수집·AI 분석 작업</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRefreshedAt("방금");
                  setActionMessage("작업 상태를 새로 불러왔습니다.");
                }}
                className="flex items-center gap-2 rounded-full bg-[#f3f2ed] px-4 py-2 text-xs font-black text-[var(--muted)]"
              >
                <RefreshCw size={14} /> 새로고침
              </button>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[660px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-black/7 text-[11px] font-black text-[var(--muted)]">
                    <th className="pb-3">작업</th>
                    <th className="pb-3">상태</th>
                    <th className="pb-3">처리량</th>
                    <th className="pb-3">최근 실행</th>
                    <th className="pb-3 text-right">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.name} className="border-b border-black/5 text-sm last:border-0">
                      <td className="py-4 font-bold">{job.name}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-black ${
                            job.tone === "success"
                              ? "bg-[#e9f3ef] text-[var(--brand)]"
                              : job.tone === "progress"
                                ? "bg-[#e9edf8] text-[#4c6091]"
                                : job.tone === "warning"
                                  ? "bg-[#fff1dd] text-[#94611b]"
                                  : "bg-[#f3f2ed] text-[var(--muted)]"
                          }`}
                        >
                          {job.tone === "success" ? <CheckCircle2 size={12} /> : <Clock3 size={12} />}
                          {job.status}
                        </span>
                      </td>
                      <td className="py-4 text-xs text-[var(--muted)]">{job.count}</td>
                      <td className="py-4 text-xs text-[var(--muted)]">{job.time}</td>
                      <td className="py-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedJob(job);
                            setActionMessage("");
                          }}
                          className="rounded-lg px-2 py-1 text-xs font-black text-[var(--brand)] hover:bg-[#e9f3ef]"
                        >
                          상세
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] bg-[var(--ink)] p-6 text-white sm:p-7">
            <p className="text-xs font-black tracking-[0.14em] text-[var(--lime)] uppercase">AI health</p>
            <h2 className="mt-2 text-xl font-black">모델 처리 현황</h2>
            <div className="mt-7 grid gap-5">
              {[
                { label: "감정 분석", value: 92, note: "BERT 기반" },
                { label: "키워드 추출", value: 86, note: "배치 처리" },
                { label: "리뷰 요약", value: 74, note: "생성 대기 포함" },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">{metric.label}</span>
                    <span className="text-white/45">{metric.note}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[var(--lime)]" style={{ width: `${metric.value}%` }} />
                  </div>
                  <p className="mt-1 text-right text-[10px] text-white/45">{metric.value}% 완료</p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex gap-3 rounded-2xl bg-white/6 p-4">
              <Bot size={20} className="shrink-0 text-[var(--lime)]" />
              <p className="text-xs leading-5 text-white/55">FastAPI 분석 서버 정상 · 평균 응답 184ms</p>
            </div>
          </section>
        </div>

        <section className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            { icon: Database, title: "데이터 소스", text: "알라딘 연결됨 · YES24 협의 중", action: "연결 관리" },
            { icon: ServerCog, title: "실패 작업", text: "재시도 가능한 오류 2건", action: "오류 확인" },
            { icon: Bot, title: "분석 모델", text: "sentiment-v0.1 · mock summary", action: "버전 확인" },
          ].map(({ icon: Icon, title, text, action }) => (
            <article key={title} className="rounded-[24px] border border-black/6 bg-white p-5">
              <Icon size={20} className="text-[var(--brand)]" />
              <h3 className="mt-5 font-black">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-[var(--muted)]">{text}</p>
              <button type="button" className="mt-5 flex items-center gap-1 text-xs font-black text-[var(--brand)]">
                {action} <ArrowRight size={13} />
              </button>
            </article>
          ))}
        </section>
      </div>

      {selectedJob && (
        <div className="fixed inset-0 z-[70] flex justify-end" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
            onClick={() => setSelectedJob(null)}
            aria-label="작업 상세 닫기"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="job-detail-title"
            className="relative h-full w-full max-w-[580px] overflow-y-auto bg-[var(--paper)] shadow-[-24px_0_60px_rgba(19,35,30,0.2)]"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-black/7 bg-[rgba(247,245,239,0.94)] px-6 py-5 backdrop-blur sm:px-8">
              <div>
                <p className="text-xs font-black tracking-[0.14em] text-[var(--brand)] uppercase">Job detail</p>
                <h2 id="job-detail-title" className="mt-2 text-xl font-black">
                  {selectedJob.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white text-[var(--muted)] hover:text-[var(--ink)]"
                aria-label="상세 패널 닫기"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <section className="rounded-[24px] bg-[var(--ink)] p-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-black ${
                        selectedJob.tone === "success"
                          ? "bg-[var(--lime)] text-[var(--ink)]"
                          : selectedJob.tone === "progress"
                            ? "bg-[#dfe7ff] text-[#445987]"
                            : selectedJob.tone === "warning"
                              ? "bg-[#ffe7bd] text-[#7c541a]"
                              : "bg-white/10 text-white/70"
                      }`}
                    >
                      {selectedJob.tone === "success" ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}
                      {selectedJob.status}
                    </span>
                    <p className="mt-4 font-mono text-[11px] text-white/45">{selectedJob.runId}</p>
                  </div>
                  <strong className="text-3xl text-[var(--lime)]">{selectedJob.progress}%</strong>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[var(--lime)] transition-[width]"
                    style={{ width: `${selectedJob.progress}%` }}
                  />
                </div>
                <p className="mt-3 text-right text-xs text-white/45">{selectedJob.count}</p>
              </section>

              <section className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: "성공", value: selectedJob.success, color: "text-[var(--brand)]" },
                  { label: "실패", value: selectedJob.failed, color: "text-[#a65347]" },
                  { label: "제외", value: selectedJob.skipped, color: "text-[var(--muted)]" },
                ].map((metric) => (
                  <div key={metric.label} className="rounded-2xl border border-black/7 bg-white p-4 text-center">
                    <strong className={`block text-xl ${metric.color}`}>{metric.value.toLocaleString()}</strong>
                    <span className="mt-1 block text-[11px] text-[var(--muted)]">{metric.label}</span>
                  </div>
                ))}
              </section>

              <section className="mt-5 rounded-[24px] border border-black/7 bg-white p-5">
                <h3 className="text-sm font-black">실행 정보</h3>
                <dl className="mt-4 grid gap-4 text-xs sm:grid-cols-2">
                  {[
                    { label: "데이터 소스", value: selectedJob.source },
                    { label: "처리 대상", value: selectedJob.target },
                    { label: "시작 시간", value: selectedJob.startedAt },
                    { label: "최근 갱신", value: selectedJob.updatedAt },
                  ].map((item) => (
                    <div key={item.label} className="min-w-0">
                      <dt className="text-[var(--muted)]">{item.label}</dt>
                      <dd className="mt-1 break-words font-bold">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="mt-5 rounded-[24px] border border-black/7 bg-white p-5">
                <h3 className="text-sm font-black">처리 단계</h3>
                <div className="mt-5 grid gap-0">
                  {selectedJob.steps.map((step, index) => (
                    <div key={step.label} className="relative flex min-h-14 gap-3">
                      {index < selectedJob.steps.length - 1 && (
                        <span className="absolute left-[11px] top-6 h-full w-px bg-black/10" />
                      )}
                      <span
                        className={`relative z-[1] mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full ${
                          step.status === "done"
                            ? "bg-[var(--brand)] text-white"
                            : step.status === "active"
                              ? "border-2 border-[var(--brand)] bg-[#e9f3ef] text-[var(--brand)]"
                              : "border border-black/10 bg-[#f3f2ed] text-[var(--muted)]"
                        }`}
                      >
                        {step.status === "done" ? <CheckCircle2 size={13} /> : <span className="size-1.5 rounded-full bg-current" />}
                      </span>
                      <div>
                        <p className="text-sm font-bold">{step.label}</p>
                        <p className="mt-1 text-[11px] text-[var(--muted)]">
                          {step.status === "done" ? "완료" : step.status === "active" ? "현재 단계" : "대기"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mt-5 overflow-hidden rounded-[24px] bg-[#18221f] text-white">
                <div className="flex items-center justify-between border-b border-white/7 px-5 py-4">
                  <h3 className="flex items-center gap-2 text-sm font-black">
                    <FileText size={16} className="text-[var(--lime)]" /> 최근 로그
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard?.writeText(selectedJob.logs.join("\n"));
                      setActionMessage("최근 로그를 클립보드에 복사했습니다.");
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-white/7 px-2.5 py-1.5 text-[11px] font-bold text-white/60 hover:text-white"
                  >
                    <Copy size={12} /> 복사
                  </button>
                </div>
                <div className="grid gap-2 overflow-x-auto p-5 font-mono text-[11px] leading-5 text-white/55">
                  {selectedJob.logs.map((log) => (
                    <p key={log} className="min-w-max">{log}</p>
                  ))}
                </div>
              </section>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setActionMessage(
                      selectedJob.tone === "progress"
                        ? "중단 요청을 전송했습니다. 현재 처리 단위가 끝난 뒤 멈춥니다."
                        : selectedJob.tone === "warning"
                          ? "데이터 연결 메모를 열었습니다."
                          : "작업을 실행 대기열에 등록했습니다.",
                    )
                  }
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-5 py-3.5 text-sm font-black text-white hover:bg-[var(--brand-dark)]"
                >
                  {selectedJob.tone === "progress" ? (
                    <><PauseCircle size={17} /> 작업 중단</>
                  ) : selectedJob.tone === "success" ? (
                    <><RotateCcw size={17} /> 다시 실행</>
                  ) : selectedJob.tone === "warning" ? (
                    <><FileText size={17} /> 연결 메모 확인</>
                  ) : (
                    <><Play size={17} /> 지금 실행</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActionMessage("실패한 항목만 재시도 대기열에 등록했습니다.")}
                  disabled={selectedJob.failed === 0}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-black/9 bg-white px-5 py-3.5 text-sm font-black disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <RefreshCw size={16} /> 실패 항목 재시도
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {actionMessage && (
        <button
          type="button"
          onClick={() => setActionMessage("")}
          className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-[var(--ink)] px-5 py-3 text-xs font-bold text-white shadow-xl"
        >
          {actionMessage}
        </button>
      )}
    </div>
  );
}
