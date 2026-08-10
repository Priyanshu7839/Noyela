import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

const STATE_COLORS = {
  idle: {
    nebula1: "rgba(80, 40, 200, 0.9)",
    nebula2: "rgba(120, 60, 255, 0.6)",
    nebula3: "rgba(30, 10, 120, 0.95)",
    glow: "rgba(100, 60, 255, 0.5)",
    ring: "rgba(140, 100, 255, 0.3)",
    accent: "rgba(180, 140, 255, 0.8)",
  },
  listening: {
    nebula1: "rgba(40, 80, 220, 0.9)",
    nebula2: "rgba(80, 130, 255, 0.65)",
    nebula3: "rgba(10, 30, 140, 0.95)",
    glow: "rgba(80, 130, 255, 0.55)",
    ring: "rgba(100, 160, 255, 0.35)",
    accent: "rgba(160, 200, 255, 0.85)",
  },
  thinking: {
    nebula1: "rgba(100, 20, 180, 0.9)",
    nebula2: "rgba(150, 60, 240, 0.65)",
    nebula3: "rgba(40, 5, 100, 0.95)",
    glow: "rgba(150, 60, 240, 0.6)",
    ring: "rgba(180, 100, 255, 0.4)",
    accent: "rgba(210, 160, 255, 0.85)",
  },
  speaking: {
    nebula1: "rgba(70, 30, 180, 0.9)",
    nebula2: "rgba(110, 55, 230, 0.65)",
    nebula3: "rgba(35, 10, 110, 0.95)",
    glow: "rgba(110, 55, 230, 0.55)",
    ring: "rgba(150, 100, 255, 0.35)",
    accent: "rgba(200, 160, 255, 0.85)",
  },
  error: {
    nebula1: "rgba(160, 20, 20, 0.9)",
    nebula2: "rgba(220, 50, 50, 0.65)",
    nebula3: "rgba(80, 5, 5, 0.95)",
    glow: "rgba(220, 50, 50, 0.55)",
    ring: "rgba(255, 100, 100, 0.35)",
    accent: "rgba(255, 180, 180, 0.8)",
  },
};

function CosmicDust({ state, scale }) {
  const c = STATE_COLORS[state];
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      angle: (i / 18) * Math.PI * 2,
      radius: (85 + (i % 3) * 18) * scale,
      size: (1 + (i % 3) * 0.8) * Math.max(scale, 0.5),
      duration: 6 + (i % 4) * 2,
      delay: (i * 0.4) % 6,
      opacity: 0.3 + (i % 4) * 0.15,
    })),
    [scale]
  );

  const isActive = state !== "idle";

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size * 2,
            height: p.size * 2,
            background: c.accent,
            boxShadow: `0 0 ${p.size * 3}px ${c.accent}`,
          }}
          animate={{
            x: [
              Math.cos(p.angle) * p.radius,
              Math.cos(p.angle + Math.PI) * p.radius,
              Math.cos(p.angle + Math.PI * 2) * p.radius,
            ],
            y: [
              Math.sin(p.angle) * (p.radius * 0.35),
              Math.sin(p.angle + Math.PI) * (p.radius * 0.35),
              Math.sin(p.angle + Math.PI * 2) * (p.radius * 0.35),
            ],
            opacity: isActive
              ? [p.opacity, p.opacity * 0.4, p.opacity]
              : [p.opacity * 0.3, p.opacity * 0.1, p.opacity * 0.3],
            scale: isActive ? [1, 1.4, 1] : [0.6, 0.4, 0.6],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function WaveRings({ state, scale }) {
  const c = STATE_COLORS[state];
  const isActive = state === "listening" || state === "speaking" || state === "thinking";
  const isError = state === "error";

  if (!isActive && !isError) return null;

  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            inset: `-${(i + 1) * 16 * scale}px`,
            border: `1px solid ${isError ? "rgba(220,50,50,0.4)" : c.ring}`,
            boxShadow: `0 0 12px ${isError ? "rgba(220,50,50,0.1)" : c.glow.replace("0.5", "0.08")}`,
          }}
          animate={{
            opacity: [0, isActive ? 0.7 : 0.4, 0],
            scale: [0.88, 1.08, 1.25],
          }}
          transition={{
            duration: isActive ? 1.6 : 2.2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

function OrbNebula({ state }) {
  const c = STATE_COLORS[state];
  const isThinking = state === "thinking";
  const isSpeaking = state === "speaking";

  return (
    <>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, ${c.nebula2} 0%, transparent 55%)`,
          mixBlendMode: "screen",
        }}
        animate={{
          rotate: isThinking ? 360 : [0, 15, -10, 5, 0],
          scale: isSpeaking ? [1, 1.08, 0.95, 1.05, 1] : [1, 1.04, 1],
        }}
        transition={
          isThinking
            ? { rotate: { duration: 4, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }
            : { duration: isSpeaking ? 0.6 : 5, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(ellipse at 70% 65%, ${c.accent.replace("0.8", "0.35")} 0%, transparent 50%)`,
          mixBlendMode: "screen",
        }}
        animate={{ rotate: isThinking ? -360 : [0, -12, 8, -4, 0] }}
        transition={
          isThinking
            ? { duration: 6, repeat: Infinity, ease: "linear" }
            : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: "30%", height: "30%",
          top: "35%", left: "35%",
          background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
        animate={{ scale: isSpeaking ? [1, 1.4, 0.8, 1.2, 1] : [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: isSpeaking ? 0.55 : 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function SpeakingBars({ scale }) {
  const bars = [0.5, 0.9, 0.7, 1.1, 0.65, 1.0, 0.55];
  const barW = Math.max(2, Math.round(3 * scale));
  const barH = Math.max(12, Math.round(24 * scale));
  const gap = Math.max(2, Math.round(3 * scale));

  return (
    <div className="flex items-center" style={{ height: barH, gap }}>
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: barW,
            height: "100%",
            background: "linear-gradient(to top, rgba(255,255,255,0.4), rgba(255,255,255,0.95))",
            transformOrigin: "center",
            boxShadow: "0 0 6px rgba(255,255,255,0.5)",
          }}
          animate={{ scaleY: [h * 0.3, h, h * 0.45, h * 0.85, h * 0.25] }}
          transition={{ duration: 0.45 + i * 0.06, repeat: Infinity, ease: "easeInOut", delay: i * 0.07 }}
        />
      ))}
    </div>
  );
}

function OrbInner({ state, scale }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {state === "speaking" && (
          <motion.div
            key="bars"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <SpeakingBars scale={scale} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Animated orb component with multiple states.
 *
 * @param {{ state: "idle"|"listening"|"thinking"|"speaking"|"error", width?: number, height?: number }} props
 */
export default function Orb({ state = "idle", width = 220, height = 220 }) {
  const c = STATE_COLORS[state] ?? STATE_COLORS.idle;
  const size = Math.min(width, height);
  const scale = size / 220;
  const orbDiam = Math.round(160 * scale);
  const glowDiam = Math.round(320 * scale);
  const highlightW = Math.round(55 * scale);
  const highlightH = Math.round(30 * scale);
  const highlightTop = Math.round(18 * scale);
  const highlightLeft = Math.round(22 * scale);
  const blurGlow = Math.max(4, Math.round(20 * scale));
  const shadowInner = Math.max(8, Math.round(40 * scale));
  const shadowOuter = Math.max(16, Math.round(80 * scale));

  const isThinking = state === "thinking";
  const isIdle = state === "idle";
  const isListening = state === "listening";
  const isSpeaking = state === "speaking";

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width, height }}
    >
      {/* Far glow bloom */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: glowDiam,
          height: glowDiam,
          background: `radial-gradient(circle, ${c.glow} 0%, transparent 65%)`,
          filter: `blur(${blurGlow}px)`,
        }}
        animate={
          isIdle ? { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }
          : isThinking ? { scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }
          : isSpeaking ? { scale: [1, 1.15, 0.95, 1.1, 1], opacity: [0.6, 1, 0.6] }
          : { scale: 1.1, opacity: 0.65 }
        }
        transition={{
          duration: isIdle ? 4 : isThinking ? 2.5 : isSpeaking ? 0.6 : 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cosmic dust orbit */}
      <CosmicDust state={state} scale={scale} />

      {/* Wave rings */}
      <WaveRings state={state} scale={scale} />

      {/* Main orb sphere */}
      <motion.div
        className="relative rounded-full overflow-hidden"
        style={{
          width: orbDiam,
          height: orbDiam,
          background: `radial-gradient(ellipse at 40% 35%, ${c.nebula2} 0%, ${c.nebula1} 45%, ${c.nebula3} 100%)`,
          boxShadow: `0 0 ${shadowInner}px ${c.glow}, 0 0 ${shadowOuter}px ${c.glow.replace("0.5", "0.2")}, inset 0 1px 0 rgba(255,255,255,0.15)`,
        }}
        animate={
          isIdle ? { scale: [1, 1.03, 1] }
          : isThinking ? { scale: [1, 1.05, 0.97, 1.03, 1] }
          : isListening ? { scale: [1, 1.07, 1] }
          : isSpeaking ? { scale: [1, 1.05, 0.96, 1.04, 1] }
          : { scale: [1, 0.96, 1] }
        }
        transition={{
          duration: isIdle ? 3.5 : isThinking ? 1.8 : isListening ? 1.2 : isSpeaking ? 0.5 : 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <OrbNebula state={state} />

        {/* Glass sheen */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.18) 0%, transparent 45%)" }}
        />

        {/* Rim light bottom */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(ellipse at 60% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)" }}
        />

        {/* Deep shadow */}
        {/* <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(ellipse at 55% 72%, rgba(5,0,30,0.75) 0%, rgba(60,10,120,0.3) 35%, transparent 65%)",
            mixBlendMode: "multiply",
          }}
        /> */}

        {/* Top highlight blob */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: highlightW,
            height: highlightH,
            top: highlightTop,
            left: highlightLeft,
            background: "radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 75%)",
            filter: `blur(${Math.max(2, Math.round(5 * scale))}px)`,
          }}
          animate={isThinking ? { x: [0, 5, -3, 0], opacity: [0.7, 1, 0.7] } : { opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <OrbInner state={state} scale={scale} />
      </motion.div>
    </div>
  );
}
