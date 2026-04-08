"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isActive: boolean;
  accent: string;
  isInitial?: boolean;
}

export const CinematicVortex = ({ isActive, accent, isInitial = false }: Props) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Backdrop Shadow Surge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: isInitial ? 1 : 0.6 }}
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
            }}
          />

          {/* Core Fractal Spiral (Higher Visibility) */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0.3, 5],
              rotate: [0, 360],
            }}
            transition={{ 
              duration: isInitial ? 1.2 : 0.7, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              background: `conic-gradient(from 0deg, transparent, ${accent}, transparent, white, transparent)`,
              maskImage: 'radial-gradient(circle, black 10%, transparent 60%)',
              WebkitMaskImage: 'radial-gradient(circle, black 10%, transparent 60%)',
              filter: "blur(15px)",
              opacity: 0.9
            }}
          />

          {/* Shockwave Expansion */}
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 10, opacity: 0 }}
            transition={{ duration: isInitial ? 1.2 : 0.7, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "200px",
              height: "200px",
              border: `4px solid ${accent}`,
              borderRadius: "50%",
              boxShadow: `0 0 50px ${accent}`,
            }}
          />

          {/* Focal Distortion Expansion */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 4 }}
            transition={{ duration: isInitial ? 1.2 : 0.7 }}
            style={{
              width: "100vw",
              height: "100vh",
              background: `radial-gradient(circle at center, transparent, #000 80%)`,
              zIndex: 10
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
