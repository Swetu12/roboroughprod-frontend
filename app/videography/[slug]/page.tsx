'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Syne } from 'next/font/google';
import axios from 'axios';
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';
import { fetchVideographySlugData } from '@/app/api/fetchData';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CategoryPage = () => {
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const pathname = usePathname();
  const [data, setData] = useState<any[]>([]); // Set initial state to an empty array
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract slug from the pathname
    const pathSlug = pathname?.split('/').pop();
    if (pathSlug) {
      setSlug(pathSlug);
    }

    const fetchData = async () => {
      try {
        const res = await fetchVideographySlugData();
        setData(res);
      } catch (error) {
        setError('Error fetching data. Please try again later');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pathname]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!slug) {
    return <div className={`text-black`}>Invalid URL</div>;
  }

  const service = data.find((s: any) => s.slug === slug);

  if (!service) {
    return <div className={`text-black`}>Service not found</div>;
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
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h1
        variants={itemVariant}
        className={`text-black ${syne.className}  flex justify-center w-full mt-20 text-4xl font-bold`}
      >
        {service.title}
      </motion.h1>

      <motion.div variants={itemVariant} className="flex flex-col items-center mt-8 space-y-8">
        {service.reels.map((reel: any, index: number) => (
          <motion.div variants={itemVariant} key={reel.id} className="flex justify-center">
            <video controls width="1200" height="800">
              <source src={`${API_URL}${reel.video.url}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CategoryPage;
