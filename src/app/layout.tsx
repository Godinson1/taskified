"use client";

import { ToastContainer } from "react-toastify";
import { ContextProvider } from "@/contexts/ContextProvider";
import { AuthProvider } from "./hooks/useAuth";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          <ContextProvider>{children}</ContextProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
