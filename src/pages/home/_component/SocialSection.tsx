import Link from 'next/link';
import React from 'react';

import btnSocial from '@/public/assets/images/home/icon-social.png';

const SocialSection = () => {
  return (
    <div
      className="relative h-[26.25rem] w-full bg-[#220d00] pb-16"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="flex h-full w-full flex-row items-center justify-center pt-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col px-6 pt-4">
            <Link
              href="https://www.facebook.com/CuuLongCoNhan1"
              type="button"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="btn-facebook" style={{ backgroundImage: `url(${btnSocial.src})` }} />
            </Link>
          </div>
          <div className="flex flex-col px-6 pt-4">
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.youtube.com/watch?v=-XNQqadLIsQ&ab_channel=NooAnhHuy"
            >
              <div className="btn-youtube" style={{ backgroundImage: `url(${btnSocial.src})` }} />
            </Link>
          </div>

          <div className="px-6 pt-4">
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href="https://m.me/CuuLongCoNhan1"
              type="button"
            >
              <div className="btn-support " style={{ backgroundImage: `url(${btnSocial.src})` }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSection;
