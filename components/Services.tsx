'use client';

import React, { useState, useEffect } from 'react';
import { GoArrowDownRight } from 'react-icons/go';
import Service from '@/components/ui/Service';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';

const Services = () => {
  const router = useRouter();
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  const fetchServices = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        'http://localhost:1337/api/homepages?populate[services][populate][service][populate]=image'
      );

      const homepage = response.data?.data?.[0];

      if (homepage && homepage.services && homepage.services.service) {
        setServicesData(homepage.services.service);
        setError(null); // Clear any previous errors if data is fetched successfully
      } else {
        throw new Error('No services found in the response');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to fetch services. Please try again later.'); // Set error message
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleRedirect = (url: string) => {
    router.push(`/${url}`);
  };

  const containerVariant = {
    hidden: { opacity: 0, y: 10 }, // Minimal offset to ensure elements aren't out of view
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      className={`mt-36 pb-20`}
    >
      <motion.div id="work" variants={itemVariant} className={`mx-6 md:mx-14 lg:mx-32`}>
        <p className={`text-black inline-flex font-semibold`}>
          Services I Offer <GoArrowDownRight className={`ml-1 mt-1`} />
        </p>
      </motion.div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-center mt-8 text-red-600">{error}</div>
      ) : (
        <motion.div variants={itemVariant} className={`flex flex-wrap justify-center mt-6`}>
          {servicesData.length > 0 ? (
            servicesData.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{
                  scale: 1.05, // Scale up on hover
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 1, rotate: 1 }}
              >
                <Service
                  onClick={() => handleRedirect(service.title.toLowerCase())}
                  image={`http://localhost:1337${service.image?.url}`}
                  title={service.title}
                  description={service.description}
                />
              </motion.div>
            ))
          ) : (
            <p>No services found.</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Services;
