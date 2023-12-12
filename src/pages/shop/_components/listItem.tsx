import { motion } from 'framer-motion';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import MyLazyLoadedImage from '@/components/MyLazyLoadedImage';
import ModalProduct from '@/pages/register/_component/Modal';
import itemDefault from '@/public/assets/images/webshop/item_2213227.gif';
import khung from '@/public/assets/images/webshop/khung-item.png';
import bgItem from '@/public/assets/images/webshop/khung-vatpham.jpg';
import { useAppDispatch, useAppSelector } from '@/stores';
import { buyProductAction, getProductAction, getUserInfoAction } from '@/stores/authentication';
import type { IProduct } from '@/types/authTypes';
import { numberWithCommas } from '@/utils/utils';

import Pagination from './pagination';

const itemsPerPage = 6; // Số lượng phần tử trên mỗi trang

const ListItem = () => {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector((state) => state.authen.userInfo);

  const products = useAppSelector((state) => state.authen.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModalPay, setShowModalPay] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [itemSelected, setItemSelected] = useState<IProduct>();
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = products.slice(startIndex, endIndex);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handlePressBuy = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: any) => {
    e.preventDefault();
    setShowModalPay(!showModalPay);
    setItemSelected(item);
  };

  const handleDetail = (item: any) => {
    setShowModalDetail(!showModalDetail);
    setItemSelected(item);
  };

  const getProductData = useCallback(async () => {
    await dispatch(getProductAction()).unwrap();
  }, [dispatch]);

  const getInfo = useCallback(async () => {
    await dispatch(getUserInfoAction()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    getProductData().then(() => {});
  }, [getProductData]);

  async function handlePressConfirmBuy() {
    setShowModalPay(false);
    const balance = userInfo.balance || 0;
    const itemprice = itemSelected?.itemprice || 0;
    if (balance >= itemprice) {
      const id = String(itemSelected?.id) ?? '';
      const result: any = await dispatch(buyProductAction({ id })).unwrap();
      if (result && result.status === 200) {
        await getInfo().then(() => {});
        toast.success('Mua hàng thành công!');
      }
    } else {
      toast.error('Số dư không đủ!');
    }
  }

  return (
    <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} transition={{ duration: 1 }}>
      <div className="flex w-full  justify-end">
        <div
          className="grid grid-cols-1 px-16 lg:mx-16 lg:grid-cols-2"
          style={{ backgroundImage: `url(${bgItem.src})` }}
        >
          {currentItems.map((item) => (
            <div
              className="m-6 flex flex-row border-2 border-solid border-red-900 p-4"
              key={item.id}
            >
              <div
                style={{ backgroundImage: `url(${khung.src})` }}
                className="h-24 w-24 bg-no-repeat"
              >
                {/* <Image src={item.itemimages || itemDefault} className="list-img" alt="Logo" /> */}
                <MyLazyLoadedImage
                  src={`http://cuulongconhan.com/${item.itemimages}` || itemDefault.src}
                  className="h-20 w-20"
                  alt="Logo"
                />
              </div>
              <div className="w-4/5 px-4">
                <div className="custom-text-yellow text-lg font-bold">{item?.itemname}</div>
                <div>
                  <b>Số lượng:</b> {item?.quality ?? 1}
                </div>
                <div>
                  <b>Giá:</b>{' '}
                  <b className="text-lg text-red-700">
                    {numberWithCommas(Number(item?.itemprice))} KNB
                  </b>
                </div>
                <div className="description-list">
                  <b>Mô tả: </b>
                  {item.itemdescription}
                </div>
                <div className="mt-4 flex w-full items-center justify-center">
                  <button
                    onClick={(event) => handlePressBuy(event, item)}
                    type="button"
                    className="mr-2 rounded-lg bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-600"
                  >
                    <span>MUA</span>
                  </button>
                  <button
                    onClick={() => handleDetail(item)}
                    type="button"
                    className="rounded-lg bg-red-700 px-4 py-2 font-bold text-white hover:bg-red-600"
                  >
                    <span>CHI TIẾT</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ModalProduct
          title="Thông tin mua hàng"
          content={
            <div className="flex">
              <MyLazyLoadedImage
                src={`http://cuulongconhan.com/${itemSelected?.itemimages}` || itemDefault.src}
                className="mr-3.5 h-20 w-20"
                alt="Logo"
              />
              <div className="flex flex-col">
                <p className="custom-text-yellow mb-4 text-2xl font-bold">
                  {itemSelected?.itemname}
                </p>
                <p className="mb-4 text-2xl font-bold">
                  Giá: {numberWithCommas(Number(itemSelected?.itemprice))}
                </p>
              </div>
            </div>
          }
          show={showModalPay}
          textButton="Xác nhận"
          onClose={() => setShowModalPay(false)}
          onConfirm={() => handlePressConfirmBuy()}
        />

        <ModalProduct
          content={
            <div className="modal-body">
              <div className="flex flex-col items-center justify-center">
                {/* <div */}
                {/*  style={{ backgroundImage: `url(${itemDefault.src})` }} */}
                {/*  className="mb-4 mr-3.5 h-8 w-8 bg-no-repeat" */}
                {/* /> */}
                <MyLazyLoadedImage
                  src={`http://cuulongconhan.com/${itemSelected?.itemimages}` || itemDefault.src}
                  className="mb-4 h-20 w-20"
                  alt="Logo"
                />
                <div className="flex flex-col items-center justify-center">
                  <h1 className="custom-text-yellow mb-4 text-xl font-bold">
                    {itemSelected?.itemname}
                  </h1>
                  <p className="custom-text-yellow mb-4 text-xl font-bold">
                    Giá: {numberWithCommas(Number(itemSelected?.itemprice))} KNB
                  </p>
                  <p className="custom-text-yellow mb-4 text-xl">
                    Mô Tả: {itemSelected?.itemdescription}
                  </p>
                </div>
              </div>
            </div>
          }
          show={showModalDetail}
          textButton="Xác nhận"
          onClose={() => setShowModalDetail(false)}
          onConfirm={() => setShowModalDetail(false)}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={products.length}
        onPageChange={handlePageChange}
      />
    </motion.div>
  );
};
export default memo(ListItem);
