'use client';

import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Reviews from '@/components/Reviews';
import { useEffect, useState } from 'react';
import Intro from '@/components/Intro';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Reviews />
    </>
  );
}
