import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "./(components)/structure/Header";
import Footer from "./(components)/structure/Footer";

import { Toaster } from "sonner";

const configuration = require("../app/configuration");
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: configuration.name,
  description: configuration.description,
  icons: configuration.icons,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={"flex h-screen flex-col justify-between " + inter.className}
      >
        <Header />
        <section className="mb-auto pb-2 pt-2">{children}</section>
        <Toaster position="bottom-right" richColors closeButton />
        <Footer />
      </body>
    </html>
  );
}
