import { useState } from "react";
import { usePublicChat } from "../../features/chat/ChatProvider";

type ChatbotState = "idle" | "hover" | "active";
const chatbotImage = "/assets/figma/ai-cta/ai-cta-raw-02.png";

export function FloatingChatbot() {
  const { openChat } = usePublicChat();
  const [state, setState] = useState<ChatbotState>("idle");

  return (
    <button
      type="button"
      className="floating-chatbot fixed right-4 bottom-4 z-50 size-[72px] cursor-pointer border-0 bg-transparent p-0 md:right-7 md:bottom-16 md:size-[120px] focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
      aria-label="Buka Tanya AI"
      onClick={openChat}
      onPointerEnter={() => setState("hover")}
      onPointerLeave={() => setState("idle")}
      onPointerDown={() => setState("active")}
      onPointerUp={() => setState("hover")}
    >
      <img className="block size-full object-contain" src={chatbotImage} alt="" aria-hidden="true" data-chatbot-state={state} draggable={false} />
    </button>
  );
}
