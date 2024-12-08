import React from 'react';
import { CiLocationArrow1 } from 'react-icons/ci';

const buttonText = [{ id: 1, text: 'Book a Call' }];

const TailwindButton = () => {
  return (
    <button className="relative inline-flex h-14 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      {buttonText.map((button) => (
        <span
          className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-1 text-lg font-medium text-white backdrop-blur-3xl"
          key={button.id}
        >
          {button.text} <CiLocationArrow1 className={`ml-2 w-5 h-5 mt-1`} />
        </span>
      ))}
    </button>
  );
};
export default TailwindButton;
