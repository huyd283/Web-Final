import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function AdminSidebar() {
  const router = useRouter();

  function onClickLogout() {}

  return (
    <div>
      <nav className="bg-blueGray-800 relative z-10 mt-20 flex flex-wrap items-center justify-between px-6 py-4 shadow-xl md:fixed md:inset-y-0 md:left-0 md:block md:w-64 md:flex-row md:flex-nowrap md:overflow-hidden md:overflow-y-auto">
        <div className="mx-auto flex w-full flex-wrap items-center justify-between px-0 md:min-h-full md:flex-col md:flex-nowrap md:items-stretch">
          <div className="absolute inset-x-0 top-0 z-40 h-auto flex-1 items-center overflow-y-auto overflow-x-hidden rounded shadow md:relative md:mt-4 md:flex md:flex-col md:items-stretch md:opacity-100 md:shadow-none">
            <hr className="my-4 md:min-w-full" />
            <ul className="flex list-none flex-col md:min-w-full md:flex-col">
              <li className="items-center">
                <Link href="/admin/dashboard">
                  <span
                    className={`block py-3 text-xs font-bold uppercase ${
                      router.pathname.indexOf('/user/dashboard') !== -1
                        ? 'text-yellow hover:text-red-700'
                        : 'text-white hover:text-yellow'
                    }`}
                  >
                    <i
                      className={` mr-2 text-sm ${
                        router.pathname.indexOf('/admin/dashboard') !== -1
                          ? 'text-yellow hover:text-red-700'
                          : 'text-white hover:text-yellow'
                      }`}
                    />{' '}
                    Dashboard
                  </span>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/add-news">
                  <span
                    className={`block py-3 text-xs font-bold uppercase ${
                      router.pathname.indexOf('/admin/add-news') !== -1
                        ? 'text-yellow hover:text-red-700'
                        : 'text-white hover:text-yellow'
                    }`}
                  >
                    <i
                      className={` mr-2 text-sm ${
                        router.pathname.indexOf('/admin/add-news') !== -1
                          ? 'text-yellow hover:text-red-700'
                          : 'text-white hover:text-yellow'
                      }`}
                    />{' '}
                    Đăng tin mới
                  </span>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/manager-news">
                  <span
                    className={`block py-3 text-xs font-bold uppercase ${
                      router.pathname.indexOf('/admin/manager-news') !== -1
                        ? 'text-yellow hover:text-red-700'
                        : 'text-white hover:text-yellow'
                    }`}
                  >
                    <i
                      className={` mr-2 text-sm ${
                        router.pathname.indexOf('/admin/manager-news') !== -1
                          ? 'text-yellow hover:text-red-700'
                          : 'text-white hover:text-yellow'
                      }`}
                    />{' '}
                    Quản lý tin tức
                  </span>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/manager-gift">
                  <span
                    className={`block py-3 text-xs font-bold uppercase ${
                      router.pathname.indexOf('/admin/manager-gift') !== -1
                        ? 'text-yellow hover:text-red-700'
                        : 'text-white hover:text-yellow'
                    }`}
                  >
                    <i
                      className={` mr-2 text-sm ${
                        router.pathname.indexOf('/admin/manager-gift') !== -1
                          ? 'text-yellow hover:text-red-700'
                          : 'text-white hover:text-yellow'
                      }`}
                    />{' '}
                    Quản lý Gift code
                  </span>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/add-money">
                  <span
                    className={`block py-3 text-xs font-bold uppercase ${
                      router.pathname.indexOf('/admin/add-money') !== -1
                        ? 'text-yellow hover:text-red-700'
                        : 'text-white hover:text-yellow'
                    }`}
                  >
                    <i
                      className={` mr-2 text-sm ${
                        router.pathname.indexOf('/admin/add-money') !== -1
                          ? 'text-yellow hover:text-red-700'
                          : 'text-white hover:text-yellow'
                      }`}
                    />{' '}
                    Nạp tiền cho user
                  </span>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/report-deposit">
                  <span
                    className={`block py-3 text-xs font-bold uppercase ${
                      router.pathname.indexOf('/admin/report-deposit') !== -1
                        ? 'text-yellow hover:text-red-700'
                        : 'text-white hover:text-yellow'
                    }`}
                  >
                    <i
                      className={` mr-2 text-sm ${
                        router.pathname.indexOf('/admin/report-deposit') !== -1
                          ? 'text-yellow hover:text-red-700'
                          : 'text-white hover:text-yellow'
                      }`}
                    />{' '}
                    Thống kê
                  </span>
                </Link>
              </li>
              <li className="items-center">
                <Link href="/admin/manager-event">
                  <span
                    className={`block py-3 text-xs font-bold uppercase ${
                      router.pathname.indexOf('/admin/manager-event') !== -1
                        ? 'text-yellow hover:text-red-700'
                        : 'text-white hover:text-yellow'
                    }`}
                  >
                    <i
                      className={` mr-2 text-sm ${
                        router.pathname.indexOf('/admin/manager-event') !== -1
                          ? 'text-yellow hover:text-red-700'
                          : 'text-white hover:text-yellow'
                      }`}
                    />{' '}
                    Quản lý sự kiện
                  </span>
                </Link>
              </li>

              <li className="items-center">
                <Link href="/admin/report-deposit">
                  <span
                    className={`block py-3 text-xs font-bold uppercase ${
                      router.pathname.indexOf('/admin/report-deposit') !== -1
                        ? 'text-yellow hover:text-red-700'
                        : 'text-white hover:text-yellow'
                    }`}
                  >
                    <i
                      className={` mr-2 text-sm ${
                        router.pathname.indexOf('/admin/report-deposit') !== -1
                          ? 'text-yellow hover:text-red-700'
                          : 'text-white hover:text-yellow'
                      }`}
                    />{' '}
                    Thống kê
                  </span>
                </Link>
              </li>
              <li className="items-center">
                <button type="button" onClick={onClickLogout}>
                  <span
                    className={`block py-3 text-xs font-bold uppercase ${
                      router.pathname.indexOf('/admin/maps') !== -1
                        ? 'text-yellow hover:text-red-700'
                        : 'text-white hover:text-yellow'
                    }`}
                  >
                    <i
                      className={` mr-2 text-sm ${
                        router.pathname.indexOf('/admin/maps') !== -1
                          ? 'text-yellow hover:text-red-700'
                          : 'text-white hover:text-yellow'
                      }`}
                    />
                    Đăng xuất
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
