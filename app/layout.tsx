import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "next-themes"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import React from "react"

import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://pkmn-tools.vphoebe.dev"),
  openGraph: {
    images: "/opengraph-image.png",
  },
}

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
})
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plex-mono",
})

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`dark ${plexSans.variable} ${plexMono.variable} h-dvh bg-blue-100/30 font-sans transition-colors dark:bg-zinc-900`}
    >
      <body className="h-full">
        <ThemeProvider attribute="class">
          <NuqsAdapter>{children}</NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  )
}
