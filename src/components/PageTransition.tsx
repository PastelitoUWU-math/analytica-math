// Transiciones de página: cortina + entrada suave del contenido.
import { AnimatePresence, motion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [curtain, setCurtain] = useState(false);
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    if (pathname === key) return;
    setCurtain(true);
    setKey(pathname);
    const t = setTimeout(() => setCurtain(false), 420);
    return () => clearTimeout(t);
  }, [pathname, key]);

  return (
    <>
      <AnimatePresence>
        {curtain && (
          <motion.div
            key="curtain"
            className="pointer-events-none fixed inset-0 z-50 origin-top"
            initial={{ scaleY: 0, opacity: 0.9 }}
            animate={{ scaleY: [0, 1, 1], opacity: [0.9, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, times: [0, 0.45, 1], ease: [0.65, 0, 0.35, 1] }}
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklch, var(--accent) 35%, var(--background)), var(--background))",
            }}
          />
        )}
      </AnimatePresence>
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1], delay: 0.06 }}
      >
        {children}
      </motion.div>
    </>
  );
}
