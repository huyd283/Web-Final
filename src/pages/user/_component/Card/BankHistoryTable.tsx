import { flatMap } from 'lodash';
import React, { memo, useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/stores';
import { getTransactionAction } from '@/stores/authentication';
import type { Transaction } from '@/types/authTypes';
import { numberWithDot } from '@/utils/utils';

const BankHistoryTable = () => {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector((state) => state.authen.transactions);
  const getDataTrans = useCallback(async () => {
    await dispatch(getTransactionAction()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getDataTrans().then(() => {});
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, [getDataTrans]);

  useEffect(() => {
    getDataTrans().then(() => {});
  }, [getDataTrans]);

  return (
    <div className="relative mx-12 mb-6 flex w-full min-w-0 flex-col break-words  shadow-lg">
      <div className="block w-full overflow-x-auto">
        {/* Projects table */}
        <table className="w-full border-collapse items-center bg-transparent">
          <thead>
            <tr>
              <th className=" whitespace-nowrap rounded-tl-xl border border-x-0 border-solid border-[#64748B] bg-[#475569] px-6 py-3 text-left align-middle text-xl font-semibold uppercase text-[#E2E8F0]">
                Thời gian
              </th>
              <th className="whitespace-nowrap border border-x-0 border-solid border-[#64748B] bg-[#475569] px-6 py-3 text-left align-middle text-xl font-semibold uppercase text-[#E2E8F0]">
                Nội dung
              </th>
              <th className="whitespace-nowrap border border-x-0 border-solid border-[#64748B] bg-[#475569] px-6 py-3 text-left align-middle text-xl font-semibold uppercase text-[#E2E8F0]">
                Mã giao dịch
              </th>
              <th className="whitespace-nowrap border border-x-0 border-solid border-[#64748B] bg-[#475569] px-6 py-3 text-left align-middle text-xl font-semibold uppercase text-[#E2E8F0]">
                Số tiền
              </th>
              <th className=" whitespace-nowrap rounded-tr-xl border border-x-0 border-solid border-[#64748B] bg-[#475569] px-6 py-3 text-left align-middle text-xl font-semibold uppercase text-[#E2E8F0]">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody className="rounded-xl bg-[#334155]">
            {flatMap(transactions, (item: Transaction) => (
              <tr key={item.transaction_id}>
                <th className="flex items-center whitespace-nowrap border-x-0 border-t-0 p-4 px-6 text-left align-middle text-xs">
                  <span className=" text-xs text-white">{item?.transaction_time}</span>
                </th>
                <td className="whitespace-nowrap border-x-0 border-t-0 p-4 px-6 align-middle text-xs  text-white">
                  {item?.transaction_description}
                </td>
                <td className="whitespace-nowrap border-x-0 border-t-0 p-4 px-6 align-middle text-xs  text-white">
                  {item?.transaction_bank_id}
                </td>
                <td className="whitespace-nowrap border-x-0 border-t-0 p-4 px-6 align-middle text-xs  text-white">
                  {numberWithDot(item?.amount)} VND
                </td>
                <td className="whitespace-nowrap border-x-0 border-t-0 p-4 px-6 align-middle text-xs  text-[#008000]">
                  {item?.status === 'success' ? 'Thành công' : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(BankHistoryTable);
