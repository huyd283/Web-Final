import _ from 'lodash';
import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import Footer from '@/layouts/footer/footer';
import Header from '@/layouts/header/header';
import { Meta } from '@/layouts/Meta';
import Database from '@/libs/dbNDGAME';
import backgroundBottom from '@/public/assets/images/ranking/bg-bottom.jpg';
import rankingBg from '@/public/assets/images/ranking/ranking.png';
import typeBg from '@/public/assets/images/ranking/ranking-type.png';
import background from '@/public/assets/images/ranking/top-ranking.jpg';
import { Main } from '@/templates/Main';
import type { IRank } from '@/types/homeTypes';
import { decodeCP1258, numberWithCommas } from '@/utils/utils';

const types = [
  { id: 1, name: 'Cá nhân', type: 'inner_level' },
  { id: 2, name: 'Phú hộ', type: 'money' },
  { id: 3, name: 'Ác danh', type: 'gong' },
  { id: 4, name: 'Danh tiếng', type: 'honor' }
];

const titleString: { [key: string]: string } = {
  inner_level: 'Phần trăm',
  money: 'Ngân lượng',
  gong: 'Ác danh',
  honor: 'Danh tiếng'
};

type Rank = {
  data: IRank[];
};

export const getServerSideProps: GetServerSideProps<Rank> = async (context) => {
  context.res.setHeader('Cache-Control', 'public, s-maxage=180, stale-while-revalidate=59');
  try {
    const data: IRank[] = await Database.getRankInfo();
    return {
      props: {
        data
      }
    };
  } catch (error) {
    return {
      props: {
        data: []
      }
    };
  }
};

const renderValue = (data: any, typeActive: string) => {
  switch (typeActive) {
    case 'inner_level':
      return (
        <div>
          {data?.level_rate !== 1
            ? (100 * (data?.level_rate ?? 0)).toFixed(2)
            : 100 * (data?.level_rate ?? 0)}
          %
        </div>
      );
    case 'money':
      return <div>{numberWithCommas(Number(data?.money))}</div>;
    case 'gong':
      return <div>{numberWithCommas(Number(data?.gong))}</div>;
    case 'honor':
      return <div>{numberWithCommas(Number(data?.honor))}</div>;
    default:
      return <div />;
  }
};

export default function Page({ data }: Rank) {
  const router = useRouter();
  const type = router.query.slug;
  const [typeActive, setTypeActive] = useState<string>((type as string) ?? 'inner_level');
  const [dataFilter, setDataFilter] = useState(data ?? []);

  const handleChangeType = useCallback(
    (selectedType: string) => {
      setTypeActive(selectedType);
      if (selectedType === 'inner_level') {
        const levers = _.orderBy(data, [selectedType], ['desc']);
        setDataFilter(levers);
      } else if (selectedType === 'money') {
        const temp = _.orderBy(data, [(obj) => Number(obj.money)], ['desc']);
        setDataFilter(temp);
      } else if (selectedType === 'gong') {
        const temp = _.orderBy(data, [(obj) => Number(obj.gong)], ['desc']);
        setDataFilter(temp);
      } else if (selectedType === 'honor') {
        const temp = _.orderBy(data, [(obj) => Number(obj.honor)], ['desc']);
        setDataFilter(temp);
      }
      // _.orderBy(data, [(obj) => Number(obj.money)], ['desc']);
    },
    [data]
  );

  useEffect(() => {
    if (typeof type === 'string') {
      handleChangeType(type);
    }
  }, [handleChangeType, type]);

  return (
    <Main meta={<Meta title="Xếp hạng" description="Xếp hạng" />}>
      <Header />
      <div
        className="mt-20 flex h-full w-full flex-col "
        data-aos="zoom-in-up"
        data-aos-duration="1000"
      >
        <Image className="h-full w-full" src={background} alt="bg" />
        <div
          className="h-[112vh] bg-amber-300 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundBottom.src})` }}
        >
          <div className="flex flex-row pt-10">
            <div className="relative h-full w-1/4">
              <div
                className="h-full w-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${typeBg.src})` }}
              >
                <div className="flex flex-col items-center justify-center py-28">
                  {_.map(types, (item) => (
                    <button
                      key={item.id}
                      onClick={() => handleChangeType(item.type)}
                      className="hover:scale-110 "
                      type="button"
                    >
                      <span
                        className={`text-2xl font-bold  ${
                          typeActive === item.type ? 'text-yellow' : 'text-[#b36b25]'
                        } hover:text-yellow`}
                      >
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative h-full w-3/4">
              <div
                className="absolute top-0 z-10 flex h-screen w-full bg-contain bg-no-repeat "
                style={{ backgroundImage: `url(${rankingBg.src})` }}
              >
                <div className="no-scrollbar mx-40 mt-24 w-full overflow-x-auto sm:mt-24 sm:h-[28rem]  md:mt-44 md:h-[36rem] lg:mx-40  lg:mt-24 lg:h-[28rem] xl:mt-24 xl:h-[32rem] 2xl:mx-60 2xl:mt-36">
                  <table className="min-w-[90%] max-w-[90%] divide-y divide-gray-200">
                    <thead className="sticky top-0 bg-[#c9ae80]">
                      <tr>
                        <th className="px-6 py-3 text-left text-lg font-bold tracking-wider text-[#d41804]">
                          Hạng
                        </th>
                        <th className="px-6 py-3 text-left text-lg font-bold tracking-wider text-[#d41804]">
                          Tên
                        </th>
                        <th className="px-6 py-3 text-left text-lg font-bold tracking-wider text-[#d41804]">
                          Cấp
                        </th>
                        <th className="px-6 py-3 text-left text-lg font-bold tracking-wider text-[#d41804]">
                          {titleString[typeActive]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="mt-[3.25rem] overflow-y-scroll">
                      {/* Dòng dữ liệu 1 */}
                      {_.map(dataFilter, (item, index) => (
                        <tr key={item?.unique_id}>
                          <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {decodeCP1258(item?.chr_name)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{item?.inner_level}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {renderValue(item, typeActive)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Main>
  );
}
