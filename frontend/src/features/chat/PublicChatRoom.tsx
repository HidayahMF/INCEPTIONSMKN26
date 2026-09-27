import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import chatbotDefault from "../../assets/chatbot/chatbot-default.png";
import { api } from "../../lib/api";
import { usePublicChat } from "./ChatProvider";
import type { ChatMessage, ChatResponse, ChatSource } from "./chat.types";

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
    document.body.classList.add("chat-room-open");
    return () => document.body.classList.remove("chat-room-open");
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
  return <aside className="public-chat-room" role="dialog" aria-label="Tanya AI SMKN 26 Jakarta">
    <header className="public-chat-header"><div className="public-chat-identity"><img src={chatbotDefault} alt="" /><div><strong>Tanya AI</strong><span>Asisten informasi SMKN 26 Jakarta</span></div></div><button type="button" className="public-chat-close" aria-label="Tutup Tanya AI" onClick={close}>×</button></header>
    <div className="public-chat-history" ref={historyRef} aria-live="polite">
      {!messages.length && <div className="public-chat-welcome"><img src={chatbotDefault} alt="" /><h2>Halo! Saya siap membantu.</h2><p>Saya menjawab berdasarkan sumber sekolah yang telah disetujui.</p><div className="public-chat-suggestions">{suggestedQuestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => void sendQuestion(suggestion)}>{suggestion}</button>)}</div></div>}
      {messages.map((message) => <ChatBubble key={message.id} message={message} />)}
      {busy && <div className="public-chat-message assistant"><span className="public-chat-avatar"><img src={chatbotDefault} alt="" /></span><div className="public-chat-bubble public-chat-thinking" aria-label="Mencari informasi resmi"><i /><i /><i /></div></div>}
    </div>
    {error && <p className="public-chat-error">{error}</p>}
    <form className="public-chat-composer" onSubmit={submit}><textarea ref={composerRef} value={question} maxLength={500} onChange={(event) => setQuestion(event.target.value)} onKeyDown={onComposerKeyDown} placeholder="Tanyakan tentang SMKN 26 Jakarta..." aria-label="Pertanyaan untuk Tanya AI" rows={1} /><div className="public-chat-composer-footer"><span>{question.length}/500 · Enter untuk kirim</span><button type="submit" aria-label="Kirim pertanyaan" disabled={busy || !question.trim()}>Kirim</button></div></form>
  </aside>;
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const sources: ChatSource[] = message.sources || [];
  return <div className={`public-chat-message ${message.role}`}>
    {message.role === "assistant" && <span className="public-chat-avatar"><img src={chatbotDefault} alt="" /></span>}
    <div className="public-chat-bubble"><p>{message.text}</p>{message.status === "insufficient_evidence" && <small className="public-chat-notice">Informasi ini belum tersedia pada sumber resmi yang disetujui.</small>}{sources.length > 0 && <div className="public-chat-sources"><strong>Sumber</strong>{sources.map((source, index) => { const href = source.url || source.page; return href ? <a key={`${source.title}-${index}`} href={href} target={source.url ? "_blank" : undefined} rel={source.url ? "noreferrer" : undefined}>↗ {source.title}</a> : <span key={`${source.title}-${index}`}>↗ {source.title}</span>; })}</div>}</div>
  </div>;
}
