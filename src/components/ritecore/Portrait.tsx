import { useEffect, useRef } from "react";
import { drawPortrait } from "@/lib/ritecore/draw";

export function Portrait({
  name,
  style,
  body,
  legs,
  weapon,
  accent,
  className,
}: {
  name: string;
  style: string;
  body: string;
  legs: string;
  weapon: string;
  accent: string;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = c.clientWidth;
    const h = c.clientHeight;
    c.width = w * dpr;
    c.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawPortrait(ctx, { name, style, body, legs, weapon, accent }, w, h);
  }, [name, style, body, legs, weapon, accent]);
  return <canvas ref={ref} className={className} aria-hidden />;
}
