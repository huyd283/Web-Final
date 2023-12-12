import React from 'react';

import UserLayout from '@/layouts/UserLayout';
import BankHistoryTable from '@/pages/user/_component/Card/BankHistoryTable';

export default function History() {
  return (
    <UserLayout>
      <div className="mx-auto ml-64 mt-20 items-center justify-center bg-gray-200">
        <div className="my-12 flex w-full flex-row items-center justify-center">
          <span className="pt-4 text-center text-4xl">
            <strong>Lịch sử nạp tiền</strong>
          </span>
        </div>
        <div className="flex w-full items-center justify-center">
          <BankHistoryTable />
        </div>
      </div>
    </UserLayout>
  );
}
