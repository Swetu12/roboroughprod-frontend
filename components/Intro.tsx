'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Syne } from 'next/font/google';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const Intro = () => {
  return (
    <AnimatePresence>
      <motion.div
        className="w-full h-screen flex items-center justify-center bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        key="intro"
      >
        <motion.h1
          className={`md:text-4xl text-xl font-bold text-black ${syne.className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          ROBOTTOPRODUCTION
        </motion.h1>
      </motion.div>
    </AnimatePresence>
  );
};

export default Intro;
