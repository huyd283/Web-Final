import cookie from 'cookie';
import _ from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyAuth } from '@/libs/auth';
import DatabaseCis from '@/libs/dbCis';
import DatabaseDragonsAccount from '@/libs/dbNineDragonsAccount';
import type BaseResponse from '@/utils/BaseResponse';
import { rateLimiterMiddleware } from '@/utils/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ statu: 405, error: 'Method Not Allowed' });
  }

  const clientIp = req.socket.remoteAddress;
  const isAllowed = rateLimiterMiddleware(clientIp ?? '') || false;
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const verifiedToken = token && (await verifyAuth(token).catch(() => {}));

  if (!isAllowed) {
    return res
      .status(429)
      .json({ status: 429, message: 'Yêu cầu quá nhanh, vui lòng thử lại sau.' });
  }
  if (!verifiedToken) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        maxAge: -1,
        path: '/'
      })
    );
    return res
      .status(401)
      .json({ status: 401, message: 'Phiên đăng nhập hết hạn vui lòng thử lại sau!', data: null });
  }

  try {
    const { id } = req.body;
    if (!id) {
      const response: BaseResponse = {
        status: 500,
        success: false,
        message: 'Dữ liệu không hợp lệ',
        data: null
      };
      return res.status(500).json(response);
    }

    // Xác thực người dùng
    const resUser = await DatabaseDragonsAccount.getUserByUsername(verifiedToken.user_name);

    const resProduct = await DatabaseDragonsAccount.getProductById(id);

    if (_.isEmpty(resUser) || _.isEmpty(resProduct)) {
      const response: BaseResponse = {
        status: 500,
        success: false,
        message: 'Dữ liệu không hợp lệ',
        data: null
      };
      return res.status(500).json(response);
    }
    const userData = resUser[0];
    const productData = resProduct[0];
    if (userData.balance < productData.itemprice) {
      const response: BaseResponse = {
        status: 500,
        success: false,
        message: 'Số dư không đủ',
        data: null
      };
      return res.status(500).json(response);
    }

    const itemAdd = {
      user_id: userData.user_name,
      cart_itemCode: productData.itemid,
      game_server: 0,
      item_price: productData.itemprice
    };

    const transaction = {
      itemName: productData.itemname,
      itemPrice: productData.itemprice,
      itemImage: productData.itemimages,
      userName: userData.user_name
    };

    await DatabaseCis.executeStoredProcedure(itemAdd);
    await DatabaseDragonsAccount.subtractBalance(userData.user_name, productData.itemprice);
    await DatabaseDragonsAccount.addTransHistory(transaction);

    const newBalance = userData.balance - productData.itemprice;

    const response: BaseResponse = {
      status: 200,
      success: true,
      message: 'Mua hàng thành công',
      data: {
        _id: userData.user_id,
        user_name: userData.user_name,
        displayName: userData.fullname,
        isActivate: userData.isActivate,
        roles: 'USER',
        balance: newBalance
      }
    };

    return res.status(200).json(response);
  } catch (error) {
    const response: BaseResponse = {
      status: 500,
      success: false,
      message: 'An internal server error occurred'
    };
    return res.status(500).json(response);
  }
}
