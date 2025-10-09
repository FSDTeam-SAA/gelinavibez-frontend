
import "./globals.css";
import { Lato, Playfair_Display_SC, Poppins } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-lato",
});

const playfair = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Your App",
  description: "Next.js 14 App with custom fonts",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${playfair.variable} ${poppins.variable}`}
    >
      <body className={lato.className}>{children}</body>
    </html>
  );
}
