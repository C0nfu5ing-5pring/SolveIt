import type { Metadata } from "next";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solve it",
  description: "PYQs and all",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className="min-h-full max-h-screen flex flex-col p-5 gap-5"
        suppressHydrationWarning
      >
        <Header />
        <div className="flex gap-5">
          <Sidebar />
          <div className="w-[90%] h-[85vh] border-3 ">{children}</div>
        </div>
      </body>
    </html>
  );
}
