'use client';

import React, { useState, useEffect } from 'react';
import { GoArrowDownRight } from 'react-icons/go';
import Service from '@/components/ui/Service';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';
import { fetchServicesData } from '@/app/api/fetchData';

// Define the structure of the service data
interface ServiceType {
  id: string;
  title: string;
  description: string;
  image: {
    url: string;
  };
  // Add any other properties you expect in the service
}

const Services = () => {
  const router = useRouter();
  const [servicesData, setServicesData] = useState<ServiceType[]>([]); // Specify the type
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  const fetchData = async () => {
    try {
      setLoading(true);
      const services = await fetchServicesData();
      setServicesData(services); // Assuming the fetched data matches ServiceType[]
      setError(null);
    } catch (error) {
      setError('Failed to fetch services.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
            servicesData.map((service) => {
              // Handle image URL concatenation, ensuring it's properly formed
              const imageUrl = service.image?.url ? `${service.image.url}` : '/default-image.jpg';

              return (
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
                    image={imageUrl} // Using the concatenated or default image URL
                    title={service.title}
                    description={service.description}
                  />
                </motion.div>
              );
            })
          ) : (
            <p>No services found.</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Services;
