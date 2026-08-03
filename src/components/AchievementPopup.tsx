import { useEffect, useState } from "react";
import { onAchievementUnlocked, type Achievement } from "@/lib/achievements";
import { sfx } from "@/lib/sfx";

type Item = Achievement & { key: number };

export function AchievementPopup() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    return onAchievementUnlocked((a) => {
      const key = Date.now() + Math.random();
      setItems((prev) => [...prev, { ...a, key }]);
      try { sfx.levelUp(); } catch { /* audio opcional */ }
      setTimeout(() => setItems((prev) => prev.filter((i) => i.key !== key)), 6500);
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-4 left-4 z-50 flex flex-col gap-3 max-w-[calc(100vw-2rem)] sm:max-w-sm">
      {items.map((a) => (
        <div
          key={a.key}
          className="animate-scale-in rounded-lg border border-accent/60 bg-card/95 backdrop-blur shadow-lg px-4 py-3 flex items-start gap-3"
          role="status"
        >
          <div className="text-3xl leading-none shrink-0 animate-bounce">{a.icono}</div>
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-[0.25em] text-accent">
              🎉 Logro desbloqueado
            </div>
            <div className="font-display text-lg leading-tight mt-0.5">{a.nombre}</div>
            <p className="text-xs text-muted-foreground mt-0.5">{a.descripcion}</p>
            <div className="mt-1 text-sm text-accent tabular-nums">
              +{a.recompensa_coins} ✦
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
