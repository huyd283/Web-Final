import dynamic from 'next/dynamic';

import Loading from '@/components/Loading';
import Footer from '@/layouts/footer/footer';
import Header from '@/layouts/header/header';
import { Meta } from '@/layouts/Meta';
// import HomeMain from '@/pages/home/HomeMain';
import { Main } from '@/templates/Main';

const HomeMain = dynamic(() => import('@/pages/home/HomeMain'), {
  loading: () => <Loading />
});

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Cửu long cố nhân"
          description="9D Cửu Long Cố Nhân Xin Chào Tất Cả Các Vị Bằng Hữu."
        />
      }
    >
      <Header />
      <HomeMain />
      <Footer />
    </Main>
  );
};

export default Index;
