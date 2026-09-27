import { useEffect, useState } from "react";
import chatbotDefault from "../../assets/chatbot/chatbot-default.png";
import chatbotHover from "../../assets/chatbot/chatbot-hover.png";
import chatbotPressed from "../../assets/chatbot/chatbot-pressed.png";
import { usePublicChat } from "../../features/chat/ChatProvider";

type ChatbotState = "idle" | "hover" | "active";

export function FloatingChatbot() {
  const { openChat } = usePublicChat();
  const [state, setState] = useState<ChatbotState>("idle");

  useEffect(() => {
    for (const source of [chatbotHover, chatbotPressed]) {
      const image = new Image();
      image.src = source;
    }
  }, []);

  const image = state === "active" ? chatbotPressed : state === "hover" ? chatbotHover : chatbotDefault;

  return (
    <button
      type="button"
      className="floating-chatbot"
      aria-label="Buka Tanya AI"
      onClick={openChat}
      onPointerEnter={() => setState("hover")}
      onPointerLeave={() => setState("idle")}
      onPointerDown={() => setState("active")}
      onPointerUp={() => setState("hover")}
    >
      <img src={image} alt="" aria-hidden="true" />
    </button>
  );
}
