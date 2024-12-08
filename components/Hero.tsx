import React from 'react';
import { Syne } from 'next/font/google';
import ExperienceBadge from '@/components/ui/ExperienceBadge';
import TailwindButton from '@/components/ui/TailwindButton';
import Clients from '@/components/ui/Clients';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const title = [{ id: 1, body: 'Shaping Digital Experiences with Precision' }];

const Hero = () => {
  return (
    <>
      <div>
        <div className={`inline-flex gap-4 justify-center -mt-10 w-full absolute overflow-x-hidden`}>
          <ExperienceBadge software={`Capture One`} image={`/captureone.svg.png`} />
          <ExperienceBadge software={`Creative Suite`} image={`/creativesuite.svg`} />
        </div>
        <div>
          {title.map((title) => (
            <p
              className={`text-black ${syne.className} text-5xl lg:mx-96 md:mx-20 md:text-6xl lg:text-7xl text-center mt-60`}
              key={title.id}
            >
              {title.body}
            </p>
          ))}
        </div>
        <div className={`flex justify-center mt-16`}>
          <TailwindButton />
        </div>
        <div>
          <Clients />
        </div>
      </div>
    </>
  );
};
export default Hero;
