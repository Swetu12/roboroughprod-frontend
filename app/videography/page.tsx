'use client';

import React from 'react';
import Service from '@/components/ui/Service';
import { Syne } from 'next/font/google';
import { useRouter } from 'next/navigation';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const services = [
  { slug: 'showreel', title: 'Showreel', description: 'Showreel', image: '/showreel.png' },
  {
    slug: 'kombucha-reel',
    title: 'Kombucha - Product Promotion',
    description: 'Kombucha - Product Promotion',
    image: '/kombuchareel.png',
  },
  {
    slug: 'puttshack-reel',
    title: 'Puttshack Venue Promotion',
    description: 'Puttshack Venue Promotion - Marketing',
    image: '/putshackreel.png',
  },
  {
    slug: 'cocktail-madness-reel',
    title: 'Cocktail Madness - Commercial',
    description: 'Cocktail Madness - Commercial',
    image: '/cocktailreel.png',
  },
  { slug: 'actor', title: 'Actor - Trailer', description: 'Actor - Trailer', image: '/actor.png' },
  { slug: 'showcase-skills-reel', title: 'Showcase Skills', description: 'Showcase Skills', image: '/skillsreel.png' },
  {
    slug: 'character-fashion-reel',
    title: 'Character-Fashion',
    description: 'Character-Fashion',
    image: '/charackterreel.png',
  },
];

const videography = [{ id: 1, body: 'Videography' }];

const Page = () => {
  const router = useRouter();

  const handleRedirect = (slug: string) => {
    router.push(`/videography/${slug}`);
  };
  return (
    <div>
      <div className={`flex justify-center w-full mt-20 text-4xl font-bold`}>
        {videography.map((item) => (
          <p key={item.id} className={`${syne.className} text-black`}>
            {item.body}
          </p>
        ))}
      </div>
      {services.map((service) => (
        <Service
          key={service.slug}
          onClick={() => handleRedirect(service.slug)}
          image={service.image}
          title={service.title}
          description={service.description}
        />
      ))}
    </div>
  );
};
export default Page;
