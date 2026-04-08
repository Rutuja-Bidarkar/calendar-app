"use client";

import { useEffect } from "react";

export const useThemeObserver = () => {
  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      const isNight = hour < 6 || hour > 18;
      document.documentElement.setAttribute("data-theme", isNight ? "dark" : "light");
      
      const themeColor = isNight ? "hsl(230, 20%, 15%)" : "hsl(35, 100%, 98%)";
      document.documentElement.style.setProperty("--background-morning", themeColor);
    };

    updateTheme();
    const interval = setInterval(updateTheme, 1000 * 60 * 15); // Check every 15 mins
    return () => clearInterval(interval);
  }, []);
};
