"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pin, Flag, MessageSquarePlus, Calendar, Trash2, X } from "lucide-react";
import { seasonalData } from "@/lib/seasonal-data";
import { festivals } from "@/lib/festival-data";
import styles from "./WallCalendar.module.css";

interface Props {
  monthIdx: number;
  year: number;
  notes: { [key: string]: string[] };
  onAddNote: (key: string, text: string) => void;
  onDeleteNote: (key: string, index: number) => void;
  onYearChange: (year: number) => void;
}

export const WallCalendar = ({ monthIdx, year, notes, onAddNote, onDeleteNote, onYearChange }: Props) => {
  const [selectedRange, setSelectedRange] = useState<{ start: number | null, end: number | null }>({ start: null, end: null });
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [noteInput, setNoteInput] = useState("");
  const [showMonthGrid, setShowMonthGrid] = useState(false);
  const [showYearGrid, setShowYearGrid] = useState(false);

  const data = seasonalData[monthIdx];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const isDarkBg = useMemo(() => {
    const hex = data.accent.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.6;
  }, [data.accent]);

  const scrollToMonth = (idx: number) => {
    const element = document.getElementById(`month-${idx}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
    setShowMonthGrid(false);
  };

  const handleDateClick = (day: number) => {
    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: day, end: null });
    } else {
      setSelectedRange({ start: Math.min(selectedRange.start, day), end: Math.max(selectedRange.start, day) });
    }
  };

  const addNote = () => {
    if (!noteInput.trim() || !selectedRange.start) return;
    const start = selectedRange.start;
    const end = selectedRange.end || start;
    for (let i = start; i <= end; i++) {
      onAddNote(`${year}-${monthIdx}-${i}`, noteInput);
    }
    setNoteInput("");
  };

  return (
    <div className={`${styles.calendarContainer} ${isDarkBg ? styles.themeLightText : styles.themeDarkText}`} style={{
      '--accent': data.accent, 
      '--range-hsla': `color-mix(in srgb, ${data.accent}, transparent 75%)`,
      '--tile-bg': `color-mix(in srgb, ${data.accent}, transparent 92%)`,
      '--tile-border': `color-mix(in srgb, ${data.accent}, transparent 80%)`
    } as React.CSSProperties}>
      
      <div className={styles.calendarPaper}>
        <div className={styles.paperContent}>
          <div className={styles.spiral}>
            {Array.from({ length: 14 }).map((_, i) => <div key={i} className={styles.spiralRing} />)}
          </div>

          <div className={styles.mainLayout}>
            <div className={styles.gridSection}>
              <div className={styles.calendarHeader}>
                <div className={styles.titleGroup}>
                  <h2 onClick={() => setShowMonthGrid(true)} className={styles.monthTitle}>{data.month}</h2>
                  <span onClick={() => setShowYearGrid(true)} className={styles.yearTitle}>{year}</span>
                </div>
              </div>

              <div className={styles.daysGrid}>
                {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                  <div key={`${d}-${i}`} className={styles.dayOfWeek}>{d}</div>
                ))}
                {daysInMonth.map(day => {
                  const dateKey = `${year}-${monthIdx}-${day}`;
                  const festival = festivals.find(f => f.day === day && f.month === monthIdx);
                  const hasNotes = (notes[dateKey] || []).length > 0;
                  const inRange = selectedRange.start && selectedRange.end && day >= selectedRange.start && day <= selectedRange.end;

                  return (
                    <motion.div
                      key={dateKey}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      onClick={() => handleDateClick(day)}
                      whileHover={{ scale: 1.05 }}
                      className={`
                        ${styles.dayTile} 
                        ${selectedRange.start === day ? styles.startDay : ""} 
                        ${selectedRange.end === day ? styles.endDay : ""} 
                        ${inRange && selectedRange.start !== day && selectedRange.end !== day ? styles.inRange : ""} 
                        ${day === new Date().getDate() && monthIdx === new Date().getMonth() && year === new Date().getFullYear() ? styles.isToday : ""}
                      `}
                    >
                      <span className={styles.dayNum}>{day}</span>
                      {festival && <span className={styles.festivalLabel}>{festival.name}</span>}
                      
                      <div className={styles.indicators}>
                        {hasNotes && <div className={styles.noteIndicator}>📝</div>}
                        {selectedRange.start === day && <Pin size={8} className={styles.iconPin} />}
                        {selectedRange.end === day && <Flag size={8} className={styles.iconFlag} />}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className={styles.notesSidebar}>
              <div className={styles.notesHeader}>
                <Calendar size={18} />
                <h3>Notes</h3>
              </div>
              
              <div className={styles.noteInputArea}>
                <input 
                  type="text" 
                  placeholder="Note..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addNote()}
                />
                <button onClick={addNote} disabled={!selectedRange.start}><MessageSquarePlus size={18}/></button>
              </div>

              <div className={styles.notesList}>
                {selectedRange.start && (
                  <div className={styles.selectedDayNotes}>
                    {Array.from({ length: (selectedRange.end || selectedRange.start) - selectedRange.start + 1 }).map((_, i) => {
                      const d = (selectedRange.start || 0) + i;
                      const k = `${year}-${monthIdx}-${d}`;
                      return (notes[k] || []).map((text, idx) => (
                        <div key={`${k}-${idx}`} className={styles.noteCard}>
                          <div className={styles.noteCardHeader}>
                            <span>Day {d}</span>
                            <button onClick={() => onDeleteNote(k, idx)}><Trash2 size={12}/></button>
                          </div>
                          <p>{text}</p>
                        </div>
                      ));
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showMonthGrid && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.modalOverlay}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Months</h3>
                <button onClick={() => setShowMonthGrid(false)}><X /></button>
              </div>
              <div className={styles.monthGrid}>
                {seasonalData.map((m, i) => (
                  <button key={m.month} onClick={() => scrollToMonth(i)} className={`${styles.monthBtn} ${monthIdx === i ? styles.activeMonth : ""}`}>
                    {m.month.substring(0, 3)}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showYearGrid && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.modalOverlay}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Years</h3>
                <button onClick={() => setShowYearGrid(false)}><X /></button>
              </div>
              <div className={styles.yearGrid}>
                {Array.from({ length: 36 }, (_, i) => 2000 + i).map(y => (
                  <button key={y} onClick={() => { onYearChange(y); setShowYearGrid(false); }} className={`${styles.yearBtn} ${year === y ? styles.activeYear : ""}`}>
                    {y}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
