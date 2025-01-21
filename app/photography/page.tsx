'use client';

import React, { useEffect, useState } from 'react';
import Service from '@/components/ui/Service';
import { Syne } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';
import { fetchPhotographyData, homeMeta, photoMeta } from '@/app/api/fetchData';
import { NextSeo } from 'next-seo';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

type HomepageData = {
  title: string;
  services: {
    title: string;
    description: string;
    image: { url: string };
    slug: string;
  }[];
};

interface SeoMetadata {
  title: string;
  meta_description: string;
  keywords: string[] | undefined; // Allow for undefined keywords
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seo, setSeo] = useState<SeoMetadata | null>(null);

  useEffect(() => {
    const fetchSeoData = async () => {
      const metadata = await photoMeta();
      console.log('Fetched photo Seo Data: ', metadata);
      setSeo(metadata);
    };

    fetchSeoData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchPhotographyData();
        setData(res);
      } catch (error) {
        setError('Failed to fetch data. Please try again later');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRedirect = (slug: string) => {
    router.push(`/photography/${slug}`);
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  if (!seo) {
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

  const keywords = seo.keywords && seo.keywords.length > 0 ? seo.keywords.join(', ') : 'default, keywords';

  return (
    <motion.div variants={containerVariant} initial="hidden" animate="visible" viewport={{ once: false, amount: 0.2 }}>
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
      <motion.div variants={itemVariant} className={`flex justify-center w-full mt-20 text-4xl font-bold`}>
        <p className={`${syne.className} text-black`}>{data?.title}</p>
      </motion.div>
      <motion.div variants={itemVariant} className="services-list">
        {data?.services.map((service) => (
          <motion.div
            key={service.slug}
            whileHover={{
              scale: 1.05, // Scale up on hover
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 1, rotate: 1 }}
          >
            <Service
              onClick={() => handleRedirect(service.slug)}
              image={service.image.url?.startsWith('http') ? service.image.url : `${API_URL}${service.image.url}`}
              title={service.title}
              description={service.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Page;
