import { SignJWT } from 'jose';
import _ from 'lodash';
import moment from 'moment';
import { ConnectionPool, TYPES } from 'mssql';
import { nanoid } from 'nanoid';

import { getJwtSecretKey } from '@/libs/auth';
import { Env } from '@/libs/Env.mjs';
import type { UserModel } from '@/models/UserModel';
import type { ITransaction } from '@/types/product';
import type { ITransactionDb, ITransactionMbbank } from '@/types/transaction';
import type { IAllUser, IUser } from '@/types/user';
import { comparePasswords, hashPasswords } from '@/utils/utils';

const dbConfig = {
  user: Env.DATABASE_USERNAME || '',
  password: Env.DATABASE_PASSWORD || '',
  server: Env.DATABASE_URL || '',
  database: 'NineDragons_Account' || '',
  options: {
    instancename: 'SQLEXPRESS',
    trustedconnection: true,
    trustServerCertificate: true,
    providerName: 'System.Data.SqlClient'
  },
  pool: {
    max: 100, // Số lượng kết nối tối đa trong pool
    min: 0, // Số lượng kết nối tối thiểu trong pool
    idleTimeoutMillis: 30000 // Thời gian tối đa mà một kết nối có thể ở trong pool mà không được sử dụng trước khi bị đóng (30 giây)
  }
};

class NineDragonsAccount {
  private static pool: ConnectionPool | null = null;

  public static async connect() {
    try {
      if (!this.pool) {
        this.pool = new ConnectionPool(dbConfig);
        await this.pool.connect();
      }
    } catch (error) {
      throw new Error('Failed to connect to the database');
    }
  }

  public static async close() {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
      }
    } catch (error) {
      throw new Error('Failed to close the database connection');
    }
  }

  public static async register(payload: IUser) {
    const {
      username,
      password,
      email,
      telephone,
      address,
      isActivate = 'false',
      createdby = 'web',
      fullname
    } = payload;
    // Xác thực người dùng
    const result = await this.getUserByUsername(username);
    if (!_.isEmpty(result)) {
      throw new Error('Tài khoản đã tồn tại!');
    } else {
      try {
        if (!this.pool || !this.pool.connected) {
          await this.connect();
          const query = `INSERT INTO dbo.[9d_users] (user_name, password, email, telephone, address, balance, isActivate, created_at, created_by, fullname) VALUES (@user_name, @password, @email, @telephone, @address, @balance, @isActivate, GETDATE(),@created_by, @fullname)`;

          const addTblPass = await this.addTblPass(username, password);
          if (addTblPass === 1) {
            const res = await this.pool!.request()
              .input('user_name', TYPES.NVarChar, username)
              .input('password', TYPES.NVarChar, hashPasswords(password))
              .input('email', TYPES.NVarChar, email)
              .input('telephone', TYPES.NVarChar, telephone)
              .input('address', TYPES.NVarChar, address)
              .input('balance', TYPES.Decimal, 0)
              .input('isActivate', TYPES.Bit, isActivate)
              .input('created_by', TYPES.NVarChar, createdby)
              .input('fullname', TYPES.NVarChar, fullname)
              .query(query);
            if (res.rowsAffected[0] === 1) {
              return { data: 'create successful' };
            }
          }
          return undefined;
        }
        const query = `INSERT INTO dbo.[9d_users] (user_name, password, email, telephone, address, balance, isActivate, created_at, created_by, fullname) VALUES (@user_name, @password, @email, @telephone, @address, @balance, @isActivate, GETDATE(),@created_by, @fullname)`;

        const addTblPass = await this.addTblPass(username, password);
        if (addTblPass === 1) {
          const res = await this.pool!.request()
            .input('user_name', TYPES.NVarChar, username)
            .input('password', TYPES.NVarChar, hashPasswords(password))
            .input('email', TYPES.NVarChar, email)
            .input('telephone', TYPES.NVarChar, telephone)
            .input('address', TYPES.NVarChar, address)
            .input('balance', TYPES.Decimal, 0)
            .input('isActivate', TYPES.Bit, isActivate)
            .input('created_by', TYPES.NVarChar, createdby)
            .input('fullname', TYPES.NVarChar, fullname)
            .query(query);
          if (res.rowsAffected[0] === 1) {
            return { data: 'create successful' };
          }
        }
        return undefined;
      } catch (error) {
        throw new Error('Tài khoản đã tồn tại!');
      }
    }
  }

  public static async login(username: string, password: string) {
    // Kiểm tra tính hợp lệ của username và password
    if (username.length < 6 || username.length > 50) {
      throw new Error('Tên người dùng phải có từ 4 đến 50 ký tự.');
    }
    if (password.length < 6 || password.length > 50) {
      throw new Error('Mật khẩu phải có từ 4 đến 50 ký tự.');
    }

    // Xác thực người dùng
    const result = await this.getUserByUsername(username);
    if (_.isEmpty(result)) {
      throw new Error('Tài khoản hoặc mật khẩu không đúng!');
    } else {
      const user: UserModel = result[0];
      const passwordMatch = comparePasswords(password, user.password); // So sánh mật khẩu
      if (!passwordMatch) {
        throw new Error('Tài khoản hoặc mật khẩu không đúng!');
      } else {
        const payload = {
          id: user.user_id,
          user_name: user.user_name,
          displayName: user.fullname,
          balance: user.balance,
          isActivate: user.isActivate,
          roles: 'USER'
        };

        const token = await new SignJWT(payload)
          .setProtectedHeader({ alg: 'HS256' })
          .setJti(nanoid())
          .setIssuedAt()
          .setExpirationTime('5h')
          .sign(new TextEncoder().encode(getJwtSecretKey()));

        return { accessToken: token, user: payload };
      }
    }
  }

  public static async loginAdmin(username: string, password: string) {
    if (username === 'super_admin' && password === 'super_admin') {
      const payload = {
        id: 1,
        user_name: 'admin',
        displayName: 'Super Admin',
        roles: 'ADMIN'
      };

      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(new TextEncoder().encode(getJwtSecretKey()));

      return { accessToken: token, user: payload };
    }
    throw new Error('Sai thông tin');
  }

  public static async getNewsHome() {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const querry =
          'SELECT TOP 15 news_id,news_title,type,created_at FROM dbo.[9d_news] ORDER BY created_at DESC;';
        const result = await this.pool!.request().query(querry);
        if (!_.isEmpty(result.recordset)) {
          // Chuyển đổi cột created_at thành timestamp
          result.recordset.forEach((record) => {
            const timestamp = record.created_at; // Số giây kể từ Unix Epoch
            // Định dạng timestamp thành ngày tháng năm
            record.created_at = moment(timestamp).format('DD/MM/YYYY HH:mm:ss');
          });
          return result.recordset;
        }
        return [];
      }
      const querry =
        'SELECT TOP 15 news_id,news_title,type,created_at FROM dbo.[9d_news] ORDER BY created_at DESC;';
      const result = await this.pool!.request().query(querry);
      if (!_.isEmpty(result.recordset)) {
        // Chuyển đổi cột created_at thành timestamp
        result.recordset.forEach((record) => {
          const timestamp = record.created_at; // Số giây kể từ Unix Epoch
          // Định dạng timestamp thành ngày tháng năm
          record.created_at = moment(timestamp).format('DD/MM/YYYY HH:mm:ss');
        });
        return result.recordset;
      }
      return [];
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async getNewsById(id: number) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const querry = 'SELECT * FROM dbo.[9d_news] WHERE news_id = @id';
        const result = await this.pool!.request().input('id', TYPES.VarChar, id).query(querry);
        return result.recordset || null;
      }
      const querry = 'SELECT * FROM dbo.[9d_news] WHERE news_id = @id';
      const result = await this.pool!.request().input('id', TYPES.VarChar, id).query(querry);
      return result.recordset || null;
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async getProduct() {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const querry = 'SELECT * FROM dbo.[9d_KTCItems] ORDER BY created_at DESC;';
        const result = await this.pool!.request().query(querry);
        return result.recordset || null;
      }
      const querry = 'SELECT * FROM dbo.[9d_KTCItems] ORDER BY created_at DESC;';
      const result = await this.pool.request().query(querry);
      return result.recordset || null;
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async getProductById(id: string) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const querry = 'SELECT * FROM dbo.[9d_KTCItems] WHERE id = @id';
        const result = await this.pool!.request()
          .input('id', TYPES.VarChar, String(id))
          .query(querry);
        return result.recordset || null;
      }
      const querry = 'SELECT * FROM dbo.[9d_KTCItems] WHERE id = @id';
      const result = await this.pool!.request()
        .input('id', TYPES.VarChar, String(id))
        .query(querry);
      return result.recordset || null;
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async getUserByUsername(username: string) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const querry = 'SELECT * FROM dbo.[9d_users] WHERE user_name = @username';
        const result = await this.pool!.request()
          .input('username', TYPES.VarChar, username)
          .query(querry);
        return result.recordset || null;
      }
      const querry = 'SELECT * FROM dbo.[9d_users] WHERE user_name = @username';
      const result = await this.pool!.request()
        .input('username', TYPES.VarChar, username)
        .query(querry);
      return result.recordset || null;
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async getUserInfoByUsername(username: string) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const querry =
          'SELECT user_id, user_name, email, telephone,address,balance,isActivate,created_at, fullname FROM dbo.[9d_users] WHERE user_name = @username;';
        const result = await this.pool!.request()
          .input('username', TYPES.VarChar, username)
          .query(querry);
        return result.recordset[0] || null;
      }
      const querry =
        'SELECT user_id, user_name, email, telephone,address,balance,isActivate,created_at, fullname FROM dbo.[9d_users] WHERE user_name = @username;';
      const result = await this.pool!.request()
        .input('username', TYPES.VarChar, username)
        .query(querry);
      return result.recordset[0] || null;
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async addTblPass(username: string, password: string) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const queryTblPass = `INSERT INTO dbo.[Tbl_Member_Password] (userid, userpassword) VALUES (@userid, @userpassword)`;
        const addTblPass = await this.pool!.request()
          .input('userid', TYPES.NVarChar, username)
          .input('userpassword', TYPES.NVarChar, hashPasswords(password))
          .query(queryTblPass);
        return addTblPass.rowsAffected[0] || null;
      }
      const queryTblPass = `INSERT INTO dbo.[Tbl_Member_Password] (userid, userpassword) VALUES (@userid, @userpassword)`;
      const addTblPass = await this.pool!.request()
        .input('userid', TYPES.NVarChar, username)
        .input('userpassword', TYPES.NVarChar, hashPasswords(password))
        .query(queryTblPass);
      return addTblPass.rowsAffected[0] || null;
    } catch (error) {
      throw new Error('Tài khoản đã tồn tại!');
    }
  }

  public static async addBalance(username: string, balance: number) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const request = await this.pool!.request()
          .input('username', TYPES.NVarChar(60), username)
          .input('balance', TYPES.Int, balance)
          .execute('AddBalance');
        return request.rowsAffected || null;
      }
      const request = await this.pool!.request()
        .input('username', TYPES.NVarChar(60), username)
        .input('balance', TYPES.Int, balance)
        .execute('AddBalance');
      return request.rowsAffected || null;
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async subtractBalance(username: string, balance: number) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const query =
          'UPDATE dbo.[9d_users] SET balance=balance-@balance where user_name=@username';
        const result = await this.pool!.request()
          .input('username', TYPES.NVarChar(60), username)
          .input('balance', TYPES.Int, balance)
          .query(query);
        return result.recordset || null;
      }
      const query = 'UPDATE dbo.[9d_users] SET balance=balance-@balance where user_name=@username';
      const result = await this.pool!.request()
        .input('username', TYPES.NVarChar(60), username)
        .input('balance', TYPES.Int, balance)
        .query(query);
      return result.recordset || null;
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async addTransHistory(payload: ITransaction) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const query =
          'INSERT INTO dbo.[9d_history_store] (item_name, item_price, item_image, user_name, date_time) VALUES (@item_name, @item_price, @item_image, @user_name, GETDATE())';
        const result = await this.pool!.request()
          .input('item_name', TYPES.NVarChar(255), payload.itemName)
          .input('item_price', TYPES.Money, payload.itemPrice)
          .input('item_image', TYPES.NVarChar(255), payload.itemImage)
          .input('user_name', TYPES.NVarChar(60), payload.userName)
          .query(query);

        return result.recordset || null;
      }
      const query =
        'INSERT INTO dbo.[9d_history_store] (item_name, item_price, item_image, user_name, date_time) VALUES (@item_name, @item_price, @item_image, @user_name, GETDATE())';
      const result = await this.pool!.request()
        .input('item_name', TYPES.NVarChar(255), payload.itemName)
        .input('item_price', TYPES.Money, payload.itemPrice)
        .input('item_image', TYPES.NVarChar(255), payload.itemImage)
        .input('user_name', TYPES.NVarChar(60), payload.userName)
        .query(query);

      return result.recordset || null;
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async getTransactionBank() {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const query = `SELECT * FROM dbo.[9d_transaction_bank]`;
        const result = await this.pool!.request().query(query);
        const transaction: ITransactionDb[] = result.recordset;
        return transaction || [];
      }
      const query = `SELECT * FROM dbo.[9d_transaction_bank]`;
      const result = await this.pool!.request().query(query);
      const transaction: ITransactionDb[] = result.recordset;
      return transaction || [];
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async getAllUse() {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const querry = 'SELECT user_id, user_name FROM dbo.[9d_users]';
        const result = await this.pool!.request().query(querry);
        const allUsers: IAllUser[] = result.recordset;
        return allUsers || [];
      }
      const querry = 'SELECT user_id, user_name FROM dbo.[9d_users]';
      const result = await this.pool!.request().query(querry);
      const allUsers: IAllUser[] = result.recordset;
      return allUsers || [];
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async addMultipleBalances(userList: IAllUser[], mergedArray: ITransactionMbbank[]) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const logArr: any[] = [];
        const promises = mergedArray.map(async (record: ITransactionMbbank) => {
          const code = Number(record.description);
          const user = userList.find((some: any) => code === some.user_id);

          if (user) {
            if (!this.pool) {
              throw new Error('Database connection has not been established');
            }
            const request = await this.pool
              .request()
              .input('username', TYPES.NVarChar(60), user.user_name)
              .input('balance', TYPES.Int, Number(record.amount || 0))
              .execute('AddBalance');
            logArr.push(
              `Added balance for ${user.user_name} balance:${record.amount}, rows affected: ${request.rowsAffected} `
            );
            return { username: user.user_name, rowsAffected: request.rowsAffected };
          }

          return null;
        });

        const results = await Promise.all(promises);

        return { logArr, ...results };
      }
      const logArr: any[] = [];
      const promises = mergedArray.map(async (record: ITransactionMbbank) => {
        const code = Number(record.description);
        const user = userList.find((some: any) => code === some.user_id);

        if (user) {
          if (!this.pool) {
            throw new Error('Database connection has not been established');
          }
          const request = await this.pool
            .request()
            .input('username', TYPES.NVarChar(60), user.user_name)
            .input('balance', TYPES.Int, Number(record.amount || 0))
            .execute('AddBalance');
          logArr.push(
            `Added balance for ${user.user_name} balance:${record.amount}, rows affected: ${request.rowsAffected} `
          );
          return { username: user.user_name, rowsAffected: request.rowsAffected };
        }

        return null;
      });

      const results = await Promise.all(promises);

      return { logArr, ...results };
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async addMultipleTransactionBank(payload: ITransactionMbbank[]) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const query = `INSERT INTO dbo.[9d_transaction_bank]
        (transaction_bank_id, transaction_time, transaction_description, transaction_code, amount, status, user_id, create_at)
        VALUES
        (@transaction_bank_id, @transaction_time, @transaction_description, @transaction_code, @amount, @status, @user_id, GETDATE())`;

        const promises = payload.map(async (record: ITransactionMbbank) => {
          const result = await this.pool!.request()
            .input('transaction_bank_id', TYPES.NVarChar(100), record.transactionID)
            .input('transaction_time', TYPES.NVarChar, record.transactionDate)
            .input('transaction_description', TYPES.NVarChar(255), `NAP9D${record.description}`)
            .input('transaction_code', TYPES.NVarChar(20), record.description)
            .input('amount', TYPES.Int, record.amount)
            .input('status', TYPES.NVarChar(20), 'success')
            .input('user_id', TYPES.Int, Number(record.description))
            .query(query);
          const logData = `Added transaction for ${record.description} balance:${record.amount},transaction_bank_id:${record.transactionID} rows affected: ${result.rowsAffected} `;
          if (result.rowsAffected) {
            return { logData, rowsAffected: result.rowsAffected };
          }
          return null;
        });

        return await Promise.all(promises);
      }
      const query = `INSERT INTO dbo.[9d_transaction_bank]
        (transaction_bank_id, transaction_time, transaction_description, transaction_code, amount, status, user_id, create_at)
        VALUES
        (@transaction_bank_id, @transaction_time, @transaction_description, @transaction_code, @amount, @status, @user_id, GETDATE())`;

      const promises = payload.map(async (record: ITransactionMbbank) => {
        const result = await this.pool!.request()
          .input('transaction_bank_id', TYPES.NVarChar(100), record.transactionID)
          .input('transaction_time', TYPES.NVarChar, record.transactionDate)
          .input('transaction_description', TYPES.NVarChar(255), `NAP9D${record.description}`)
          .input('transaction_code', TYPES.NVarChar(20), record.description)
          .input('amount', TYPES.Int, record.amount)
          .input('status', TYPES.NVarChar(20), 'success')
          .input('user_id', TYPES.Int, Number(record.description))
          .query(query);
        const logData = `Added transaction for ${record.description} balance:${record.amount},transaction_bank_id:${record.transactionID} rows affected: ${result.rowsAffected} `;
        if (result.rowsAffected) {
          return { logData, rowsAffected: result.rowsAffected };
        }
        return null;
      });

      return await Promise.all(promises);
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }

  public static async getTransactionBankById(id: number) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const querry =
          'SELECT * FROM dbo.[9d_transaction_bank] WHERE user_id = @id ORDER BY create_at DESC;';
        const result = await this.pool!.request()
          .input('id', TYPES.VarChar, String(id))
          .query(querry);
        return result.recordset || [];
      }
      const querry =
        'SELECT * FROM dbo.[9d_transaction_bank] WHERE user_id = @id ORDER BY create_at DESC;';
      const result = await this.pool!.request()
        .input('id', TYPES.VarChar, String(id))
        .query(querry);
      return result.recordset || [];
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }
}

export default NineDragonsAccount;
