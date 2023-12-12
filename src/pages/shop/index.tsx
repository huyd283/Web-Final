import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React from 'react';

import AuthLayout from '@/layouts/AuthLayout';
import bg from '@/public/assets/images/webshop/BG.jpg';
import title from '@/public/assets/images/webshop/tittle.png';

const ListItem = dynamic(() => import('@/pages/shop/_components/listItem'));
const ItemBalance = dynamic(() => import('@/pages/shop/_components/item-balance'));

export default function Index() {
  return (
    <AuthLayout>
      <motion.div
        initial={{ x: -1000 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div style={{ backgroundImage: `url(${bg.src})` }} className="mt-20">
          <div className="flex flex-row items-center justify-center">
            <Image
              src={title}
              className="my-4"
              style={{ width: 'auto', height: 'auto' }}
              alt="Logo"
            />
          </div>
          <div className="flex w-full  flex-row justify-center p-12 ">
            <div className="w-1/5">
              <ItemBalance />
            </div>
            <div className="w-4/5">
              <ListItem />
            </div>
          </div>
        </div>
      </motion.div>
    </AuthLayout>
  );
}
