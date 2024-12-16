'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Syne } from 'next/font/google';
import Image from 'next/image';
import axios from 'axios';
import Loader from '@/components/ui/Loader'; // Use this hook for client-side routing
import { motion } from 'framer-motion';
import { fetchPhotographySlugData } from '@/app/api/fetchData';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const PhotoPage = () => {
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
        const res = await fetchPhotographySlugData();
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

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
      {service.photos.map((photo: any, index: number) => (
        <motion.div variants={itemVariant} key={index} className={`flex flex-col items-center w-full mt-20 space-y-4`}>
          <Image
            src={`${API_URL}${photo.video.url}`} // Corrected to use video URL for images
            alt={service.title}
            height={1000}
            width={1000}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PhotoPage;
