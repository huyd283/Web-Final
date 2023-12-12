import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import a1 from '@/public/assets/images/handbook/a1.png';
import a2 from '@/public/assets/images/handbook/a2.jpg';
import a3 from '@/public/assets/images/handbook/a3.jpg';
import a4 from '@/public/assets/images/handbook/a4.jpg';
import handbookButton from '@/public/assets/images/handbook/Camnang-button.png';

const ContentSection = () => {
  const [showtt, setShowtt] = useState(false);
  const [shownv, setShownv] = useState(false);
  const [showpb, setShowpb] = useState(false);
  const [showtb, setShowtb] = useState(false);
  const [showtn, setShowtn] = useState(false);
  const handleClicktt = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShowtt(!showtt);
    setShowpb(false);
    setShowtb(false);
    setShowtn(false);
  };
  const handleClicknv = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShownv(!shownv);
  };
  const handleClickpb = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShowpb(!showpb);
    setShowtt(false);
    setShowtb(false);
    setShowtn(false);
  };
  const handleClicktb = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShowtb(!showtb);
    setShowpb(false);
    setShowtt(false);
    setShowtn(false);
  };
  const handleClicktn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShowtn(!showtn);
    setShowpb(false);
    setShowtb(false);
    setShowtt(false);
  };

  return (
    <div className="body z-0 flex h-full w-full p-8">
      <div className="flex flex-row">
        <div className="container-l w-1/5">
          <button onClick={(event) => handleClicktt(event)} type="button">
            <div className="bg-tt" style={{ backgroundImage: `url(${handbookButton.src})` }} />
            <span className="hidden">image</span>
          </button>
          {showtt && (
            <div>
              <div className="list-content">[Hướng Dẫn] - Nạp tiền vào tài khoản</div>
              <div className="list-content">Hướng Dẫn Mua Hàng Webshop {`"Kỳ Trân Các"`} </div>
              <div className="list-content">Hướng Dẫn Mua Hàng Webshop {`"Kỳ Trân Các"`} </div>
              <div className="list-content">
                Hướng Dẫn Tân Thủ 9D (Nhận Quà, Nhận Trang Bị Đầu Game, Làm Nhiệm Vụ,..){' '}
              </div>
              <div className="list-content">Hệ Thống Danh Hiệu {`"ÁC - THIỆN"`} Danh</div>
              <div className="list-content">Hướng Dẫn Mua Hàng Webshop {`"Kỳ Trân Các"`} </div>
            </div>
          )}
          <button onClick={(event) => handleClicknv(event)} type="button">
            <div className="bg-nv" style={{ backgroundImage: `url(${handbookButton.src})` }} />
            <span className="hidden">image</span>
          </button>
          {shownv && <div />}
          <button onClick={(event) => handleClickpb(event)} type="button">
            <div className="bg-pb" style={{ backgroundImage: `url(${handbookButton.src})` }} />
            <span className="hidden">image</span>
          </button>
          {showpb && (
            <div>
              <div className="list-content">Võ Đang - Viêm Ma (Quyết Mới)</div>
              <div className="list-content">Cập Nhật Mới Phó Bản Vô Tận</div>
              <div className="list-content">Cập Nhật Mới `Sinh Tử Quyết` và `Diêm Vương Quyết`</div>
              <div className="list-content">Hắc Chu Tự (Cập Nhập Mới)</div>
              <div className="list-content">Phó Bản Vô Tận</div>
              <div className="list-content">Bá Vương Quyết</div>
              <div className="list-content">Pháo Đài Bồ Đạt La</div>
            </div>
          )}
          <button onClick={(event) => handleClicktb(event)} type="button">
            <div className="bg-tb" style={{ backgroundImage: `url(${handbookButton.src})` }} />
            <span className="hidden">image</span>
          </button>
          {showtb && (
            <div>
              <div className="list-content">Đục Lỗ</div>
              <div className="list-content">Cường Hóa Thuộc Tính</div>
              <div className="list-content">Tinh Luyện</div>
            </div>
          )}
          <button onClick={(event) => handleClicktn(event)} type="button">
            <div className="bg-tn" style={{ backgroundImage: `url(${handbookButton.src})` }} />
            <span className="hidden">image</span>
          </button>
          {showtn && (
            <div>
              <div className="list-content">
                20 LOẠI VŨ KHÍ MỚI (Tử Thần Song Long Uy Minh/Thiên Mệnh){' '}
              </div>
              <div className="list-content">Cập Nhật Tài Nguyên Mới Phó Bản Bất Tận</div>
              <div className="list-content">Hệ Thống Danh Hiệu {`"ÁC - THIỆN"`} Danh</div>
            </div>
          )}
        </div>
        <div className="container-r">
          <div style={{ color: 'red' }} className="mt-5 text-center text-4xl font-bold">
            Hướng Dẫn Tải Và Sử Dụng
          </div>
          <div>
            <div className="contents">
              - LINK DOWNLOAD GOOGLE (Khuyên dùng): <Link href="/">Tại Đây.</Link>
              <br />- LINK DOWNLOAD FSHARE: <Link href="/">Tại Đây.</Link>
            </div>
            <div className="w-1/2">
              - <b>Cửu Long Tranh Bá</b> là sân chơi phi lợi nhuận, sân chơi này mở ra không nhằm
              mục đích kinh doanh, thương mại. Nói không với các hoạt động cá độ, tuyên truyền chống
              phá nhà nước. Mọi hoạt động tại sân chơi <b>Phi lợi nhuận</b> này đều phải đảm bảo
              chấp hành và tuân thủ các quy định của pháp luật nhà nước Việt Nam.
            </div>
            <hr />
            <div className="h-full w-full">
              <p>Một số hình ảnh của Game:</p>
              <Image className="h-full w-full" src={a1} alt="image" />
              <Image className="h-full w-full" src={a2} alt="image" />
              <Image className="h-full w-full" src={a3} alt="image" />
              <Image className="h-full w-full" src={a4} alt="image" />
            </div>
            <div className="pt-6">
              Bằng hữu là một đại hiệp tâm huyết cùng năm tháng?
              <b> Cửu Long Tranh Bá</b> chắc chắn là sự lựa chọn hoàn hảo của đại hiệp. Hãy thể hiện
              niềm khát kháo cháy bỏng, tìm lại hồi ức một thời hoàng kim trong thế giới Cửu Long
              Tranh Bá bằng cách ấn vào {`"CHƠI NGAY"`} ở phía trên, hoặc <a href=".">Tại Đây</a>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContentSection;
