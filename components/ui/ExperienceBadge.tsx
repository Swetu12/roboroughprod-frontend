import React from 'react';
import Image from 'next/image';

const ExperienceBadge = ({ software, image }) => {
  return (
    <div>
      <div className={`inline-flex gap-1`}>
        <p className={`text-[#393535] text-sm`}>Editing</p>
        <div
          className={`text-[#393535] text-sm border w-32 border-gray-400 shadow-gray-500 flex items-center justify-center rounded-full`}
        >
          <Image src={image} width={16} height={16} alt="badge" className={`mr-1`} /> {software}
        </div>
      </div>
    </div>
  );
};
export default ExperienceBadge;
