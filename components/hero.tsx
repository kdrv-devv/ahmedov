"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Instagram, X, Linkedin, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const socialIcons = [
  { id: "instagram", Icon: Instagram, href: "#", label: "Instagram" },
  { id: "x", Icon: X, href: "#", label: "X" },
  { id: "linkedin", Icon: Linkedin, href: "#", label: "LinkedIn" },
  { id: "github", Icon: Github, href: "#", label: "GitHub" },
];

function Particle({
  delay,
  x,
  y,
  size,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background:
          "radial-gradient(circle, rgba(220,30,30,0.7) 0%, rgba(180,0,0,0.2) 70%, transparent 100%)",
      }}
      animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }}
      transition={{
        duration: 4 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function GlitchText({ text }: { text: string }) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 180);
      },
      3500 + Math.random() * 2000,
    );
    return () => clearInterval(interval);
  }, []);

  const baseStyle = {
    fontFamily: "'Anton', 'Impact', sans-serif",
    fontSize: "clamp(4rem, 10vw, 10rem)",
    fontWeight: 900,
    letterSpacing: "-0.03em",
    lineHeight: 0.85,
  };

  return (
    <div className="relative inline-block select-none">
      <span
        className="relative z-10 block"
        style={{
          ...baseStyle,
          color: "#ffffff",
          filter:
            "drop-shadow(0 0 40px rgba(220,0,0,0.55)) drop-shadow(0 0 80px rgba(180,0,0,0.25))",
        }}
      >
        {text}
      </span>
      {glitching && (
        <span
          className="absolute inset-0 block"
          style={{
            ...baseStyle,
            color: "#ff0022",
            clipPath: "inset(15% 0 55% 0)",
            transform: "translate(-8px, -2px)",
            opacity: 0.9,
          }}
        >
          {text}
        </span>
      )}
      {glitching && (
        <span
          className="absolute inset-0 block"
          style={{
            ...baseStyle,
            color: "#880000",
            clipPath: "inset(55% 0 10% 0)",
            transform: "translate(8px, 4px)",
            opacity: 0.9,
          }}
        >
          {text}
        </span>
      )}
      <span
        className="absolute inset-0 block pointer-events-none"
        style={{
          ...baseStyle,
          WebkitTextStroke: "1px rgba(220,0,0,0.18)",
          color: "transparent",
          transform: "translate(4px, 4px)",
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(smoothX, [0, 1], [-15, 15]);
  const bgY = useTransform(smoothY, [0, 1], [-15, 15]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const particles = [
    { delay: 0, x: "8%", y: "75%", size: 5 },
    { delay: 0.7, x: "92%", y: "80%", size: 4 },
    { delay: 1.2, x: "55%", y: "88%", size: 7 },
    { delay: 1.8, x: "20%", y: "85%", size: 4 },
    { delay: 2.3, x: "78%", y: "72%", size: 5 },
    { delay: 0.4, x: "40%", y: "90%", size: 3 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono&display=swap');

        @keyframes scanline {
          0%   { transform: translateY(-5%); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translateY(105vh); opacity: 0; }
        }
        @keyframes noise {
          0%, 100% { background-position: 0 0; }
          10%  { background-position: -5% -10%; }
          30%  { background-position: 7% -25%; }
          50%  { background-position: -25% 10%; }
          70%  { background-position: 0% 15%; }
          90%  { background-position: -10% 10%; }
        }

        .hero-noise {
          position: absolute; inset: 0; opacity: 0.035;
          pointer-events: none; z-index: 2;
          animation: noise 0.15s steps(1) infinite;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 180px;
        }
        .hero-scanline {
          position: absolute; width: 100%; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(220,0,0,0.12) 50%, transparent 100%);
          animation: scanline 10s linear infinite;
          pointer-events: none; z-index: 3;
        }
        .social-btn {
          background: rgba(220,0,0,0.07);
          border: 1px solid rgba(220,0,0,0.22);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .social-btn:hover {
          background: rgba(220,0,0,0.2);
          border-color: rgba(220,0,0,0.65);
          box-shadow: 0 0 18px rgba(220,0,0,0.3);
        }
        .badge {
          background: rgba(220,0,0,0.07);
          border: 1px solid rgba(220,0,0,0.18);
          backdrop-filter: blur(10px);
        }
        .mono { font-family: 'Space Mono', monospace; }
        .corner { position: absolute; width: 18px; height: 18px; z-index: 20; }
        .c-tl { top: 18px; left: 18px; border-top: 1px solid rgba(220,0,0,0.35); border-left: 1px solid rgba(220,0,0,0.35); }
        .c-tr { top: 18px; right: 18px; border-top: 1px solid rgba(220,0,0,0.35); border-right: 1px solid rgba(220,0,0,0.35); }
        .c-bl { bottom: 18px; left: 18px; border-bottom: 1px solid rgba(220,0,0,0.35); border-left: 1px solid rgba(220,0,0,0.35); }
        .c-br { bottom: 18px; right: 18px; border-bottom: 1px solid rgba(220,0,0,0.35); border-right: 1px solid rgba(220,0,0,0.35); }
      `}</style>

      <section
        id="home"
        ref={containerRef}
        className="relative h-screen w-full overflow-hidden flex flex-col justify-end"
        style={{ background: "#060606" }}
      >
        {/* BG image — portrait centered at top so face shows */}
        <motion.div
          className="absolute inset-[-40px] z-0"
          style={{ x: bgX, y: bgY }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/herobg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center 10%",
              filter: "brightness(0.6) contrast(1.05) saturate(0.75)",
            }}
          />
        </motion.div>

        {/* Bottom gradient — face stays clear, bottom text readable */}
        <div
          className="absolute bottom-0 left-0 right-0 z-1 pointer-events-none"
          style={{
            height: "62%",
            background:
              "linear-gradient(to top, rgba(4,0,0,0.97) 0%, rgba(4,0,0,0.9) 25%, rgba(4,0,0,0.6) 50%, transparent 100%)",
          }}
        />
        {/* Red tint layer at very bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 z-1 pointer-events-none"
          style={{
            height: "35%",
            background:
              "linear-gradient(to top, rgba(120,0,0,0.2) 0%, transparent 100%)",
          }}
        />

        <div className="hero-noise" />
        <div className="hero-scanline" />

        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}

        {/* Corner decorations */}
        <div className="corner c-tl" />
        <div className="corner c-tr" />
        <div className="corner c-bl" />
        <div className="corner c-br" />

        {/* Vertical edge lines */}
        <div
          className="absolute left-0 inset-y-0 w-px z-5 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(220,0,0,0.18) 50%, transparent 100%)",
          }}
        />
        <div
          className="absolute right-0 inset-y-0 w-px z-5 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(220,0,0,0.18) 50%, transparent 100%)",
          }}
        />

        {/* BOTTOM CONTENT */}
        <div className="relative z-10 w-full px-6 md:px-12 pb-10 flex flex-col items-start">
          {/* Badge */}
          <motion.div
            className="badge inline-flex items-center gap-2 px-4 py-2 rounded-sm mb-5"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <span className="text-xs" style={{ color: "#dc2626" }}>
              ▸
            </span>
            <span className="mono text-xs tracking-[0.3em] text-white/45 uppercase">
              {" "}
              Mobilograf{" "}
            </span>
          </motion.div>

          {/* AHMEDOV */}
          <motion.div
            initial={{ opacity: 0, y: 44, skewX: -2 }}
            animate={{ opacity: 1, y: 0, skewX: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlitchText text="AHMEDOV" />
          </motion.div>

          {/* Tagline + socials row */}
          <motion.div
            className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <p className="mono text-xs md:text-sm tracking-[0.4em] uppercase text-white/22">
              Professional{" "}
              <span style={{ color: "rgba(220,60,60,0.8)" }}>
                Mobilografiya
              </span>{" "}
              Xizmatlari
            </p>
            <div className="flex items-center gap-2">
              {socialIcons.map(({ id, Icon, href, label }, i) => (
                <motion.a
                  key={id}
                  href={href}
                  aria-label={label}
                  className="social-btn w-9 h-9 flex items-center justify-center rounded-sm text-white/30 hover:text-red-400"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.08 }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Red accent line */}
          <motion.div
            className="mt-5 h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(200,0,0,0.75) 0%, rgba(200,0,0,0.12) 55%, transparent 100%)",
              transformOrigin: "left",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 1.4, ease: "easeOut" }}
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute right-7 bottom-12 z-20 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span
            className="mono text-xs text-white/18 tracking-[0.3em]"
            style={{ writingMode: "vertical-rl" }}
          >
            SCROLL
          </span>
          <motion.div
            className="w-px h-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(220,0,0,0.6), transparent)",
              transformOrigin: "top",
            }}
            animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Page counter */}
        <motion.div
          className="absolute left-7 bottom-12 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="mono text-xs text-white/15 tracking-widest">
            01{" "}
            <span className="mx-1" style={{ color: "rgba(180,0,0,0.35)" }}>
              /
            </span>{" "}
            04
          </span>
        </motion.div>
      </section>
    </>
  );
}
