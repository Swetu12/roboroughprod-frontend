'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Syne } from 'next/font/google';
import Review from '@/components/ui/Review';
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

type HomepageData = {
  clients: {
    title: string;
    card: {
      image: { url: string } | null;
      name: string;
      description: string;
      review: string;
    }[];
  }[];
};

const Reviews = () => {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:1337/api/homepages?populate%5Bclients%5D%5Bpopulate%5D%5Bcard%5D%5Bpopulate%5D%5Bimage%5D=true'
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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
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
      className={`min-h-full bg-gradient-to-b from-pink-100 to-[#FAD4C0] pb-10`}
    >
      <motion.div id="clients" variants={itemVariant}>
        <p className={`flex justify-center text-black ${syne.className} text-3xl md:text-4xl lg:text-5xl pt-14`}>
          {data?.clients[0]?.title}
        </p>
      </motion.div>
      <motion.div variants={itemVariant} className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        {data?.clients[0]?.card.map((review, index) => (
          <Review
            key={index}
            image={review.image ? `http://localhost:1337${review.image.url}` : '/default-image.jpg'}
            body={review.review}
            name={review.name}
            role={review.description}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Reviews;
