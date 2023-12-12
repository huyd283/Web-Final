import { useRouter } from 'next/router';
import React, { memo } from 'react';

import Footer from '@/layouts/footer/footer';
import Header from '@/layouts/header/header';
import { Meta } from '@/layouts/Meta';
import { useAppSelector } from '@/stores';
import { Main } from '@/templates/Main';

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const user = useAppSelector((state) => state.authen);
  const router = useRouter();

  if (!user.accessToken || user.user.roles !== 'USER') {
    router.replace('/login');
    return null;
  }

  return (
    <Main
      meta={
        <Meta
          title="Kỳ trân các"
          description="9D Cửu Long Cố Nhân Xin Chào Tất Cả Các Vị Bằng Hữu."
        />
      }
    >
      <Header />
      {children}
      <Footer />
    </Main>
  );
};

export default memo(AuthLayout);
