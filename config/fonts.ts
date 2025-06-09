import {
  DM_Mono as FontMono,
  Inter as FontSans,
  Montserrat as FontHeader,
  Merriweather as FontSerif,
} from "next/font/google";

export const fontHeader = FontHeader({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-header",
});

export const fontSerif = FontSerif({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  fallback: ["monospace"],
  variable: "--font-mono",
});
