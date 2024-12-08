'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Syne } from 'next/font/google';
import Image from 'next/image'; // Use this hook for client-side routing

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const services = [
  {
    slug: 'vehicle-photography',
    title: 'Vehicle Photography',
    description: 'Vehicle Photography Description',
    image: '/vehiclephotography.jpg',
  },
  {
    slug: 'motor-sports-event-malle-mile-2024',
    title: 'Motor Sports Event Malle Mile 2024',
    description: 'Motor Sports Event Malle Mile 2024 Description',
    image: '/eventphotography.jpg',
  },
  {
    slug: 'motor-sports-event-malle-canyon-2024',
    title: 'Motor Sports-The Malle Canyon 2024',
    description: 'Motor Sports-The Malle Canyon 2024 Marketing',
    image: '/canyon.jpg',
  },
  {
    slug: 'property-photography',
    title: 'Property Photography',
    description: 'Property Photography Marketing',
    image: '/propertyphotography.jpg',
  },
  {
    slug: 'product-photography',
    title: 'Product Photography',
    description: 'Product Photography Marketing',
    image: '/product.jpg',
  },
  {
    slug: 'street-photography',
    title: 'Street Photography',
    description: 'Street Photography Marketing',
    image: '/street.jpg',
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
      {slug === 'vehicle-photography' && (
        <div className={`flex flex-col items-center w-full mt-20 space-y-4`}>
          <Image src={service.image} alt={service.title} height={1000} width={1000} />
        </div>
      )}
      {slug === 'motor-sports-event-malle-mile-2024' && (
        <div className={`flex flex-col items-center w-full mt-20 space-y-4`}>
          <Image src={service.image} alt={service.title} height={1000} width={1000} />
        </div>
      )}
      {slug === 'motor-sports-event-malle-canyon-2024' && (
        <div className={`flex flex-col items-center w-full mt-20 space-y-4`}>
          <Image src={service.image} alt={service.title} height={1000} width={1000} />
        </div>
      )}
      {slug === 'property-photography' && (
        <div className={`flex flex-col items-center w-full mt-20 space-y-4`}>
          <Image src={service.image} alt={service.title} height={1000} width={1000} />
        </div>
      )}
      {slug === 'product-photography' && (
        <div className={`flex flex-col items-center w-full mt-20 space-y-4`}>
          <Image src={service.image} alt={service.title} height={1000} width={1000} />
        </div>
      )}
      {slug === 'street-photography' && (
        <div className={`flex flex-col items-center w-full mt-20 space-y-4`}>
          <Image src={service.image} alt={service.title} height={1000} width={1000} />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
