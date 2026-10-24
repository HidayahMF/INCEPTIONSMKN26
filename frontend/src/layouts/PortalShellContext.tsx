import { createContext, useContext, type ReactNode } from "react";

const PortalShellContext = createContext(false);

export function PortalShellHost({ children }: { children: ReactNode }) {
  return <PortalShellContext.Provider value>{children}</PortalShellContext.Provider>;
}

export function usePortalShellHost() {
  return useContext(PortalShellContext);
}
