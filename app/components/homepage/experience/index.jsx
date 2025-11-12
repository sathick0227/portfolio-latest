// @flow strict

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Experience() {
  return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
  {/* Left - Animation */}
  <div className="flex justify-center items-center h-full">
    <div className="w-full max-w-md">
      <AnimationLottie animationPath={experience} />
    </div>
  </div>

  {/* Right - Experiences */}
  <div>
    <div className="flex flex-col gap-6">
      {experiences.map(experience => (
        <GlowCard key={experience.id} identifier={`experience-${experience.id}`}>
          <div className="p-3 relative">
            <Image
              src="/blur-23.svg"
              alt="Hero"
              width={1080}
              height={200}
              className="absolute bottom-0 opacity-80"
            />

            {/* Duration */}
            <div className="flex justify-center">
              <p className="text-xs sm:text-sm text-[#16f2b3]">
                {experience.duration}
              </p>
            </div>

            {/* Title & Company */}
            <div className="flex items-center gap-x-8 px-3 py-5">
              <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                <BsPersonWorkspace size={36} />
              </div>
              <div>
                <p className="text-base sm:text-xl mb-2 font-medium uppercase">
                  {experience.title}
                </p>
                <p className="text-sm sm:text-base mb-2">
                  {experience.company}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2">
                  {experience.tech?.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-[#1a1443] text-amber-300 px-2 py-1 rounded-full text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </GlowCard>
      ))}
    </div>
  </div>
</div>


  );
};

export default Experience;