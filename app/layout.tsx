import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import React, { Suspense } from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ErrorBoundary
          fallback={
            <div className="text-red-500">Algo falló en el layout.</div>
          }
        >
          <Suspense fallback={<p>Cargando...</p>}>
            <Providers
              themeProps={{ attribute: "class", defaultTheme: "dark" }}
            >
              {children}
            </Providers>
          </Suspense>
        </ErrorBoundary>
      </body>
    </html>
  );
}
