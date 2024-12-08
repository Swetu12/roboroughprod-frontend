import React from 'react';
import Image from 'next/image';
import Stars from '@/components/ui/stars';

const review = [
  {
    id: 1,
    name: 'Robert Fox',
    role: 'Golden Gate',
    body: "Working with Alberto has been an absolute pleasure. His attention to detail and commitment to delivering top-notch designs is impressive. Beka's ability to transform complex ideas into clean, user-friendly interfaces is outstanding. He always goes above and beyond to ensure the final product exceeds expectations. Highly recommend him for any design project!",
    image: '/creativesuite.svg',
  },
];

const Review = ({ className }: { className?: string }) => {
  return (
    <div className={`bg-white mx-6 rounded-2xl py-4 ${className}`}>
      {review.map((review) => (
        <div key={review.id}>
          <div className={`inline-flex gap-4`}>
            <div className={`ml-6 flex items-center`}>
              <Image src={review.image} alt={review.name} width={32} height={32} />
            </div>
            <div>
              <p className={`text-black text-sm font-semibold`}>{review.name}</p>
              <p className={`text-gray-500 text-xs`}>{review.role}</p>
            </div>
            <Stars className={`lg:ml-64 ml-20`} />
          </div>
          <div>
            <p className={`text-gray-600 text-sm mx-6`}>{review.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Review;
