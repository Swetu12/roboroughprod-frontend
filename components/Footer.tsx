'use client';

import React, { useEffect, useState } from 'react';
import { Syne } from 'next/font/google';
import TailwindButton from '@/components/ui/TailwindButton';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';
import { fetchFooterData } from '@/app/api/fetchData';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

// Updated HomepageData type to reflect footer as an object
type HomepageData = {
  footer: {
    available: string;
    title: string;
    copyright: string;
    cta: {
      text: string;
      url: string;
    };
  };
};

const socialMedia = [
  {
    id: 1,
    img: '/insta.svg',
    link: 'https://www.instagram.com/robo_roughprod/',
  },
];

const Footer = () => {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const footerData = await fetchFooterData();
        setData(footerData); // This should now contain the full data, including footer
      } catch (error) {
        setError('Failed to fetch footer data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const defaultFooter = {
    available: 'Currently unavailable',
    title: 'Default Title',
    copyright: '© 2024 Default Copyright',
    cta: { text: 'Default Button', url: '/' },
  };

  const footerData = data?.footer || defaultFooter;

  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className={`pb-32 flex flex-col items-center justify-center`}
    >
      {loading && <Loader />}
      {error && <div>{error}</div>}

      {!loading && !error && (
        <motion.div id="contact" variants={itemVariant} className="text-center space-y-6 mt-40">
          {/* Social Media Icons */}
          <motion.div variants={itemVariant} className="flex items-center justify-center mt-5 gap-4">
            {socialMedia.map((profile) => (
              <motion.div
                variants={itemVariant}
                key={profile.id}
                className="w-10 h-10 cursor-pointer bg-[#FFFCF2] flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
              >
                <Link href={profile.link} key={profile.id} passHref>
                  <Image src={profile.img} alt="social-media-icon" width={20} height={20} className={`filter invert`} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Available Section */}
          <motion.div variants={itemVariant} className="flex items-center justify-center">
            <span className="w-3 h-3 mr-3 bg-green-500 rounded-full"></span>
            <p className={`text-gray-600 text-sm`}>{footerData.available}</p>
          </motion.div>

          {/* Title Section */}
          <motion.p
            variants={itemVariant}
            className={`text-black ${syne.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl lg:mx-52 mx-6`}
          >
            {footerData.title}
          </motion.p>

          {/* Button Section */}
          <motion.div variants={itemVariant}>
            <div
              onClick={() => {
                const targetSection = document.querySelector(footerData.cta.url);
                if (targetSection) {
                  targetSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <TailwindButton text={footerData.cta.text} />
            </div>
          </motion.div>

          {/* Copyright Section */}
          <motion.div variants={itemVariant} className={`space-y-2`}>
            <p className={`text-black mt-32 text-sm sm:text-base`}>{footerData.copyright}</p>
            <p className={`text-gray-500 mt-32`}>
              CO-Founder of{' '}
              <Link href="https://www.rolleenagency.com/" className={`hover:underline text-sm sm:text-base`}>
                rolleenagency.com
              </Link>
            </p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Footer;
