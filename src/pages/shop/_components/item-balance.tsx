import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { memo, useCallback, useEffect } from 'react';

import bgBalance from '@/public/assets/images/webshop/border-gold.jpg';
import { useAppDispatch, useAppSelector } from '@/stores';
import { getUserInfoAction } from '@/stores/authentication';
import { numberWithDot } from '@/utils/utils';

const ItemBalance = () => {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.authen.userInfo);

  const getDataTrans = useCallback(async () => {
    await dispatch(getUserInfoAction()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    getDataTrans().then(() => {});
  }, [getDataTrans]);

  return (
    <motion.div
      className="mr-8 h-64 w-72 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgBalance.src})` }}
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row items-center justify-between px-6 pt-10">
        <span className=" text-center text-base font-bold uppercase text-[#925d00]">
          Kim nguyên bảo :
        </span>
        <span className="text-center text-base font-bold text-[#925d00]">
          {numberWithDot(userInfo.balance || 0)}
        </span>
      </div>
      <div className="mt-6 flex w-full  flex-col items-center justify-between px-6 pt-10">
        <Link
          href="/user/deposit"
          className="flex w-full items-center justify-center rounded-xl bg-[#b6230f] p-2 hover:bg-[#55150c]"
        >
          <span className="text-center text-xl font-bold uppercase text-[#ffdb8a]">
            Nạp kim nguyên bảo
          </span>
        </Link>
        <Link
          href="/user/history"
          className="my-2 flex w-full items-center justify-center rounded-xl bg-[#b6230f]   p-2 hover:bg-[#55150c]"
        >
          <span className="text-center text-xl font-bold uppercase text-[#ffdb8a]">
            Xem lịch sử nạp
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default memo(ItemBalance);
