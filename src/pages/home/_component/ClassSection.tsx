'use client';

import { motion } from 'framer-motion';
import _ from 'lodash';
import Image from 'next/image';
import React, { memo, useState } from 'react';

import backgroundClass from '@/public/assets/images/home/bg-class.jpg';
import btnClass from '@/public/assets/images/home/btn-class.png';
import pattern from '@/public/assets/images/home/hoa-van.png';
import textClass from '@/public/assets/images/home/txt-class.png';
import type { ClassDetailType, ClassType } from '@/types/homeTypes';
import { classData } from '@/utils/data/classData';

const ClassSection = () => {
  const [classSelect, setSelectClass] = useState<ClassType>('cb');

  const handleClickClass = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: ClassType
  ) => {
    event.preventDefault();
    setSelectClass(type);
  };

  return (
    <div
      className="relative h-fit w-full bg-cover pb-16"
      data-aos="fade-up"
      data-aos-duration="1000"
      style={{ backgroundImage: `url(${backgroundClass.src})` }}
    >
      <div className="flex w-full flex-row items-center justify-center pt-4">
        <Image src={textClass} className="h-12 w-72" alt="icon-y" />
      </div>
      <div className="px-12 pt-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <button
              onClick={(event) => handleClickClass(event, 'cb')}
              className="pt-4"
              type="button"
            >
              <div className="class-cb" style={{ backgroundImage: `url(${btnClass.src})` }} />
              <span className="hidden">image</span>
            </button>
            <button
              onClick={(event) => handleClickClass(event, 'tl')}
              className="pt-4"
              type="button"
            >
              <div className="class-tl" style={{ backgroundImage: `url(${btnClass.src})` }} />
              <span className="hidden">image</span>
            </button>
            <button
              onClick={(event) => handleClickClass(event, 'vd')}
              className="pt-4"
              type="button"
            >
              <div className="class-vd" style={{ backgroundImage: `url(${btnClass.src})` }} />
              <span className="hidden">image</span>
            </button>
            <button
              onClick={(event) => handleClickClass(event, 'll')}
              className="pt-4"
              type="button"
            >
              <div className="class-ll" style={{ backgroundImage: `url(${btnClass.src})` }} />
              <span className="hidden">image</span>
            </button>
            <button
              onClick={(event) => handleClickClass(event, 'bc')}
              className="pt-4"
              type="button"
            >
              <div className="class-bc" style={{ backgroundImage: `url(${btnClass.src})` }} />
              <span className="hidden">image</span>
            </button>
            <button
              onClick={(event) => handleClickClass(event, 'mg')}
              className="pt-4"
              type="button"
            >
              <div className="class-mg" style={{ backgroundImage: `url(${btnClass.src})` }} />
              <span className="hidden">image</span>
            </button>
          </div>
          <div className="flex flex-row">
            {_.flatMap(_.filter(classData, { class: classSelect }), (item: ClassDetailType) => (
              <div className="flex flex-row items-center pt-10" key={item.id}>
                <motion.div
                  initial={{ opacity: 0, x: -10, y: 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center px-6 "
                >
                  <Image
                    src={item.textImage}
                    style={{ width: 'auto', height: 'auto' }}
                    alt="text-img"
                  />
                  <Image src={pattern} className="h-5 w-40" alt="text-img" />
                  <div className=" pt-4 text-center text-base font-bold text-[#220d00]">
                    {item.description}
                  </div>
                </motion.div>
                <motion.video
                  className="h-full w-2/3"
                  initial={{ opacity: 0, x: 0, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5 }}
                  loop
                  playsInline
                  autoPlay
                  muted
                >
                  <source src={item.video} type="video/mp4" />
                </motion.video>
              </div>
            ))}
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default memo(ClassSection);
