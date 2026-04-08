"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import styles from "./HeroParallax.module.css";
import { seasonalData } from "@/lib/seasonal-data";

export const HeroParallax = ({ currentMonthIdx }: { currentMonthIdx: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = seasonalData[currentMonthIdx];

  // Mouse Parallax Effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 50,
        y: (e.clientY / window.innerHeight - 0.5) * 50,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const springX = useSpring(mousePos.x, { stiffness: 50, damping: 30 });
  const springY = useSpring(mousePos.y, { stiffness: 50, damping: 30 });

  return (
    <section ref={containerRef} className={styles.hero}>
      {/* Background Image Layer */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentMonthIdx}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className={styles.backgroundImage}
          style={{ 
            backgroundImage: `url(${data.image})`,
            x: springX,
            y: springY
          }}
        />
      </AnimatePresence>

      {/* Glassy Sun Glow */}
      <div className={styles.sunGlow} />

      {/* LIGHT Overlay for contrast protection but clear visibility */}
      <div className={styles.overlay} />
    </section>
  );
};
