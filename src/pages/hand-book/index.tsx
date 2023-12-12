import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import Loading from '@/components/Loading';
import Footer from '@/layouts/footer/footer';
import Header from '@/layouts/header/header';
import { Meta } from '@/layouts/Meta';
import bg from '@/public/assets/images/handbook/bghandbook.jpg';
import { Main } from '@/templates/Main';

const ContentSection = dynamic(() => import('@/pages/hand-book/_components/ContentSection'), {
  loading: () => <Loading />
});
const Index = () => {
  return (
    <Main meta={<Meta title="Cửu long cố nhân" description="Hướng dẫn - hỏi đáp " />}>
      <Header />
      <motion.div
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="h-full w-full"
      />
      <div className="mt-20 w-full">
        <Image src={bg} className="h-full w-full object-contain" alt="Handbook" />
      </div>
      <ContentSection />
      <Footer />
    </Main>
  );
};
export default Index;
