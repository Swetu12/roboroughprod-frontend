'use client';

import React, { useEffect, useState } from 'react';
import Service from '@/components/ui/Service';
import { Syne } from 'next/font/google';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BounceLoader, ClipLoader, ScaleLoader } from 'react-spinners';
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';

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

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1337/api/photographies?populate%5Bservices%5D%5Bpopulate%5D%5Bimage%5D=true'
        );
        setData(res.data.data[0]);
      } catch (error) {
        setError('Failed to fetch data. Please try again later');
        console.log(error);
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

  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div variants={containerVariant} initial="hidden" animate="visible" viewport={{ once: false, amount: 0.2 }}>
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
              image={`http://localhost:1337${service.image.url}`}
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
