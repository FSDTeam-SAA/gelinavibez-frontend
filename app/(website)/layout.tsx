
import { Navbar } from "@/components/web/Navbar";
import "../globals.css";
import { Footer } from "@/components/web/Footer";
import ModalDisclaimer from "@/components/web/ModalDisclaimer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Navbar />
         <ModalDisclaimer /> 
        {children}
       <Footer />
        </body>
    </html>
  );
}
