import React from 'react';
import { Syne } from 'next/font/google';
import Review from '@/components/ui/Review';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const content = [{ id: 1, title: 'Clients about my work' }];

const Reviews = () => {
  return (
    <div className={`min-h-full bg-gradient-to-b from-pink-100 to-[#FAD4C0] pb-10`}>
      <div>
        {content.map((content) => (
          <div key={content.id}>
            <p className={`flex justify-center text-black ${syne.className} text-3xl md:text-4xl lg:text-5xl pt-14`}>
              {content.title}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5">
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
        <Review />
      </div>
    </div>
  );
};

export default Reviews;
