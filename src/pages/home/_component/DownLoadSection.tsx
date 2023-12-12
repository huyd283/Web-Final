import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import MyLazyLoadedImage from '@/components/MyLazyLoadedImage';
import btnTorurial from '@/public/assets/images/home/btn-banner-float.png';
import backgroundImageUrl from '@/public/assets/images/home/button-gr.png';
import newBer from '@/public/assets/images/home/intro-float.png';
import backgroundSection from '@/public/assets/images/home/section-bg.jpg';
import webShop from '@/public/assets/images/home/webshop.png';
import { Main } from '@/templates/Main';

const DownLoadSection = () => {
  return (
    <Main>
      <div
        className="relative mt-[5rem] h-screen w-full bg-cover bg-no-repeat"
        data-aos="fade-up"
        data-aos-duration="1000"
        style={{ backgroundImage: `url(${backgroundSection.src})` }}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-1/3  z-40 pl-10"
        >
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
            <motion.div
              animate={{
                y: [0, -20, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'mirror'
              }}
            >
              <Link href="/shop">
                <Image src={webShop} className="h-56 w-32" alt="icon" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed right-0  top-1/3 z-40 pr-10"
        >
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
            <div>
              <MyLazyLoadedImage src={newBer.src} className="h-56 w-32" alt="icon-x" />
              <Link href="/hand-book">
                <Image
                  src={btnTorurial}
                  className="absolute bottom-4 left-[28%] h-10 w-24"
                  alt="icon-y"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex h-screen flex-row items-center justify-center pt-[25%]">
          {/* <SignedOut> */}
          {/*  <SignInButton afterSignInUrl="/"> */}
          {/*    <div */}
          {/*      className="button-register" */}
          {/*      style={{ backgroundImage: `url(${backgroundImageUrl.src})` }} */}
          {/*    /> */}
          {/*  </SignInButton> */}
          {/* </SignedOut> */}
          <Link href="/register">
            <div
              className="button-register"
              style={{ backgroundImage: `url(${backgroundImageUrl.src})` }}
            />
            <span className="hidden">image</span>
          </Link>

          <Link href="/">
            <div
              className="button-download"
              style={{ backgroundImage: `url(${backgroundImageUrl.src})` }}
            />
          </Link>
          <Link href="/">
            <div
              className="button-add-card"
              style={{ backgroundImage: `url(${backgroundImageUrl.src})` }}
            />
          </Link>
        </div>
      </div>
    </Main>
  );
};

export default DownLoadSection;
