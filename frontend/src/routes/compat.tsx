import { useCallback, useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { prefetchRouteChunk } from './routePrefetch';

export function useLocation() { return { pathname: window.location.pathname }; }
export function Navigate({ to, replace = false }: { to: string; state?: unknown; replace?: boolean }) {
  useEffect(() => { if (replace) window.history.replaceState({}, '', to); else window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')); }, [to, replace]);
  return null;
}
export function useNavigate() {
  return useCallback((to: string, replace = false) => {
    if (import.meta.env.DEV) performance.mark('smkn26-route-navigation-start');
    if (replace) window.history.replaceState({}, '', to);
    else window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);
}
export function Link({ to, onClick, onMouseEnter, onFocus, children, ...props }: { to: string; children: ReactNode } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const navigate = useNavigate();
  const warm = () => prefetchRouteChunk(to);
  return <a href={to} {...props} onMouseEnter={(event) => { warm(); onMouseEnter?.(event); }} onFocus={(event) => { warm(); onFocus?.(event); }} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); navigate(to); } }}>{children}</a>;
}
export function Outlet({ children }: { children?: ReactNode }) { return <>{children}</>; }
export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => {
      const next = window.location.pathname;
      if (import.meta.env.DEV) {
        const started = performance.getEntriesByName('smkn26-route-navigation-start').at(-1);
        if (started) console.debug(`[navigation] ${next} click→route ${(performance.now() - started.startTime).toFixed(0)}ms`);
        performance.mark(`smkn26-route-change:${next}`);
      }
      setPathname(next);
    };
    window.addEventListener('popstate', update);
    return () => window.removeEventListener('popstate', update);
  }, []);
  return pathname;
}
