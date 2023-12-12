'use client';

import 'aos/dist/aos.css';

import AOS from 'aos';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { isMobile } from 'react-device-detect';

type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const router = useRouter();

  if (isMobile) {
    router.push('/mobile-warning');
  }

  useEffect(() => {
    AOS.init({ disable: 'mobile' });
  }, []);

  return (
    <div className="h-full w-full">
      {props.meta}
      <main>{props.children}</main>
    </div>
  );
};

export { Main };
