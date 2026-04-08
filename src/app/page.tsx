"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { WallCalendar } from "@/components/WallCalendar";
import { seasonalData } from "@/lib/seasonal-data";
import { useThemeObserver } from "@/hooks/useThemeObserver";
import { CinematicVortex } from "@/components/CinematicVortex";
import styles from "./page.module.css";
import throttle from "lodash/throttle";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMonthIdx, setActiveMonthIdx] = useState(new Date().getMonth());
  const [notes, setNotes] = useState<{ [key: string]: string[] }>({});
  const [year, setYear] = useState(new Date().getFullYear());
  
  const [isVortexing, setIsVortexing] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useThemeObserver();

  // Load notes
  useEffect(() => {
    const saved = localStorage.getItem("aura-calendar-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  // Sync notes
  useEffect(() => {
    localStorage.setItem("aura-calendar-notes", JSON.stringify(notes));
  }, [notes]);

  // Snappy Initial Vortex Sequence
  useEffect(() => {
    const startInitialSequence = async () => {
      setIsVortexing(true);
      const currentMonth = new Date().getMonth();
      
      // Mid-point reveal
      await new Promise(r => setTimeout(r, 600));
      
      if (containerRef.current) {
        containerRef.current.scrollTop = currentMonth * window.innerHeight;
        setActiveMonthIdx(currentMonth);
      }
      
      await new Promise(r => setTimeout(r, 600));
      setIsVortexing(false);
      setIsInitialLoad(false);
      setIsReady(true);
    };

    startInitialSequence();
  }, []);

  // Faster Scroll Transition
  const transitionToMonth = useCallback(async (dir: number) => {
    if (isVortexing) return;
    
    setIsVortexing(true);
    const nextIdx = (activeMonthIdx + dir + 12) % 12;
    
    // Vortex mid-point reveal (approx 0.35s for a 0.7s total)
    await new Promise(r => setTimeout(r, 350));
    
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: nextIdx * window.innerHeight,
        behavior: "instant"
      });
      setActiveMonthIdx(nextIdx);
    }
    
    await new Promise(r => setTimeout(r, 350));
    setIsVortexing(false);
  }, [activeMonthIdx, isVortexing]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isVortexing) return;
      if (Math.abs(e.deltaY) < 30) return;
      
      if (e.deltaY > 0) throttledTransition(1);
      else throttledTransition(-1);
    };

    const throttledTransition = throttle((dir) => transitionToMonth(dir), 800, { trailing: false });

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [transitionToMonth, isVortexing]);

  const addNote = (dateKey: string, text: string) => {
    setNotes(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), text]
    }));
  };

  const deleteNote = (dateKey: string, index: number) => {
    setNotes(prev => {
      const updated = [...(prev[dateKey] || [])];
      updated.splice(index, 1);
      const newNotes = { ...prev, [dateKey]: updated };
      if (updated.length === 0) delete newNotes[dateKey];
      return newNotes;
    });
  };

  return (
    <main 
      ref={containerRef} 
      className={styles.scrollContainer}
      style={{ overflow: "hidden" }}
    >
      <CinematicVortex 
        isActive={isVortexing} 
        accent={seasonalData[activeMonthIdx].accent} 
        isInitial={isInitialLoad}
      />

      <div style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        {seasonalData.map((data, idx) => {
          const isNear = Math.abs(idx - activeMonthIdx) <= 1 || 
                        (activeMonthIdx === 0 && idx === 11) || 
                        (activeMonthIdx === 11 && idx === 0);

          return (
            <section key={idx} id={`month-${idx}`} className={styles.monthSection}>
              <div 
                className={styles.backgroundLayer} 
                style={{ 
                  backgroundImage: `url(${data.image})`,
                  opacity: activeMonthIdx === idx ? 1 : 0.2,
                  transform: isVortexing ? "scale(1.1) blur(10px)" : "scale(1)",
                  transition: "transform 0.5s ease-in-out, filter 0.5s"
                }} 
              />
              
              <div 
                className={styles.contentLayer}
                style={{
                  transform: isVortexing ? "scale(0.8) opacity(0)" : "scale(1) opacity(1)",
                  transition: "transform 0.7s ease-in-out, opacity 0.5s"
                }}
              >
                {isNear && (
                  <WallCalendar 
                    monthIdx={idx} 
                    year={year}
                    notes={notes}
                    onAddNote={addNote}
                    onDeleteNote={deleteNote}
                    onYearChange={setYear}
                  />
                )}
              </div>
            </section>
          );
        })}
      </div>

      <div className={styles.grainOverlay} />
    </main>
  );
}
