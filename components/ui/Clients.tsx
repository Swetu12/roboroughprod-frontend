import React from 'react';
import Image from 'next/image';

const clients = ['/countrytownhouse.png', '/elitetraveler.png', '/fujifilm.png', '/renais.png'];

const Clients = () => {
  return (
    <div className="relative mr-6 md-phone:mr-0 overflow-hidden md:ml-40 desktop-xl:ml-[650px] tablet-landscape:ml-20 laptop-sm:ml-52 lg:ml-[650px] mt-10 py-6">
      <div className="flex animate-scroll gap-1 sm:gap-6 max-w-full overflow-x-hidden">
        {[...clients].map((logo, index) => (
          <div key={index} className="flex-shrink-0 w-32 h-32 flex items-center justify-center">
            <Image src={logo} alt={`Client logo ${index}`} width={80} height={80} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Clients;
