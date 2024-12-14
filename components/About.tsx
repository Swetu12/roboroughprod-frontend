import React, { useEffect, useState } from 'react';
import { GoArrowDownRight } from 'react-icons/go';
import Image from 'next/image';
import { Syne } from 'next/font/google';
import Skill from '@/components/ui/Skill';
import axios from 'axios';
import Loader from '@/components/ui/Loader';
import { motion } from 'framer-motion';

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
        const res = await axios.get(
          'http://localhost:1337/api/homepages?populate%5Babout%5D%5Bpopulate%5D%5Bpfp%5D=true&populate%5Babout%5D%5Bpopulate%5D%5Bexperience%5D%5Bpopulate%5D%5Bcard%5D%5Bpopulate%5D%5Bimage%5D=true'
        );
        setData(res.data.data[0]);
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
              src={`http://localhost:1337${data.about.pfp.url}`}
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
            <p className={`text-[#393535] text-base md:text-lg`}>{data?.about.description}</p>
          </motion.div>

          {/* Experience Section */}
          <motion.div variants={itemVariant} className={`mt-10`}>
            <p className={`text-[#393535] text-lg font-semibold`}>{data?.about.experience[0].title}</p>
            <motion.div variants={itemVariant} className={`mt-5 space-y-5`}>
              {data?.about.experience[0].card.map((exp, index) => (
                <Skill
                  key={index}
                  image={`http://localhost:1337${exp.image.url}`}
                  skill={exp.jobtitle}
                  date={exp.period}
                />
              ))}
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariant} className={`mt-10`}>
            <p className={`text-[#393535] text-lg font-semibold`}>{data?.about.experience[1].title}</p>
            <motion.div variants={itemVariant} className={`mt-5 space-y-5`}>
              {data?.about.experience[1].card.map((exp, index) => (
                <Skill
                  key={index}
                  image={`http://localhost:1337${exp.image.url}`}
                  skill={exp.jobtitle}
                  date={exp.period}
                />
              ))}
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariant} className={`mt-10`}>
            <p className={`text-[#393535] text-lg font-semibold`}>{data?.about.experience[2].title}</p>
            <motion.div variants={itemVariant} className={`mt-5 space-y-5`}>
              {data?.about.experience[2].card.map((exp, index) => (
                <Skill
                  key={index}
                  image={`http://localhost:1337${exp.image.url}`}
                  skill={exp.jobtitle}
                  date={exp.period}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
