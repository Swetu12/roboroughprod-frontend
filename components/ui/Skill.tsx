import React from 'react';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Skill = ({
  image,
  skill,
  date,
  className,
}: {
  image: string;
  skill: string;
  date: string;
  className?: string;
}) => {
  return (
    <Alert className={`bg-[#FFFCF2] text-black shadow-gray-600 border-gray-300 inline-flex gap-4 ${className}`}>
      <Image src={image} alt={skill} width={1800} height={552} className="h-8 w-8" />
      <div>
        <AlertTitle>{skill}</AlertTitle>
        <AlertDescription>{date}</AlertDescription>
      </div>
    </Alert>
  );
};
export default Skill;
