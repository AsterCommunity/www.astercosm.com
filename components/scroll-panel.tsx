"use client";

import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { ReactNode, RefObject } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const ScrollContainerContext =
  createContext<RefObject<HTMLDivElement | null> | null>(null);
const ScrollPanelProgressContext = createContext<MotionValue<number> | null>(
  null,
);

type ScrollViewportProps = {
  children: ReactNode;
};

export function ScrollViewport({ children }: ScrollViewportProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollContainerContext value={containerRef}>
      <div
        ref={containerRef}
        className="scroll-viewport h-auto overflow-visible md:h-screen md:snap-y md:snap-mandatory md:overflow-y-auto md:scroll-smooth"
      >
        {children}
      </div>
    </ScrollContainerContext>
  );
}

function useScrollContainer() {
  return useContext(ScrollContainerContext);
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

type PanelCopyProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
};

export function PanelCopy({
  children,
  className = "",
  distance = 44,
}: PanelCopyProps) {
  const panelProgress = useContext(ScrollPanelProgressContext);
  const fallbackProgress = useMotionValue(0);
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();
  const progress = panelProgress ?? fallbackProgress;
  const y = useTransform(progress, [0, 0.25, 1], [0, 0, -distance]);
  const shouldAnimate = isDesktop && !prefersReducedMotion;

  return (
    <motion.div className={className} style={{ y: shouldAnimate ? y : 0 }}>
      {children}
    </motion.div>
  );
}

type ScrollPanelProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  backdrop?: ReactNode;
  mode?: "pinned" | "static";
  tone?: "plain" | "muted" | "dark";
};

export function ScrollPanel({
  id,
  children,
  className = "",
  backdrop,
  mode = "pinned",
  tone = "plain",
}: ScrollPanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const containerRef = useScrollContainer();
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    container: containerRef ?? undefined,
    target: panelRef,
    offset: ["start start", "end end"],
  });

  const isStatic = mode === "static";
  const shouldAnimate = isDesktop && !isStatic && !prefersReducedMotion;
  const toneClass =
    tone === "dark"
      ? "bg-[#080b12] text-white"
      : tone === "muted"
        ? "bg-aster-muted-bg/72"
        : "bg-aster-paper";
  const panelScale = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.94]);
  const panelRadius = useTransform(scrollYProgress, [0, 0.75, 1], [0, 0, 18]);
  const panelBlur = useTransform(scrollYProgress, [0, 0.75, 1], [0, 0, 5]);
  const backdropY = useTransform(scrollYProgress, [0, 1], [-24, 24]);
  const radius = useMotionTemplate`${panelRadius}px`;
  const blur = useMotionTemplate`blur(${panelBlur}px)`;
  const progressClip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"],
  );

  useEffect(() => {
    const container = containerRef?.current;
    const panel = panelRef.current;

    if (!container || !panel || !shouldAnimate) {
      return;
    }

    let settleTimer = 0;
    const handleScroll = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        const panelTravel = panel.offsetHeight - container.clientHeight;

        if (panelTravel <= 0) {
          return;
        }

        const localScroll = container.scrollTop - panel.offsetTop;
        const localProgress = localScroll / panelTravel;

        if (localProgress > 0.75 && localProgress < 0.95) {
          container.scrollTo({
            top: panel.offsetTop + panelTravel * 0.75,
            behavior: "smooth",
          });
        }
      }, 180);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(settleTimer);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef, shouldAnimate]);

  return (
    <ScrollPanelProgressContext value={scrollYProgress}>
      <section
        ref={panelRef}
        id={id}
        className={`scroll-panel relative min-h-screen border-b md:snap-always ${isStatic ? "md:min-h-[100svh] md:snap-start" : "md:min-h-[170svh] md:snap-center"} ${tone === "dark" ? "border-white/10" : "border-aster-border"} ${toneClass} ${className}`}
      >
        <motion.div
          className={`relative isolate flex min-h-screen items-center overflow-hidden pt-16 md:h-[100svh] md:min-h-[680px] ${isStatic ? "" : "md:sticky md:top-0"} ${toneClass}`}
          style={{
            filter: shouldAnimate ? blur : "none",
            scale: shouldAnimate ? panelScale : 1,
            borderRadius: shouldAnimate ? radius : 0,
          }}
        >
          {backdrop ? (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
              style={{
                scale: shouldAnimate ? 1.04 : 1,
                y: shouldAnimate ? backdropY : 0,
              }}
            >
              {backdrop}
            </motion.div>
          ) : null}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-8 top-1/2 z-10 hidden h-28 -translate-y-1/2 items-center justify-center md:flex"
          >
            <div className="relative h-full w-4">
              <span
                className={`absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 rounded-full ${tone === "dark" ? "bg-white/22" : "bg-aster-border"}`}
              />
              <motion.span
                className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 rounded-full bg-linear-to-b from-aster-yellow via-aster-rose to-aster-blue"
                style={{
                  clipPath: prefersReducedMotion
                    ? "inset(0% 0% 0% 0%)"
                    : progressClip,
                }}
              />
            </div>
          </div>
          <motion.div className="relative z-10 mx-auto h-full w-full max-w-7xl px-5 sm:px-8 lg:px-12">
            {children}
          </motion.div>
        </motion.div>
      </section>
    </ScrollPanelProgressContext>
  );
}
