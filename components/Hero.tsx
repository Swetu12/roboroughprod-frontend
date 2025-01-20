'use client';

import React, { useEffect, useState } from 'react';
import { Syne } from 'next/font/google';
import ExperienceBadge from '@/components/ui/ExperienceBadge';
import TailwindButton from '@/components/ui/TailwindButton';
import Clients from '@/components/ui/Clients';
import axios from 'axios';
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';
import { fetchHeroData } from '@/app/api/fetchData';
import ContactUs from '@/components/ui/ContactUs';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

interface Badge {
  name: string;
  image: string; // Holds the URL string
}

interface HeroData {
  title: string;
  cta: {
    text: string;
    url: string;
  };
  badge: Badge[];
  clientLogos: string[];
}

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [showContactUs, setShowContactUs] = useState(false); // State to toggle ContactUs visibility

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchHeroData();
        setHeroData(data);
      } catch (error) {
        console.error('Error fetching data.', error);
      }
    };

    fetchData();
  }, []);

  if (!heroData) {
    return <Loader />;
  }

  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`relative`}
      >
        <motion.div
          variants={itemVariant}
          className={`inline-flex gap-4 justify-center -mt-10 w-full absolute overflow-x-hidden`}
        >
          {heroData.badge.map((badge, index) => (
            <ExperienceBadge software={badge.name} image={badge.image} key={index} />
          ))}
        </motion.div>
        <motion.div variants={itemVariant}>
          <p
            className={`text-black ${syne.className} text-4xl sm:text-5xl lg:mx-96 md:mx-20 md:text-6xl lg:text-7xl mx-10 text-center mt-60`}
          >
            {heroData.title}
          </p>
        </motion.div>
        <motion.div variants={itemVariant} className={`flex justify-center mt-16`}>
          <div
            onClick={() => {
              // Toggle the ContactUs component visibility
              setShowContactUs((prev) => !prev);
            }}
          >
            <TailwindButton text={heroData.cta.text} />
          </div>
        </motion.div>
        <motion.div variants={itemVariant}>
          <Clients />
          {showContactUs && <ContactUs />} {/* Show ContactUs component when state is true */}
        </motion.div>
      </motion.div>
    </>
  );
};
export default Hero;
