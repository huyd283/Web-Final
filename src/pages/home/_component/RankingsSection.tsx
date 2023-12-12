import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import backgroundRanking from '@/public/assets/images/home/bg-xh.jpg';
import textRank from '@/public/assets/images/home/txt-rank.png';

const RankingsSection = () => {
  const router = useRouter();
  const handPressGoto = (type: string) => {
    router.push(type);
  };
  return (
    <div className="relative bg-[#220d00] p-5" data-aos="fade-up" data-aos-duration="1000">
      <div
        className="box-border h-full w-full border-2 border-[#fd7e14] bg-black bg-cover bg-no-repeat pb-4 opacity-100 transition-opacity duration-500 hover:opacity-80"
        style={{ backgroundImage: `url(${backgroundRanking.src})` }}
      >
        <div className="ml-10 flex w-full flex-col pt-4">
          <Image src={textRank} className="h-12 w-72" alt="icon-y" />
          <div className="grid w-1/3 grid-cols-2 gap-4 py-6">
            <button
              type="button"
              className="flex h-11 w-36 items-center justify-center bg-gradient-to-r from-white to-[#ffffff80] hover:scale-110 hover:opacity-100"
              onClick={() => handPressGoto('/ranking/inner_level')}
            >
              <span className=" text-2xl font-bold text-[#b36b25] hover:text-[#D51400]">
                Cá Nhân
              </span>
            </button>
            <Link
              className="flex h-11 w-36 items-center justify-center bg-gradient-to-r from-white to-[#ffffff80] hover:scale-110"
              href="/ranking/[slug]"
              as="/ranking/money"
            >
              <span className=" text-2xl font-bold text-[#b36b25] hover:text-[#D51400]">
                Phú hộ
              </span>
            </Link>
            <Link
              className="flex h-11 w-36 items-center justify-center bg-gradient-to-r from-white to-[#ffffff80] hover:scale-110"
              href="/ranking/[slug]"
              as="/ranking/gong"
            >
              <span className=" text-2xl font-bold text-[#b36b25] hover:scale-110 hover:text-[#D51400]">
                Ác danh
              </span>
            </Link>
            <Link
              href="/ranking/[slug]"
              as="/ranking/honor"
              className="flex h-11 w-36 items-center justify-center bg-gradient-to-r from-white to-[#ffffff80] hover:scale-110"
              type="button"
            >
              <span className=" text-2xl font-bold text-[#b36b25] hover:text-[#D51400]">
                Danh tiếng
              </span>
            </Link>
          </div>
          <Link href="/ranking/[slug]" as="/ranking/inner_level">
            <span className="my-6 ml-20 text-center text-2xl font-bold text-[#b36b25] hover:text-[#D51400]">
              Xem thêm +
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RankingsSection;
