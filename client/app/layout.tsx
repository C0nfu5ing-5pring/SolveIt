import type { Metadata } from "next";
import Header from "../components/Header.jsx";
import "./globals.css";
import { ToastContainer, Slide } from "react-toastify";

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
        className="h-screen overflow-hidden flex flex-col p-5 gap-5"
        suppressHydrationWarning
      >
        <Header />
        {children}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
          toastStyle={{
            background: "#1a1a1a",
            borderRadius: "12px",
            padding: "12px 12px",
          }}
        />
      </body>
    </html>
  );
}
