'use client';

import React from 'react';
import Service from '@/components/ui/Service';
import { Syne } from 'next/font/google';
import { useRouter } from 'next/navigation';

const photography = [{ id: 1, body: 'Photography' }];

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

const Page = () => {
  const router = useRouter();

  const handleRedirect = (slug: string) => {
    router.push(`/photography/${slug}`);
  };
  return (
    <div>
      <div className={`flex justify-center w-full mt-20 text-4xl font-bold`}>
        {photography.map((item) => (
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
