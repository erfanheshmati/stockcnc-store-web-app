import { ReactNode } from "react";
import { API_URL } from "@/lib/constants";
import React, { createContext, useContext, useEffect, useState } from "react";

function hexToHSL(hex: string) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(
    1
  )}%`;
}

const ColorsContext = createContext({
  primary: "207 99% 33%",
  secondary: "216 22% 42%",
  accent: "145, 100%, 42%",
});

export const ColorsProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColors] = useState({
    primary: "207 99% 33%",
    secondary: "216 22% 42%",
    accent: "145, 100%, 42%",
  });

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await fetch(`${API_URL}/web-text-plans`);
        const colorsData = await res.json();

        // Convert HEX to HSL if needed
        const primaryHSL = hexToHSL(colorsData.colorPrimary);
        const secondaryHSL = hexToHSL(colorsData.colorSecond);
        const accentHSL = hexToHSL(colorsData.colorAccent);

        setColors({
          primary: primaryHSL,
          secondary: secondaryHSL,
          accent: accentHSL,
        });

        // Update CSS variables
        document.documentElement.style.setProperty("--primary", primaryHSL);
        document.documentElement.style.setProperty("--secondary", secondaryHSL);
        document.documentElement.style.setProperty("--accent", accentHSL);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
  }, []);

  return (
    <ColorsContext.Provider value={colors}>{children}</ColorsContext.Provider>
  );
};

export const useColors = () => useContext(ColorsContext);
