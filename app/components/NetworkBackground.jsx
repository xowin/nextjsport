"use client";
import { useEffect, useRef } from "react";

const LINK_DIST = 165;
const MOUSE_DIST = 170;
const PUSH_DIST = 90;

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let nodes = [];
    let packets = [];
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const rand = (a, b) => a + Math.random() * (b - a);

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeNodes = () => {
      const count = Math.round(Math.min(90, Math.max(30, (w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.18, 0.18),
        vy: rand(-0.18, 0.18),
        r: rand(1.1, 2.2),
      }));
      packets = [];
    };

    const draw = (animate) => {
      ctx.clearRect(0, 0, w, h);

      if (animate) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < PUSH_DIST && d > 0.01) {
            const push = (1 - d / PUSH_DIST) * 0.9;
            n.x += (dx / d) * push;
            n.y += (dy / d) * push;
          }
          if (n.x < -10) n.x = w + 10;
          if (n.x > w + 10) n.x = -10;
          if (n.y < -10) n.y = h + 10;
          if (n.y > h + 10) n.y = -10;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(120,170,230,${(1 - d / LINK_DIST) * 0.34})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const near = d < MOUSE_DIST;
        if (near) {
          ctx.strokeStyle = `rgba(255,181,71,${(1 - d / MOUSE_DIST) * 0.7})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
        ctx.fillStyle = near ? "rgba(255,181,71,0.85)" : "rgba(160,190,235,0.65)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!animate) return;

      if (packets.length < 3 && Math.random() < 0.012) {
        const a = nodes[Math.floor(Math.random() * nodes.length)];
        const b = nodes.find((n) => n !== a && Math.hypot(n.x - a.x, n.y - a.y) < LINK_DIST);
        if (b) packets.push({ a, b, t: 0 });
      }
      packets = packets.filter((p) => p.t < 1);
      for (const p of packets) {
        p.t += 0.02;
        const x = p.a.x + (p.b.x - p.a.x) * p.t;
        const y = p.a.y + (p.b.y - p.a.y) * p.t;
        ctx.fillStyle = "rgba(255,181,71,0.25)";
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,181,71,0.95)";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && !reduceMotion) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    sizeCanvas();
    makeNodes();
    if (reduceMotion) draw(false);
    else start();

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    let lastW = w;
    const onResize = () => {
      sizeCanvas();
      // Mobile browsers resize on scroll (address bar); only rebuild on width change.
      if (window.innerWidth !== lastW) {
        lastW = window.innerWidth;
        makeNodes();
      }
      if (reduceMotion) draw(false);
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
};

export default NetworkBackground;
