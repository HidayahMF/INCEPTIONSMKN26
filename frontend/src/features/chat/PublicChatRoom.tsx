import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { api } from "../../lib/api";
import { usePublicChat } from "./ChatProvider";
import type { ChatMessage, ChatResponse, ChatSource } from "./chat.types";

const chatbotImage = "/assets/figma/ai-cta/ai-cta-raw-02.png";

const suggestedQuestions = [
  "Apa saja jurusan di SMKN 26?",
  "Bagaimana cara melihat Virtual Tour?",
  "Apa program unggulan sekolah?",
  "Di mana lokasi SMKN 26?",
];

function messageId() { return `${Date.now()}-${Math.random().toString(36).slice(2)}`; }

export function PublicChatRoom() {
  const { isOpen, closeChat } = usePublicChat();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    composerRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const history = historyRef.current;
    if (history) history.scrollTo({ top: history.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => { if (event.key === "Escape" && isOpen) closeChat(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeChat, isOpen]);

  async function sendQuestion(value = question) {
    const current = value.trim();
    if (!current || busy || current.length > 500) return;
    setQuestion(""); setError(""); setBusy(true);
    setMessages((items) => [...items, { id: messageId(), role: "user", text: current }]);
    try {
      const result = await api<ChatResponse>("/api/chat", { method: "POST", body: JSON.stringify({ message: current }) });
      setMessages((items) => [...items, { id: messageId(), role: "assistant", text: result.answer, status: result.status, sources: result.sources }]);
    } catch (caught) {
      const status = (caught as { status?: number }).status;
      setMessages((items) => [...items, { id: messageId(), role: "assistant", text: status === 503 ? "Layanan Tanya AI sedang sibuk. Silakan coba lagi." : "Maaf, pertanyaan belum dapat diproses. Silakan coba lagi.", status: "error", sources: [] }]);
    } finally { setBusy(false); }
  }

  function submit(event: FormEvent) { event.preventDefault(); void sendQuestion(); }
  function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendQuestion(); } }
  function close() { closeChat(); }

  if (!isOpen) return null;
   return <aside className="fixed inset-3 z-[60] flex min-h-0 w-auto max-h-none flex-col overflow-hidden rounded-3xl border border-light-blue bg-white shadow-[0_20px_60px_rgba(11,19,36,.18)] sm:right-7 sm:bottom-32 sm:left-auto sm:top-auto sm:h-[min(640px,calc(100dvh-150px))] sm:w-[min(400px,calc(100vw-56px))] sm:min-h-[420px]" role="dialog" aria-label="Tanya AI SMKN 26 Jakarta">
     <header className="flex items-center justify-between gap-4 border-b border-school-bg bg-gradient-to-br from-white to-[#f6fbff] p-3 pr-4"><div className="flex min-w-0 items-center gap-2.5"><img className="size-12 shrink-0 object-contain" src={chatbotImage} alt="" /><div className="grid min-w-0 gap-[3px]"><strong className="text-base text-ink">Tanya AI</strong><span className="truncate text-[11px] text-muted">Asisten informasi SMKN 26 Jakarta</span></div></div><button type="button" className="grid size-9 shrink-0 place-items-center rounded-full border-0 bg-school-bg text-2xl leading-none text-primary-dark hover:bg-light-blue focus-visible:outline-2 focus-visible:outline-primary" aria-label="Tutup Tanya AI" onClick={close}>×</button></header>
     <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto px-4 py-5" ref={historyRef} aria-live="polite">
       {!messages.length && <div className="flex min-h-full flex-col items-center justify-center text-center"><img className="size-28 object-contain" src={chatbotImage} alt="" /><h2 className="mt-3 text-xl font-bold text-ink">Halo! Saya siap membantu.</h2><p className="my-2 max-w-[280px] text-[13px] leading-[1.6] text-muted">Saya menjawab berdasarkan sumber sekolah yang telah disetujui.</p><div className="flex flex-wrap justify-center gap-2">{suggestedQuestions.map((suggestion) => <button className="rounded-full border border-light-blue bg-[#f6fbff] px-[11px] py-2 text-xs font-medium text-primary-dark hover:border-primary hover:bg-school-bg" type="button" key={suggestion} onClick={() => void sendQuestion(suggestion)}>{suggestion}</button>)}</div></div>}
       {messages.map((message) => <ChatBubble key={message.id} message={message} />)}
       {busy && <div className="flex max-w-[92%] items-end gap-2 self-start"><span className="size-7 shrink-0"><img className="size-full object-contain" src={chatbotImage} alt="" /></span><div className="flex gap-1 rounded-[18px_18px_18px_5px] border border-light-blue bg-school-bg p-[15px]" aria-label="Mencari informasi resmi"><i className="size-1.5 animate-pulse rounded-full bg-primary" /><i className="size-1.5 animate-pulse rounded-full bg-primary [animation-delay:150ms]" /><i className="size-1.5 animate-pulse rounded-full bg-primary [animation-delay:300ms]" /></div></div>}
     </div>
     {error && <p className="mx-4 mb-2 rounded-xl bg-[#fff4df] px-3 py-2 text-xs text-[#856000]">{error}</p>}
     <form className="border-t border-school-bg bg-white p-3 pb-[max(12px,env(safe-area-inset-bottom))]" onSubmit={submit}><textarea className="block min-h-[42px] max-h-[100px] w-full resize-none rounded-[15px] border border-light-blue px-3 py-[11px] text-[13px] leading-[1.4] text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10" ref={composerRef} value={question} maxLength={500} onChange={(event) => setQuestion(event.target.value)} onKeyDown={onComposerKeyDown} placeholder="Tanyakan tentang SMKN 26 Jakarta..." aria-label="Pertanyaan untuk Tanya AI" rows={1} /><div className="flex items-center justify-between gap-2 pt-2"><span className="text-[10px] text-muted">{question.length}/500 · Enter untuk kirim</span><button className="rounded-full border-0 bg-gradient-to-br from-primary-dark to-primary px-4 py-[9px] text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-45" type="submit" aria-label="Kirim pertanyaan" disabled={busy || !question.trim()}>Kirim</button></div></form>
   </aside>;
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const sources: ChatSource[] = message.sources || [];
  return <div className={`flex max-w-[92%] items-end gap-2 ${message.role === "user" ? "self-end" : "self-start"}`}>
     {message.role === "assistant" && <span className="size-7 shrink-0"><img className="size-full object-contain" src={chatbotImage} alt="" /></span>}
    <div className={`rounded-[18px_18px_18px_5px] border border-light-blue bg-school-bg px-[13px] py-[11px] text-[13px] leading-[1.55] text-ink ${message.role === "user" ? "rounded-[18px_18px_5px_18px] border-0 bg-gradient-to-br from-primary-dark to-primary text-white" : ""}`}><p className="m-0 whitespace-pre-wrap">{message.text}</p>{message.status === "insufficient_evidence" && <small className="mt-2 block text-[11px] text-muted">Informasi ini belum tersedia pada sumber resmi yang disetujui.</small>}{sources.length > 0 && <div className="mt-2 grid gap-1 border-t border-primary/15 pt-2"><strong className="text-[11px] text-primary-dark">Sumber</strong>{sources.map((source, index) => { const href = source.url || source.page; return href ? <a className="text-[11px] text-primary-dark hover:underline" key={`${source.title}-${index}`} href={href} target={source.url ? "_blank" : undefined} rel={source.url ? "noreferrer" : undefined}>↗ {source.title}</a> : <span className="text-[11px]" key={`${source.title}-${index}`}>↗ {source.title}</span>; })}</div>}</div>
  </div>;
}
