import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ChatContextValue = { isOpen: boolean; openChat: () => void; closeChat: () => void; toggleChat: () => void };
const ChatContext = createContext<ChatContextValue | null>(null);

export function PublicChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(() => ({ isOpen, openChat: () => setIsOpen(true), closeChat: () => setIsOpen(false), toggleChat: () => setIsOpen((open) => !open) }), [isOpen]);

  useEffect(() => {
    const openChat = () => setIsOpen(true);
    window.addEventListener("open-chat", openChat);
    return () => window.removeEventListener("open-chat", openChat);
  }, []);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function usePublicChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("usePublicChat must be used inside PublicChatProvider");
  return context;
}
