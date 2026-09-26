import { useCallback, useEffect, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';

export function useLocation() { return { pathname: window.location.pathname }; }
export function Navigate({ to, replace = false }: { to: string; state?: unknown; replace?: boolean }) {
  useEffect(() => { if (replace) window.history.replaceState({}, '', to); else window.history.pushState({}, '', to); window.dispatchEvent(new PopStateEvent('popstate')); }, [to, replace]);
  return null;
}
export function useNavigate() {
  return useCallback((to: string, replace = false) => {
    if (replace) window.history.replaceState({}, '', to);
    else window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);
}
export function Link({ to, onClick, children, ...props }: { to: string; children: ReactNode } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const navigate = useNavigate();
  return <a href={to} {...props} onClick={(event) => { onClick?.(event); if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); navigate(to); } }}>{children}</a>;
}
export function Outlet({ children }: { children?: ReactNode }) { return <>{children}</>; }
export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => { const update = () => setPathname(window.location.pathname); window.addEventListener('popstate', update); return () => window.removeEventListener('popstate', update); }, []);
  return pathname;
}
