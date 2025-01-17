import React, { useEffect, useState } from 'react';
import { GoArrowDownRight } from 'react-icons/go';
import Image from 'next/image';
import { Syne } from 'next/font/google';
import Skill from '@/components/ui/Skill';
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';
import { fetchAboutData } from '@/app/api/fetchData';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

type HomepageData = {
  about: {
    about: string;
    title: string;
    description: string;
    pfp: { url: string } | null;
    experience: {
      title: string;
      card: {
        image: { url: string };
        jobtitle: string;
        period: string;
      }[];
    }[];
  };
};

const About = () => {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAboutData();
        setData(res);
      } catch (err) {
        setError('Failed to fetch data. Please try again later');
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

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
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`pb-20`}
    >
      <motion.div id="about" variants={itemVariant} className={`mx-6 md:mx-14 lg:mx-32`}>
        {/* About Title */}
        <p className={`text-black inline-flex font-semibold`}>
          {data?.about.about} <GoArrowDownRight className={`ml-1 mt-1`} />
        </p>
      </motion.div>

      <motion.div
        variants={itemVariant}
        className={`block lg:flex lg:items-start lg:space-x-10 mx-6 md:mx-14 lg:mx-32 mt-10`}
      >
        {/* Left Section: Profile Picture */}
        <motion.div variants={itemVariant} className={`w-full lg:flex-[1] flex justify-center lg:justify-start`}>
          {data?.about.pfp ? (
            <Image
              src={
                data.about.pfp.url?.startsWith('http')
                  ? data.about.pfp.url
                  : `http://localhost:1337${data.about.pfp.url}`
              }
              alt="Profile Picture"
              width={1800}
              height={552}
              className={`rounded-3xl w-full lg:w-auto object-cover`}
            />
          ) : (
            <div className="bg-gray-300 h-52 w-full lg:w-auto rounded-3xl">No Image Available</div>
          )}
        </motion.div>

        {/* Right Section: Content */}
        <motion.div variants={itemVariant} className={`mt-5 lg:mt-0 lg:flex-[2]`}>
          <motion.div className={`space-y-5`}>
            <p className={`${syne.className} text-[#393535] text-3xl md:text-4xl font-bold`}>{data?.about.title}</p>
            <p className={`text-[#393535] text-base md:text-lg break-words lg:w-[1100px] w-[400px] md:w-[800px]`}>
              {data?.about.description}
            </p>
          </motion.div>

          {/* Experience Section */}
          {data?.about.experience.map((expGroup, groupIndex) => (
            <motion.div key={groupIndex} variants={itemVariant} className={`mt-10`}>
              <p className={`text-[#393535] text-lg font-semibold`}>{expGroup.title}</p>
              <motion.div variants={itemVariant} className={`mt-5 space-y-5`}>
                {expGroup.card.map((exp, index) => {
                  const experienceImageUrl = exp.image.url?.startsWith('http')
                    ? exp.image.url
                    : `http://localhost:1337${exp.image.url}`;
                  return <Skill key={index} image={experienceImageUrl} skill={exp.jobtitle} date={exp.period} />;
                })}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
