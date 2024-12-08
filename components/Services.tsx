'use client';

import React from 'react';
import { GoArrowDownRight } from 'react-icons/go';
import Service from '@/components/ui/Service';
import { useRouter } from 'next/navigation';

const service = [{ id: 1, title: 'Services I Offer' }];

const Services = () => {
  const router = useRouter();

  const handleRedirect = (url: string) => {
    router.push(`/${url}`);
  };
  return (
    <div className={`mt-36 pb-20`}>
      <div className={`mx-6 md:mx-14 lg:mx-32`}>
        {service.map((service) => (
          <p key={service.id} className={`text-black inline-flex font-semibold`}>
            {service.title} <GoArrowDownRight className={`ml-1 mt-1`} />
          </p>
        ))}
      </div>
      <div>
        <Service
          onClick={() => handleRedirect('videography')}
          image={`/cocktail.png`}
          title={`Videography`}
          description={`Filming and Editing Videos`}
        />
        <Service
          onClick={() => handleRedirect('photography')}
          image={`/vehiclephotography.jpg`}
          title={`Photography`}
          description={`Photo Shooting`}
        />
      </div>
    </div>
  );
};
export default Services;
