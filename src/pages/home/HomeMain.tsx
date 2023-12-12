import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import ClassSection from '@/pages/home/_component/ClassSection';
import DownLoadSection from '@/pages/home/_component/DownLoadSection';
import NewsSection from '@/pages/home/_component/NewsSection';
import RankingsSection from '@/pages/home/_component/RankingsSection';
import SocialSection from '@/pages/home/_component/SocialSection';
import ic18 from '@/public/assets/images/home/logo18.jpg';

const HomeMain = () => {
  return (
    <motion.div>
      <motion.div
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="fixed left-0 top-36 z-10 w-28"
      >
        <Link href="/">
          <Image src={ic18} style={{ width: 'auto', height: 'auto' }} alt="Logo" />
        </Link>
      </motion.div>
      <DownLoadSection />
      <NewsSection />
      <ClassSection />
      <RankingsSection />
      <SocialSection />
    </motion.div>
  );
};

export default HomeMain;
