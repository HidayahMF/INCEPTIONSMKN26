import { useEffect } from "react";

export type FloatShape = {
  ref: { current: HTMLElement | null };
  duration: number;
  distance: number;
};

export function useFloatShapes(shapes: FloatShape[]) {
  useEffect(() => {
    const animations = shapes
      .map(({ ref, duration, distance }) => {
        const element = ref.current;
        if (!element) return null;
        return element.animate(
          [
            { transform: "translateY(0)" },
            { transform: `translateY(${distance}px)` },
            { transform: "translateY(0)" },
          ],
          { duration, iterations: Infinity, easing: "ease-in-out" },
        );
      })
      .filter((animation): animation is Animation => animation !== null);
    return () => animations.forEach((animation) => animation.cancel());
  }, []);
}
