
import { Navbar } from "@/components/web/Navbar";
import "../globals.css";
import { Footer } from "@/components/web/Footer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Navbar />
        {children}
       <Footer />
        </body>
    </html>
  );
}
