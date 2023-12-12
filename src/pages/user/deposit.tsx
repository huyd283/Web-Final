import Image from 'next/image';
import React, { useCallback, useEffect } from 'react';

import MyLazyLoadedImage from '@/components/MyLazyLoadedImage';
import UserLayout from '@/layouts/UserLayout';
import BankHistoryTable from '@/pages/user/_component/Card/BankHistoryTable';
import logoMB from '@/public/assets/images/user-manager/mbb.png';
import { useAppDispatch, useAppSelector } from '@/stores';
import { getQrCodeAction } from '@/stores/authentication';

export default function Deposit() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.authen.user);
  const qrCode = useAppSelector((state) => state.authen.qrCode);

  const getQRCode = useCallback(async () => {
    await dispatch(getQrCodeAction()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    getQRCode().then(() => {});
  }, [getQRCode]);

  return (
    <UserLayout>
      <div className="mx-auto ml-64 mt-20 items-center justify-center bg-gray-200">
        <div className="flex flex-col items-center justify-center px-32 pt-4">
          <span className="text-center text-4xl font-bold text-black">NẠP TIỀN VÀO TÀI KHOẢN!</span>
          <span className="pt-2  text-center text-xl text-black">
            Thực hiện chuyển khoản ngân hàng vào số tài khoản bên dưới. Vui lòng nhập đúng nội dung
            chuyển khoản và chờ ở trang này cho đến khi hệ thống báo thành công.
          </span>
        </div>
        <div className=" mt-4 flex  h-full w-full flex-row justify-center">
          <div className="flex w-2/5 flex-col items-center rounded-xl bg-white p-4">
            <span className="text-center text-xl text-black">
              <strong>Cách 1:</strong> Chuyển khoản bằng mã QR Mở App Ngân hàng quét mã QRCode và
              nhập số tiền cần chuyển
            </span>
            <MyLazyLoadedImage
              className="h-auto w-auto py-4"
              src={qrCode?.qrDataURL}
              alt="qr of a qr"
            />
          </div>
          <div className="ml-4 flex min-h-full w-1/2 flex-col items-center   rounded-xl bg-white p-4">
            <span className="text-center text-xl text-black">
              <strong>Cách 2:</strong> Chuyển khoản thủ công theo thông tin
            </span>
            <Image className="my-4 h-24 w-48" src={logoMB} alt=" base mbb" />
            <span className="pt-4  text-center text-xl">
              Chủ tài khoản: <strong>MA VĂN TÚ</strong>
            </span>
            <hr className="my-4 md:min-w-full" />
            <span className="pt-4  text-center  text-xl">
              Số Tài khoản: <strong className="text-[#008000]"> 86600111222333</strong>
            </span>

            <hr className="my-4 md:min-w-full" />
            <span className="pt-4  text-center text-xl">
              Nội dung chuyển tiền: <strong className="text-[#FF0000]">{`NAP9D${user.id}`}</strong>
            </span>

            <hr className="my-4 md:min-w-full" />

            <span className="pt-4  text-center text-base">Ngân hàng: Quân đội (MB)</span>
          </div>
        </div>
        <div className="my-12 flex w-full flex-row items-center justify-center">
          <span className="text-center text-4xl">
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
