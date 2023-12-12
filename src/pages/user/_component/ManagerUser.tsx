import React, { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/stores';
import { getUserInfoAction } from '@/stores/authentication';
import { numberWithDot } from '@/utils/utils';

function ManagerUser() {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.authen.userInfo);

  const getDataTrans = useCallback(async () => {
    await dispatch(getUserInfoAction()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    getDataTrans().then(() => {});
  }, [getDataTrans]);

  return (
    <div className="ml-64 mt-20">
      <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-[#F1F5F9] shadow-lg">
        <div className="mb-0 rounded-t p-6">
          <div className="flex justify-between text-center">
            <h6 className="text-xl font-bold text-yellow">Thông tin tài khoản</h6>
          </div>
        </div>
        <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
          <div>
            <div className="w-full px-4 lg:w-4/12">
              <div className="relative mb-3 w-full">
                <div className="mb-2 block text-xs font-bold uppercase text-slate-500">
                  Số dư tài khoản:
                </div>
                <div className=" w-full rounded border-0 bg-white p-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring">
                  <span className="text-2xl font-bold text-[#00FF00]">
                    {numberWithDot(userInfo.balance || 0)}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <div className="mb-2 block text-xs font-bold uppercase text-slate-500">
                    Tài khoản
                  </div>
                  <div className="w-full rounded border-0 bg-white p-3 text-xl text-[#475569] shadow transition-all duration-150 ease-linear focus:outline-none focus:ring">
                    {userInfo.user_name}
                  </div>
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <div className="mb-2 block text-xs font-bold uppercase text-slate-500">Email</div>
                  <div className="w-full rounded border-0 bg-white p-3 text-xl text-[#475569] shadow transition-all duration-150 ease-linear focus:outline-none focus:ring">
                    {userInfo.email}
                  </div>
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <div className="mb-2 block text-xs font-bold uppercase text-slate-500">
                    Họ và tên
                  </div>
                  <div className="w-full rounded border-0 bg-white p-3 text-xl text-[#475569] shadow transition-all duration-150 ease-linear focus:outline-none focus:ring">
                    {userInfo.fullname}
                  </div>
                </div>
              </div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="relative mb-3 w-full">
                  <div className="mb-2 block text-xs font-bold uppercase text-slate-500">
                    Địa chỉ
                  </div>
                  <div className="w-full rounded border-0 bg-white p-3 text-xl text-[#475569] shadow transition-all duration-150 ease-linear focus:outline-none focus:ring">
                    {userInfo.address}
                  </div>
                </div>
              </div>
            </div>

            <hr className="mt-6 border-b-2 border-[#CBD5E1]" />

            <h6 className="mb-6 mt-3 text-center text-sm font-bold uppercase text-slate-500">
              Nhân vật
            </h6>
            {/* <div className="flex flex-wrap"> */}
            {/*  <div className="lg:w-12/12 w-full px-4"> */}
            {/*    <div className="relative mb-3 w-full"> */}
            {/*      <div className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"> */}
            {/*        Address */}
            {/*      </div> */}
            {/*      <div */}
            {/*        className="placeholder:text-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white p-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring" */}
            {/*        defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" */}
            {/*      /> */}
            {/*    </div> */}
            {/*  </div> */}
            {/*  <div className="w-full px-4 lg:w-4/12"> */}
            {/*    <div className="relative mb-3 w-full"> */}
            {/*      <label */}
            {/*        className="text-blueGray-600 mb-2 block text-xs font-bold uppercase" */}
            {/*        htmlFor="grid-password" */}
            {/*      > */}
            {/*        City */}
            {/*      </label> */}
            {/*      <input */}
            {/*        type="email" */}
            {/*        className="placeholder:text-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white p-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring" */}
            {/*        defaultValue="New York" */}
            {/*      /> */}
            {/*    </div> */}
            {/*  </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerUser;
