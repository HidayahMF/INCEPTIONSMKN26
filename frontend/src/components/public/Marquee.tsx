import { useEffect, useRef, type ReactNode } from "react";

export function Marquee({
  children,
  duration = 30000,
  gapClass = "gap-6",
  ariaLabel,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  gapClass?: string;
  ariaLabel?: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const animation = track.animate(
      [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
      { duration, iterations: Infinity, easing: "linear" },
    );
    return () => animation.cancel();
  }, [duration]);

  return (
    <div className={`overflow-hidden ${className}`.trim()} aria-label={ariaLabel}>
      <div
        className={`flex w-max ${gapClass} pb-2 will-change-transform hover:[animation-play-state:paused]`}
        ref={trackRef}
      >
        {[0, 1].map((copy) => (
          <div className={`flex ${gapClass}`} aria-hidden={copy === 1} key={copy}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
