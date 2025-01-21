'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Syne } from 'next/font/google';
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';
import { fetchVideoGalleryData, fetchVideographySlugData, homeMeta, videoSlugMeta } from '@/app/api/fetchData'; // Importing functions
import Image from 'next/image';
import { NextSeo } from 'next-seo';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

interface SeoMetadata {
  title: string;
  meta_description: string;
  keywords: string[] | undefined; // Allow for undefined keywords
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const CategoryPage = () => {
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const pathname = usePathname();
  const [data, setData] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [seo, setSeo] = useState<SeoMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeoData = async () => {
      const metadata = await videoSlugMeta();
      console.log('Fetched video slug Seo Data: ', metadata);
      setSeo(metadata);
    };

    fetchSeoData();
  }, []);

  // Fetch gallery data
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const res = await fetchVideoGalleryData(); // Fetch gallery data
        if (res && res[0]?.gallery) {
          // Assuming res is an array, check the first object for gallery
          console.log('image api response: ', res[0].gallery);
          setGallery(res[0].gallery); // Set gallery data to state
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching gallery data');
        console.error(err);
      }
    };

    fetchGalleryData();
  }, []);

  // Fetch videography data and handle slug
  useEffect(() => {
    const pathSlug = pathname?.split('/').pop();
    if (pathSlug) {
      setSlug(pathSlug);
    }

    const fetchData = async () => {
      try {
        const res = await fetchVideographySlugData(); // Fetch videography data
        setData(res); // Set videography data to state
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching videography data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname]);

  if (!seo) {
    return <Loader />;
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!slug) {
    return <div className="text-black">Invalid URL</div>;
  }

  const service = data.find((s: any) => s.slug === slug);

  if (!service) {
    return <div className="text-black">Service not found</div>;
  }

  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

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
      {/* Title */}
      <motion.h1
        variants={itemVariant}
        className={`text-black ${syne.className} flex justify-center w-full mt-20 text-4xl font-bold`}
      >
        {service.title}
      </motion.h1>
      {/* Video Section */}
      <motion.div variants={itemVariant} className="flex flex-col items-center mt-8 space-y-8">
        {service.reels.map((reel: any) => (
          <motion.div variants={itemVariant} key={reel.id} className="flex justify-center">
            <video controls width="1200" height="800">
              <source
                src={reel.video.url?.startsWith('http') ? reel.video.url : `${API_URL}${reel.video.url}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        ))}
      </motion.div>
      {/* Gallery Section */}
      <motion.div variants={itemVariant} className="mt-40 px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {gallery.length > 0 ? (
            gallery.map((imageObj: any, index: number) => (
              <div key={index}>
                <Image
                  src={
                    imageObj.image.url?.startsWith('http')
                      ? imageObj.image.url
                      : `http://localhost:1337${imageObj.image.url}`
                  }
                  alt={imageObj.image.name || 'Gallery Image'}
                  width={2000}
                  height={800}
                />
              </div>
            ))
          ) : (
            <div>No images available</div> // Fallback when no gallery data is present
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CategoryPage;
