import 'swiper/css/bundle';

import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

import Footer from '@/layouts/footer/footer';
import Header from '@/layouts/header/header';
import { Meta } from '@/layouts/Meta';
import backgroundNews from '@/public/assets/images/home/bg-new2.jpg';
import textNews from '@/public/assets/images/home/Text-Tinmoi.png';
import { useAppDispatch, useAppSelector } from '@/stores';
import { getNewsAction } from '@/stores/home';
import { Main } from '@/templates/Main';
import type { INews } from '@/types/homeTypes';

type FilterType = 0 | 1 | 2 | 3;

const Index = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.home.news);
  const [typeNews, setTypeNews] = useState<FilterType>(0);

  const handleClickFilterCallback = useCallback(
    (type: FilterType) => {
      setTypeNews(type);
    },
    [setTypeNews]
  );

  const handleClickFilter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, type: FilterType) => {
      event.preventDefault();
      handleClickFilterCallback(type);
    },
    [handleClickFilterCallback]
  );

  const getData = useCallback(async () => {
    return dispatch(getNewsAction());
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Main meta={<Meta title="Tin tức" description="Tin tức cửu long tranh bá mới nhất" />}>
      <Header />
      <div
        className="relative h-fit w-full bg-cover pb-16"
        data-aos="fade-up"
        data-aos-duration="1000"
        style={{ backgroundImage: `url(${backgroundNews.src})` }}
      >
        <div className="flex w-full flex-row items-center justify-center pt-4">
          <Image src={textNews} className="h-12 w-72" alt="icon-y" />
        </div>
        <div className="mx-12 mt-16 flex flex-row bg-white">
          <div className="w-full px-5 pt-5">
            <div className="flex flex-col ">
              <div className="flex h-12 flex-row items-center bg-[#ddcbb7]">
                <button type="button" onClick={(event) => handleClickFilter(event, 0)}>
                  <span
                    className={`px-4 py-2 text-xl font-bold  hover:text-[#d51400] ${
                      typeNews === 0 ? 'text-[#d51400]' : 'text-[#220d00]'
                    }`}
                  >
                    Tất cả
                  </span>
                </button>
                <span className="text-2xl text-[#220d00]">|</span>
                <button type="button" onClick={(event) => handleClickFilter(event, 1)}>
                  <span
                    className={`px-4 py-2 text-xl font-bold  hover:text-[#d51400] ${
                      typeNews === 1 ? 'text-[#d51400]' : 'text-[#220d00]'
                    }`}
                  >
                    Tin tức
                  </span>
                </button>
                <span className="text-2xl text-[#220d00] ">|</span>
                <button type="button" onClick={(event) => handleClickFilter(event, 2)}>
                  <span
                    className={`px-4 py-2 text-xl font-bold  hover:text-[#d51400] ${
                      typeNews === 2 ? 'text-[#d51400]' : 'text-[#220d00]'
                    }`}
                  >
                    Sự kiện
                  </span>
                </button>

                <span className="text-2xl text-[#220d00] ">|</span>
                <button type="button" onClick={(event) => handleClickFilter(event, 3)}>
                  <span
                    className={`px-4 py-2 text-xl font-bold  hover:text-[#d51400] ${
                      typeNews === 3 ? 'text-[#d51400]' : 'text-[#220d00]'
                    }`}
                  >
                    Thông báo
                  </span>
                </button>
              </div>
            </div>
            <div className="flex flex-col">
              {_.flatMap(
                typeNews === 0 ? news : _.filter(news, { type: typeNews }),
                (item: INews) => (
                  <div data-aos="fade-left" key={item.news_id}>
                    <div className="flex w-full flex-row items-center justify-between pt-2">
                      {item.type === 1 && (
                        <span className="min-w-[8.25rem] whitespace-nowrap bg-[#d51400] px-7 py-0.5 text-center text-base font-bold leading-5 text-white">
                          Tin tức
                        </span>
                      )}
                      {item.type === 2 && (
                        <span className="min-w-[8.25rem] whitespace-nowrap bg-[#25bbb9] px-7 py-0.5 text-center text-base font-bold leading-5 text-white">
                          Sự kiện
                        </span>
                      )}
                      {item.type === 3 && (
                        <span className="min-w-[8.25rem] whitespace-nowrap bg-orange-400 px-7 py-0.5 text-center text-base font-bold leading-5 text-white">
                          <span>Thông báo</span>
                        </span>
                      )}

                      <Link href="/" className="w-2/4">
                        <div className="w-full overflow-hidden truncate px-4 text-base text-[#220d00] hover:text-yellow">
                          {item.news_title}
                        </div>
                      </Link>
                      <div className="w-1/4 overflow-hidden truncate bg-[#ffa800] px-2 py-0.5 text-base text-white">
                        {item.created_at}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Main>
  );
};

export default Index;
