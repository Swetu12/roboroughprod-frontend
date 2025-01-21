'use client';

import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Intro from '@/components/Intro';
import { DefaultSeo, NextSeo } from 'next-seo';
import defaultSEO from '@/next-seo.config';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showIntro, setShowIntro] = useState(true);

  // Set a timer to hide the intro after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); // 10 seconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>RoboroughProd</title>
        <link rel="icon" href="/frontend/app/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}>
        <DefaultSeo {...defaultSEO} />
        {/* Conditionally render the Navbar and Footer */}
        {!showIntro && <Navbar />}

        {/* Render the intro animation or content based on showIntro */}
        {showIntro ? (
          <Intro />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {children}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Conditionally render the Footer */}
        {!showIntro && <Footer />}
      </body>
    </html>
  );
}
