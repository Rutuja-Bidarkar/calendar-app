"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";

export const SeasonalEffects = ({ effect }: { effect: string }) => {
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (effect === "snow") {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const skew = 1;

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const frame = () => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return;

        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: Math.max(200, 500 * (timeLeft / duration)),
          origin: {
            x: Math.random(),
            y: (Math.random() * skew) - 0.2
          },
          colors: ['#ffffff'],
          shapes: ['circle'],
          gravity: randomInRange(0.4, 0.6),
          scalar: randomInRange(0.4, 1),
          drift: randomInRange(-0.4, 0.4)
        });

        requestAnimationFrame(frame);
      };
      frame();
    } else if (effect === "flowers") {
      const end = Date.now() + 5 * 1000;
      const colors = ['#ffb7c5', '#ff94a2', '#fce1e4'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    } else if (effect === "leaves") {
      const end = Date.now() + 5 * 1000;
      const colors = ['#d35400', '#e67e22', '#f1c40f'];

      (function frame() {
        confetti({
          particleCount: 1,
          angle: 90,
          spread: 120,
          origin: { y: -0.2 },
          colors: colors,
          velocity: 2,
          gravity: 0.8
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }

    return () => clearInterval(interval);
  }, [effect]);

  return <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }} />;
};
