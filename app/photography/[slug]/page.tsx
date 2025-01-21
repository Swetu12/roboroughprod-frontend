'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Syne } from 'next/font/google';
import Image from 'next/image';
import Loader from '@/components/ui/Loader'; // Use this hook for client-side routing
import { motion } from 'framer-motion';
import { fetchPhotographySlugData, homeMeta, photoSlugMeta } from '@/app/api/fetchData';
import { NextSeo } from 'next-seo';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

interface SeoMetadata {
  title: string;
  meta_description: string;
  keywords: string[] | undefined;
}

const PhotoPage = () => {
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const pathname = usePathname();
  const [data, setData] = useState<any[]>([]); // Set initial state to an empty array
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [seo, setSeo] = useState<SeoMetadata | null>(null);

  useEffect(() => {
    const fetchSeoData = async () => {
      const metadata = await photoSlugMeta();
      console.log('Fetched photo slug Seo Data: ', metadata);
      setSeo(metadata);
    };

    fetchSeoData();
  }, []);

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

  if (!seo) {
    return <Loader />;
  }

  const keywords = seo.keywords && seo.keywords.length > 0 ? seo.keywords.join(', ') : 'default, keywords';

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <NextSeo
        title={seo.title || 'Default Title'}
        description={seo.meta_description || 'Default Description'}
        openGraph={{
          title: seo.title || 'Default Title',
          description: seo.meta_description || 'Default Description',
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: keywords,
          },
        ]}
      />
      <motion.h1
        variants={itemVariant}
        className={`text-black ${syne.className}  flex justify-center w-full mt-20 text-4xl font-bold`}
      >
        {service.title}
      </motion.h1>
      {service.photos.map((photo: any, index: number) => {
        // Check if the 'video' object exists and if it has the formats object with a valid URL
        const videoData = photo.video; // 'video' field inside photo
        const imageUrl = videoData?.formats?.medium?.url; // Accessing the image URL from the 'formats' object

        // If the image URL is not found, return null (skip this photo)
        if (!imageUrl) {
          return null;
        }

        return (
          <motion.div
            variants={itemVariant}
            key={index}
            className={`flex flex-col items-center w-full mt-20 space-y-4`}
          >
            <Image
              src={imageUrl} // Use the valid photo URL
              alt={service.title}
              height={1000}
              width={1000}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default PhotoPage;
