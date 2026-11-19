import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "UNIQUE | Luxury Event Management",
  description: "Exquisite, elegant and professional event management services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Navbar></Navbar>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
