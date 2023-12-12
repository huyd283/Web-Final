import { ConnectionPool, TYPES } from 'mssql';

import { Env } from '@/libs/Env.mjs';

interface PoolConfig {
  user: string;
  password: string;
  server: string;
  database: string;
  options: {
    instancename: string;
    encrypt?: boolean;
    trustedconnection: boolean;
    trustServerCertificate: boolean;
    providerName: string;
  };
  pool: {
    max: number;
    min: number;
    idleTimeoutMillis: number;
  };
}

const dbConfig: PoolConfig = {
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

export async function connectAndExecute(queryFunction: (pool: ConnectionPool) => Promise<void>) {
  let pool: ConnectionPool | undefined;
  try {
    pool = await new ConnectionPool(dbConfig).connect();
    await queryFunction(pool);
  } catch (error) {
    throw new Error('Failed to connect to the database', error.message);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

export async function getProduct(pool: ConnectionPool) {
  try {
    const querry =
      "SELECT id,itemid,itemname,itemimages,itemprice,itemdescription FROM dbo.[9d_KTCItems] WHERE delete_flag ='0' ORDER BY updated_at DESC;";
    const result = await pool.request().query(querry);
    return result.recordset || null;
  } catch (error) {
    throw new Error('An internal server error occurred');
  }
}

export async function getUserInfoByUsername(pool: ConnectionPool, username: string) {
  try {
    const querry =
      'SELECT user_id, user_name, email, telephone,address,balance,isActivate,created_at, fullname FROM dbo.[9d_users] WHERE user_name = @username;';
    const result = await pool.request().input('username', TYPES.VarChar, username).query(querry);
    return result.recordset[0] || null;
  } catch (error) {
    throw new Error('An internal server error occurred');
  }
}
