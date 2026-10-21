import { useEffect, useRef, useState, type PointerEvent } from "react";
import { usePublicChat } from "../../features/chat/ChatProvider";

type ChatbotState = "idle" | "hover" | "active";
type GreetingState = "hidden" | "visible" | "exiting";
const chatbotImage = "/assets/shared/chatbot/Chat%20bot%20Ai.png";
const greetingStorageKey = "inception-chatbot-greeted";

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sessionHasGreeting() {
  try {
    return window.sessionStorage.getItem(greetingStorageKey) === "true";
  } catch {
    return false;
  }
}

function markGreetingSeen() {
  try {
    window.sessionStorage.setItem(greetingStorageKey, "true");
  } catch {
    // Storage may be unavailable in privacy-restricted browser contexts.
  }
}

export function FloatingChatbot() {
  const { isOpen, openChat } = usePublicChat();
  const [state, setState] = useState<ChatbotState>("idle");
  const [isBlinking, setIsBlinking] = useState(false);
  const [isMotionReduced, setIsMotionReduced] = useState(false);
  const [greetingState, setGreetingState] = useState<GreetingState>("hidden");
  const greetingTimers = useRef<number[]>([]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setIsMotionReduced(media.matches);
    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);
    return () => media.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (isMotionReduced) {
      setIsBlinking(false);
      return;
    }
    let disposed = false;
    let timer: number | undefined;

    const clearTimer = () => {
      if (timer !== undefined) window.clearTimeout(timer);
      timer = undefined;
    };
    const schedule = (callback: () => void, delay: number) => {
      clearTimer();
      timer = window.setTimeout(() => {
        timer = undefined;
        if (!disposed) callback();
      }, delay);
    };
    const scheduleNextBlink = () => schedule(runBlink, randomBetween(2500, 4500));
    const runBlink = () => {
      if (document.visibilityState !== "visible") return;
      setIsBlinking(true);
      schedule(() => {
        setIsBlinking(false);
        if (Math.random() < 0.3) {
          schedule(() => {
            if (document.visibilityState !== "visible") return;
            setIsBlinking(true);
            schedule(() => {
              setIsBlinking(false);
              scheduleNextBlink();
            }, 140);
          }, 120);
        } else {
          scheduleNextBlink();
        }
      }, randomBetween(120, 160));
    };
    const handleVisibilityChange = () => {
      clearTimer();
      setIsBlinking(false);
      if (document.visibilityState === "visible") scheduleNextBlink();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleNextBlink();
    return () => {
      disposed = true;
      clearTimer();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isMotionReduced]);

  useEffect(() => {
    greetingTimers.current.forEach((timer) => window.clearTimeout(timer));
    greetingTimers.current = [];
    setGreetingState("hidden");
    if (isOpen || sessionHasGreeting()) return;

    let disposed = false;
    const showTimer = window.setTimeout(() => {
      if (disposed || isOpen || document.visibilityState !== "visible") return;
      markGreetingSeen();
      setGreetingState("visible");
      const hideTimer = window.setTimeout(() => {
        if (disposed) return;
        setGreetingState("exiting");
        const removeTimer = window.setTimeout(() => {
          if (!disposed) setGreetingState("hidden");
        }, 200);
        greetingTimers.current.push(removeTimer);
      }, 5000);
      greetingTimers.current.push(hideTimer);
    }, randomBetween(5000, 8000));
    greetingTimers.current.push(showTimer);

    return () => {
      disposed = true;
      greetingTimers.current.forEach((timer) => window.clearTimeout(timer));
      greetingTimers.current = [];
    };
  }, [isOpen]);

  function closeGreeting() {
    if (greetingState === "hidden") return;
    greetingTimers.current.forEach((timer) => window.clearTimeout(timer));
    greetingTimers.current = [];
    setGreetingState("exiting");
    const timer = window.setTimeout(() => setGreetingState("hidden"), 200);
    greetingTimers.current.push(timer);
  }

  function handlePointerEnter(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "touch") {
      setState("hover");
      closeGreeting();
    }
  }

  function handlePointerLeave(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "touch") setState("idle");
  }

  function handleOpenChat() {
    markGreetingSeen();
    closeGreeting();
    openChat();
  }

  // The chat room has its own header and close control. Do not leave a second
  // clickable mascot underneath it while the dialog is open.
  if (isOpen) return null;

  return (
    <button
      type="button"
      className="group floating-chatbot fixed right-4 bottom-[34px] z-50 size-[72px] cursor-pointer border-0 bg-transparent p-0 md:right-7 md:bottom-[90px] md:size-[120px] focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4"
      aria-label="Buka Pembangunan.AI"
      aria-describedby={greetingState !== "hidden" ? "chatbot-greeting" : "chatbot-hover-tooltip"}
      onClick={handleOpenChat}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={() => setState("active")}
      onPointerUp={() => setState("hover")}
      onPointerCancel={() => setState("idle")}
    >
      <span
        id="chatbot-hover-tooltip"
        role="tooltip"
        className="pointer-events-none absolute right-full top-1/2 mr-3 max-w-[min(220px,calc(100vw-96px))] -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-2xl border border-light-blue bg-white px-3.5 py-2 text-xs font-semibold text-primary-dark opacity-0 shadow-xl transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
      >
        Ada yang bisa aku bantu?
      </span>
      {greetingState !== "hidden" && (
        <span
          id="chatbot-greeting"
          className={`pointer-events-none absolute right-0 bottom-full mb-3 w-max max-w-[min(220px,calc(100vw-32px))] rounded-2xl border border-light-blue bg-white px-4 py-3 text-left text-sm leading-5 text-primary-dark shadow-xl after:absolute after:right-5 after:bottom-[-7px] after:size-3.5 after:rotate-45 after:border-r after:border-b after:border-light-blue after:bg-white motion-reduce:animate-none ${greetingState === "visible" ? "animate-chatbot-greeting-in" : "animate-chatbot-greeting-out"}`}
          role="status"
          aria-live="polite"
        >
          Halo! 👋 Ada yang bisa aku bantu?
        </span>
      )}
      <span className="block size-full motion-safe:animate-chatbot-float motion-reduce:animate-none">
        <span className="block size-full scale-100 transition-transform duration-300 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06] group-hover:drop-shadow-[0_6px_14px_rgba(0,146,255,0.3)] group-focus-visible:drop-shadow-[0_6px_14px_rgba(0,146,255,0.3)]">
          <span className="relative block size-full">
            <img className="block size-full object-contain" src={chatbotImage} alt="" aria-hidden="true" data-chatbot-state={state} draggable={false} />
            {isBlinking && state !== "active" && (
              <span className="pointer-events-none absolute inset-0" aria-hidden="true">
                <span className="absolute left-[29%] top-[52%] h-[11%] w-[19%] rounded-[50%] bg-[#071a40] before:absolute before:left-[16%] before:right-[16%] before:top-[44%] before:h-[35%] before:rounded-[50%] before:border-t-2 before:border-[#d2f9ff] before:content-['']" />
                <span className="absolute right-[29%] top-[52%] h-[11%] w-[19%] rounded-[50%] bg-[#071a40] before:absolute before:left-[16%] before:right-[16%] before:top-[44%] before:h-[35%] before:rounded-[50%] before:border-t-2 before:border-[#d2f9ff] before:content-['']" />
              </span>
            )}
          </span>
        </span>
      </span>
    </button>
  );
}
