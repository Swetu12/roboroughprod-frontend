'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Syne } from 'next/font/google'; // Use this hook for client-side routing

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const services = [
  { slug: 'showreel', title: 'Showreel', description: 'Showreel Description', video: '/showreel.mp4' },
  {
    slug: 'kombucha-reel',
    title: 'Kombucha - Product Promotion',
    description: 'Kombucha - Product Promotion Description',
    video: '/showreel.mp4',
  },
  {
    slug: 'puttshack-reel',
    title: 'Puttshack Venue Promotion',
    description: 'Puttshack Venue Promotion- Marketing',
    video: '/showreel.mp4',
  },
  {
    slug: 'cocktail-madness-reel',
    title: 'Cocktail Madness - Commercial',
    description: 'Cocktail Madness - Commercial Marketing',
    video: '/showreel.mp4',
  },
  {
    slug: 'actor',
    title: 'Actor - Trailer',
    description: 'Actor - Trailer Marketing',
    video: '/showreel.mp4',
  },
  {
    slug: 'showcase-skills-reel',
    title: 'Showcase Skills',
    description: 'Showcase Skills Marketing',
    video: '/showreel.mp4',
  },
  {
    slug: 'character-fashion-reel',
    title: 'Character-Fashion',
    description: 'Character-FashionMarketing',
    video: '/showreel.mp4',
  },
];

const CategoryPage = () => {
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    // Extract slug from the pathname
    const pathSlug = pathname?.split('/').pop();
    if (pathSlug) {
      setSlug(pathSlug);
    }
  }, [pathname]);

  if (!slug) {
    return <div>Loading...</div>;
  }

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div>
      <h1 className={`text-black ${syne.className}  flex justify-center w-full mt-20 text-4xl font-bold`}>
        {service.title}
      </h1>
      {slug === 'showreel' && (
        <div className={`flex justify-center mt-8`}>
          <video controls width="1200" height="800">
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {slug === 'kombucha-reel' && (
        <div className="flex flex-col items-center mt-8 space-y-8">
          <video controls width="1200" height="800">
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video controls width="1200" height="800">
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video controls width="1200" height="800">
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video controls width="1200" height="800">
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video controls width="1200" height="800">
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {slug === 'puttshack-reel' && (
        <div className={`flex justify-center mt-8`}>
          <video controls width="1200" height="800">
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {slug === 'cocktail-madness-reel' && (
        <div className={`flex justify-center mt-8`}>
          <video controls width="1200" height="800">
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {slug === 'actor' && (
        <div className={`flex justify-center mt-8`}>
          <video controls width="1200" height="800">
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {slug === 'showcase-skills-reel' && (
        <div className={`flex justify-center mt-8`}>
          <video controls width="1200" height="800">
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {slug === 'character-fashion-reel' && (
        <div className={`flex justify-center mt-8`}>
          <video controls width="1200" height="800">
            <source src={service.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
