import React from 'react';
import Image from 'next/image';
import { Syne } from 'next/font/google';
import { GoArrowUpRight } from 'react-icons/go';
import { motion } from 'framer-motion';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const Service = ({
  image,
  title,
  description,
  onClick,
}: {
  image: string;
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <div onClick={onClick} className={`cursor-pointer`}>
      <div className={`mx-6 md:mx-14 lg:mx-32 mt-10`}>
        <Image
          src={image}
          alt={title}
          width={1800}
          height={552}
          className={`rounded-3xl w-full sm:w-64 md:w-[1000px] md:h-[324px] lg:w-[1800px] lg:h-[552px] object-cover`}
          style={{
            objectPosition: 'center center', // Center the image (you can adjust this if you need to focus on a different part of the image)
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1800px"
        />
      </div>
      <div className={`flex justify-between items-center`}>
        <motion.div className={`text-black ml-6 md:ml-14 lg:ml-32 mt-5 space-y-1`}>
          <p
            className={`${syne.className} text-xl font-semibold md:text-3xl group-hover:text-black transition-colors duration-300`}
          >
            {title}
          </p>
          <p className={`text-gray-500 text-sm md:text-base group-hover:text-black transition-colors duration-300`}>
            {description}
          </p>
        </motion.div>
        <div className={`mx-6 md:mx-14 lg:mx-32`}>
          <GoArrowUpRight className={`text-black w-10 h-10`} />
        </div>
      </div>
    </div>
  );
};
export default Service;
