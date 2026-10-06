import { useEffect } from "react";
import AOS from "aos";
import { usePathname } from "../../routes/compat";

let initialized = false;

export function AOSInitializer() {
  const pathname = usePathname();
  useEffect(() => {
    const html = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      if (!initialized) {
        AOS.init({
          duration: 700,
          easing: "ease-out-cubic",
          once: true,
          offset: 80,
          anchorPlacement: "top-bottom",
          throttleDelay: 50,
          disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        });
        initialized = true;
      }
      requestAnimationFrame(() => {
        AOS.refreshHard();
        html.classList.add("aos-ready");
      });
    } catch {
      html.classList.add("aos-ready");
    }
    if (reducedMotion) html.classList.add("aos-ready");
  }, [pathname]);

  return null;
}
