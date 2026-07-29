import { Bot, Send, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "안녕하세요! 오늘은 어떤 책을 찾고 계세요? 분위기나 관심사를 편하게 말해 주세요.",
  },
];

export function ChatWidget() {
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text },
      {
        id: Date.now() + 1,
        role: "assistant",
        text: "차분하게 몰입할 수 있는 책을 중심으로 찾아볼게요. 지금은 데모 모드라 추천 목록 페이지로 안내해 드릴게요.",
      },
    ]);
    setInput("");
  };

  return (
    <>
      {open && (
        <section
          className="fixed bottom-24 right-4 z-50 flex h-[min(560px,calc(100vh-130px))] w-[min(390px,calc(100vw-32px))] flex-col overflow-hidden rounded-[28px] border border-black/10 bg-[#fbfaf6] shadow-[0_24px_80px_rgba(23,45,38,0.24)] sm:right-7"
          aria-label="AI 도서 추천 챗봇"
        >
          <div className="flex items-center gap-3 bg-[var(--brand)] px-5 py-4 text-white">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-white/14">
              <Bot size={21} />
            </span>
            <div>
              <h2 className="font-bold">BookPick AI</h2>
              <p className="text-xs text-white/70">취향을 묻고 책을 찾아드려요</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-auto flex size-9 items-center justify-center rounded-full hover:bg-white/10"
              aria-label="챗봇 닫기"
            >
              <X size={19} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-5">
            <div className="rounded-2xl border border-[#d9a764]/25 bg-[#fff5df] p-3 text-xs leading-5 text-[#7e5729]">
              현재 챗봇은 화면 확인을 위한 데모입니다. 실제 Spring AI 연동은 이후 추가됩니다.
            </div>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-md bg-[var(--brand)] text-white"
                      : "rounded-bl-md border border-black/6 bg-white text-[var(--ink)]"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
            {messages.length > 2 && (
              <button
                type="button"
                onClick={() => {
                  navigate("/search");
                  setOpen(false);
                }}
                className="w-full rounded-xl border border-[var(--brand)]/20 bg-[#e9f3ef] px-4 py-3 text-sm font-bold text-[var(--brand)] hover:bg-[#dcece6]"
              >
                추천 목록 살펴보기
              </button>
            )}
          </div>

          <form onSubmit={sendMessage} className="flex gap-2 border-t border-black/7 bg-white p-4">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="예: 마음이 편해지는 소설"
              className="min-w-0 flex-1 rounded-xl bg-[#f3f2ec] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]/20"
              aria-label="챗봇 메시지"
            />
            <button
              type="submit"
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)]"
              aria-label="메시지 전송"
            >
              <Send size={17} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed bottom-5 right-4 z-50 flex h-14 items-center gap-2 rounded-full bg-[var(--brand)] px-5 font-bold text-white shadow-[0_14px_40px_rgba(23,107,91,0.3)] hover:-translate-y-1 hover:bg-[var(--brand-dark)] sm:right-7"
        aria-label={open ? "AI 추천 닫기" : "AI에게 책 추천받기"}
      >
        {open ? <X size={19} /> : <Sparkles size={19} />}
        <span className="text-sm">{open ? "닫기" : "AI 책 추천"}</span>
      </button>
    </>
  );
}
