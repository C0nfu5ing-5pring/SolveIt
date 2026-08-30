import type { Metadata } from "next";
import Header from "../components/Header.jsx";
import "./globals.css";
import { ToastContainer, Slide } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";

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
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col p-5 gap-5 overflow-x-hidden overflow-y-auto"
        suppressHydrationWarning
      >
        <svg
          className="sketch-filter-svg hidden"
          aria-hidden="true"
          focusable="false"
        >
          <filter
            id="sketch-filter"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05"
              numOctaves="3"
              result="noise"
            />

            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </svg>

        <Header />
        {children}

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop
          draggable
          pauseOnHover
          transition={Slide}
          style={{
            top: "20px",
            right: "20px",
          }}
          toastClassName={
            "bg-white! border-2! border-black! rounded-xl! shadow-none! text-black! sketchy-border"
          }
        />
        <Analytics />
      </body>
    </html>
  );
}
