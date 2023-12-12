import mg from '@/public/assets/images/home/text-mg.png';
import bc from '@/public/assets/images/home/txt-bc.png';
import cb from '@/public/assets/images/home/txt-cb.png';
import ll from '@/public/assets/images/home/txt-ll.png';
import tl from '@/public/assets/images/home/txt-tl.png';
import vd from '@/public/assets/images/home/txt-vd.png';
// @ts-ignore
import videoBc from '@/public/assets/videos/home/Bi-Cung.mp4';
import videoCb from '@/public/assets/videos/home/Cai-Bang.mp4';
import videoLl from '@/public/assets/videos/home/Luc-Lam.mp4';
import videoMg from '@/public/assets/videos/home/Ma-Giao.mp4';
import videoTl from '@/public/assets/videos/home/Thieu-Lam.mp4';
import videoVd from '@/public/assets/videos/home/Vo-Dang.mp4';

export const classData = [
  {
    id: 1,
    description:
      'Cái Bang: là môn phái của những cao thủ hành khất, có thế lực trải rộng nhất võ lâm, là nơi sản sinh ra nhiều anh hùng',
    class: 'cb',
    video: videoCb,
    textImage: cb
  },
  {
    id: 2,
    description:
      'Thiếu Lâm: là môn phái của những đại sư. Đây là môn phái mệnh danh là Võ Lâm Bắc Đẩu, là nơi mở đầu của lịch sử võ lâm.',
    class: 'tl',
    video: videoTl,
    textImage: tl
  },
  {
    id: 3,
    description:
      'Võ Đang: Nếu Thiếu Lâm kết hợp võ công với Phật giáo thì Võ Đang kết hợp võ công với Đạo giáo. Nổi tiếng về Thái Cực Quyền nhưng kiếm pháp Võ Đang cũng là 1 tinh hoa võ học.',
    class: 'vd',
    video: videoVd,
    textImage: vd
  },
  {
    id: 4,
    description:
      'Lục Lâm: Thế gian hỗn loạn, những nông dân bị cướp mất ruộng đất, mất kế sinh nhai hay những tội phạm bị quan phủ truy bắt. Họ lập nhóm tự xưng là nghĩa tặc sau đó phát triển thành Lục Lâm.',
    class: 'll',
    video: videoLl,
    textImage: ll
  },
  {
    id: 5,
    description:
      'Bí Cung: là tổ chức bí mật được thiết lập bởi những nữ hiệp. Đây là thế lực thần bí được giấu sau những tấm khăn che mặt, sử dụng võ công đặc biệt dựa trên nền tảng yêu thuật và thủ đoạn xấu xa.',
    class: 'bc',
    video: videoBc,
    textImage: bc
  },
  {
    id: 6,
    description:
      'Ma Giáo: là một giáo phái bí ẩn được tạo ra bởi thế lực Hắc Đạo. Họ không đội trời chung với Triều Đình và Võ Lâm Bạch Đạo trong hàng trăm năm.',
    class: 'mg',
    video: videoMg,
    textImage: mg
  }
];
