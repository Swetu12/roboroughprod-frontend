import React from 'react';
import Image from 'next/image';
import Stars from '@/components/ui/stars';

const Review = ({
  className,
  image,
  name,
  role,
  body,
}: {
  className?: string;
  image: string;
  name: string;
  role: string;
  body: string;
}) => {
  return (
    <div className={`bg-white mx-6 rounded-2xl py-4 ${className}`}>
      <div className={`inline-flex gap-4`}>
        <div className={`ml-6 flex items-center`}>
          <Image src={image} alt={name} width={32} height={32} />
        </div>
        <div>
          <p className={`text-black text-sm font-semibold`}>{name}</p>
          <p className={`text-gray-500 text-xs`}>{role}</p>
        </div>
        <Stars className={`lg:ml-64 ml-20`} />
      </div>
      <div>
        <p className={`text-gray-600 text-sm mx-6 break-words w-[500px]`}>{body}</p>
      </div>
    </div>
  );
};
export default Review;
