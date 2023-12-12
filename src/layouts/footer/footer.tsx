'use client';

import Image from 'next/image';
import React from 'react';

import joongWon from '@/public/assets/images/logo/joongwon.png';
import coNhan from '@/public/assets/images/logo-conhan.png';

const Footer = () => {
  // const handleSubmit = (e) => {
  //   e.prevenDefault();
  // };
  return (
    <footer>
      <div className=" border-t-2 border-yellow bg-[#220d00]">
        <div className="flex w-full flex-row items-center justify-center pt-4">
          <Image src={coNhan} className="mr-10 h-28" alt="icon-y" />
          <Image src={joongWon} className="h-28" alt="icon-y" />
        </div>
        <div className="flex w-full flex-row items-center justify-center pt-10">
          <span className="text-center text-2xl text-white">
            &copy; Cửu Long Cố Nhân |Dev22Team - 2023. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
