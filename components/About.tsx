import React from 'react';
import { GoArrowDownRight } from 'react-icons/go';
import Image from 'next/image';
import { Syne } from 'next/font/google';
import Skill from '@/components/ui/Skill';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600'],
});

const awards = [{ id: 1, title: 'Awards & Recognition' }];

const services = [{ id: 1, title: 'Services' }];

const about = [{ id: 1, title: 'About Me' }];

const exp = [{ id: 1, title: 'Experience' }];

const robert = [
  {
    id: 1,
    title: "Hi, I'm Robert",
    body:
      'Experienced Photographer and Videomaker with a demonstrated history of working in the photography and video industry. Skilled in Camera Operation, Art Direction, Adobe Creative Suite, Styling, and Capture One. Strong arts and design professional graduated from Regents Academy.\n' +
      '\n' +
      'Always looking to create quality content for passionate businesses. There is always a story to tell!',
  },
];

const About = () => {
  return (
    <div className={`pb-20`}>
      <div className={`mx-6 md:mx-14 lg:mx-32`}>
        {about.map((about) => (
          <p key={about.id} className={`text-black inline-flex font-semibold`}>
            {about.title} <GoArrowDownRight className={`ml-1 mt-1`} />
          </p>
        ))}
      </div>

      <div className={`block lg:flex lg:items-start lg:space-x-10 mx-6 md:mx-14 lg:mx-32 mt-10`}>
        {/* Left Section: Image */}
        <div className={`w-full lg:flex-[1] flex justify-center lg:justify-start`}>
          <Image
            src={`/robert.png`}
            alt={`robert`}
            width={1800}
            height={552}
            className={`rounded-3xl w-full lg:w-auto object-cover`}
          />
        </div>

        {/* Right Section: Content */}
        <div className={`mt-5 lg:mt-0 lg:flex-[2]`}>
          {/* About Text */}
          {robert.map((robert) => (
            <div key={robert.id} className={`space-y-5`}>
              <p className={`${syne.className} text-[#393535] text-3xl md:text-4xl font-bold`}>{robert.title}</p>
              <p className={`text-[#393535] text-base md:text-lg`}>{robert.body}</p>
            </div>
          ))}

          {/* Experience */}
          <div className={`mt-10`}>
            {exp.map((exp) => (
              <p key={exp.id} className={`text-[#393535] text-lg font-semibold`}>
                {exp.title}
              </p>
            ))}
            <div className={`mt-5 space-y-5`}>
              <Skill
                image={`/captureone.svg.png`}
                skill={`Photographer - Robotto Production`}
                date={`2020 - Current`}
              />
              <Skill
                image={`/captureone.svg.png`}
                skill={`Videographer - Robotto Production`}
                date={`2020 - Current`}
              />
            </div>
          </div>

          {/* Awards */}
          <div className={`mt-10`}>
            {awards.map((awards) => (
              <p key={awards.id} className={`text-[#393535] text-lg font-semibold`}>
                {awards.title}
              </p>
            ))}
            <div className={`mt-5 space-y-5`}>
              <Skill image={`/captureone.svg.png`} skill={`Placeholder for Robert`} date={`2023 - Current`} />
              <Skill image={`/captureone.svg.png`} skill={`Placeholder for Robert`} date={`2023 - Current`} />
            </div>
          </div>

          {/* Services */}
          <div className={`mt-10`}>
            {services.map((services) => (
              <p key={services.id} className={`text-[#393535] text-lg font-semibold`}>
                {services.title}
              </p>
            ))}
            <div className={`mt-5 space-y-5`}>
              <Skill image={`/captureone.svg.png`} skill={`Videography & Ads Filming`} date={`2020 - Current`} />
              <Skill image={`/captureone.svg.png`} skill={`Photography & Editing`} date={`2020 - Current`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
