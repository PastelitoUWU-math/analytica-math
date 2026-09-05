// Navegación con expansión: el recuadro pulsado crece hasta llenar la pantalla
// y entonces se navega al destino (la entrada la remata PageTransition).
import { useRouter } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Target = { to: string; params?: Record<string, string> };
type ExpandState = {
  html: string;
  rect: { top: number; left: number; width: number; height: number };
  target: Target;
};

const ExpandCtx = createContext<(el: HTMLElement, target: Target) => void>(() => {});

/** Devuelve la función para navegar expandiendo un elemento origen. */
export function useExpandNav() {
  return useContext(ExpandCtx);
}

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ExpandNavProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [st, setSt] = useState<ExpandState | null>(null);
  const busy = useRef(false);

  const expandTo = useCallback(
    (el: HTMLElement, target: Target) => {
      if (REDUCED || busy.current) {
        router.navigate({ to: target.to as never, params: target.params as never });
        return;
      }
      busy.current = true;
      const r = el.getBoundingClientRect();
      setSt({
        html: el.outerHTML,
        rect: { top: r.top, left: r.left, width: r.width, height: r.height },
        target,
      });
    },
    [router]
  );

  return (
    <ExpandCtx.Provider value={expandTo}>
      {children}
      <AnimatePresence>
        {st && (
          <motion.div
            key="expand-nav"
            className="fixed z-[70] overflow-hidden rounded-xl border border-accent/50 bg-card shadow-2xl pointer-events-none"
            initial={{
              top: st.rect.top,
              left: st.rect.left,
              width: st.rect.width,
              height: st.rect.height,
              borderRadius: 12,
            }}
            animate={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100dvh",
              borderRadius: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.48, ease: [0.7, 0, 0.2, 1] }}
            onAnimationComplete={() => {
              router.navigate({ to: st.target.to as never, params: st.target.params as never });
              setTimeout(() => {
                setSt(null);
                busy.current = false;
              }, 140);
            }}
          >
            {/* Copia del recuadro original, anclada arriba a la izquierda */}
            <div
              style={{ width: st.rect.width }}
              dangerouslySetInnerHTML={{ __html: st.html }}
            />
            {/* Velo que tiñe la expansión con el acento del tema */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.16, duration: 0.32 }}
              style={{
                background:
                  "linear-gradient(180deg, color-mix(in oklch, var(--accent) 22%, var(--card)), var(--background))",
              }}
            />
            {/* Destello central */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 1.25] }}
              transition={{ delay: 0.18, duration: 0.4, ease: "easeOut" }}
            >
              <div
                className="w-24 h-24 rounded-full blur-2xl"
                style={{ background: "color-mix(in oklch, var(--accent) 60%, transparent)" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ExpandCtx.Provider>
  );
}
