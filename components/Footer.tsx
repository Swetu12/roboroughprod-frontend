import React from 'react';
import { Syne } from 'next/font/google';
import TailwindButton from '@/components/ui/TailwindButton';
import Link from 'next/link';
import Image from 'next/image';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const copyright = [{ id: 1, body: '© Roborough Production 2025. All Rights Reserved.\n' }];

const title = [{ id: 1, title: "Let's bring your ideas to life with stunning quality photos" }];
const available = [{ id: 1, title: 'Available for Freelance Projects' }];
const socialMedia = [
  {
    id: 1,
    img: '/insta.svg',
    link: 'https://github.com/Swetu12',
  },
  {
    id: 2,
    img: '/twit.svg',
    link: 'https://x.com/10Halexx',
  },
  {
    id: 3,
    img: '/link.svg',
    link: 'https://www.linkedin.com/in/geroc-alexandru-553838321/',
  },
];

const Footer = () => {
  return (
    <div className={`pb-32 flex flex-col items-center justify-center`}>
      <div className="text-center space-y-6 mt-40">
        {/* Social Media Icons */}
        <div className="flex items-center justify-center mt-5 gap-4">
          {socialMedia.map((profile) => (
            <div
              key={profile.id}
              className="w-10 h-10 cursor-pointer bg-[#FFFCF2] flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <Link href={profile.link} key={profile.id} passHref>
                <Image src={profile.img} alt="social-media-icon" width={20} height={20} className={`filter invert`} />
              </Link>
            </div>
          ))}
        </div>

        {/* Available Section */}
        <div className="flex items-center justify-center">
          <span className="w-3 h-3 mr-3 bg-green-500 rounded-full"></span>
          {available.map((item) => (
            <p key={item.id} className={`text-gray-600 text-sm`}>
              {item.title}
            </p>
          ))}
        </div>

        {/* Title Section */}
        {title.map((title) => (
          <p key={title.id} className={`text-black ${syne.className} text-5xl md:text-6xl lg:text-7xl lg:mx-52 mx-6`}>
            {title.title}
          </p>
        ))}

        {/* Button Section */}
        <div>
          <TailwindButton />
        </div>
        <div>
          {copyright.map((item) => (
            <p key={item.id} className={`text-black mt-32`}>
              {item.body}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
