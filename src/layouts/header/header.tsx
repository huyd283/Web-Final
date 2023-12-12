import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import useAccess from '@/hooks/useAccess';
import UserButton from '@/layouts/header/ActionUser/UserButton';
import joongWon from '@/public/assets/images/logo/joongwon.png';
import logo from '@/public/assets/images/logo/logo.png';

import Menus from './menus';

const Header = () => {
  const { isAuthen } = useAccess();

  return (
    <header>
      <div id="header-sticky" className="header fixed top-0 z-50">
        <div className="container h-full w-full flex-row items-center justify-center">
          <div className="flex h-full w-full flex-row items-center  justify-between">
            <motion.div
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mr-10 flex flex-row items-center"
            >
              <Link className="no-underline hover:no-underline" href="/">
                <Image src={logo} style={{ width: 'auto', height: 'auto' }} alt="Logo" />
              </Link>
              <Link href="/">
                <Image src={joongWon} style={{ width: 'auto', height: 'auto' }} alt="Logo" />
              </Link>
            </motion.div>

            <Menus />
            <div className="pr-8">
              {!isAuthen && (
                <Link href="/login">
                  <div className="text-center text-2xl font-bold text-yellow hover:text-blueRay">
                    Đăng Nhập
                  </div>
                </Link>
              )}
              {isAuthen && <UserButton />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
