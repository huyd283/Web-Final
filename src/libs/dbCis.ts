import { ConnectionPool, TYPES } from 'mssql';

import { Env } from '@/libs/Env.mjs';
import type { IProcedure } from '@/types/product';

const dbConfig = {
  user: Env.DATABASE_USERNAME || '',
  password: Env.DATABASE_PASSWORD || '',
  server: Env.DATABASE_URL || '',
  database: 'CIS_DB' || '',
  options: {
    instancename: 'SQLEXPRESS',
    trustedconnection: true,
    trustServerCertificate: true,
    providerName: 'System.Data.SqlClient',
    encrypt: false
  }
};

class DatabaseCis {
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

  public static async executeStoredProcedure(payload: IProcedure) {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const result = await this.pool!.request()
          .input('user_id', TYPES.VarChar(60), String(payload.user_id))
          .input('cart_itemCode', TYPES.Int, Number(payload.cart_itemCode))
          .input('game_server', TYPES.TinyInt, payload.game_server)
          .input('item_price', TYPES.Int, payload.item_price)
          .output('order_idx', TYPES.Int)
          .output('v_error', TYPES.TinyInt)
          .execute('Sp_Purchase_Using');
        return {
          order_idx: result.output.order_idx,
          v_error: result.output.v_error
        };
      }
      const result = await this.pool!.request()
        .input('user_id', TYPES.VarChar(60), String(payload.user_id))
        .input('cart_itemCode', TYPES.Int, Number(payload.cart_itemCode))
        .input('game_server', TYPES.TinyInt, payload.game_server)
        .input('item_price', TYPES.Int, payload.item_price)
        .output('order_idx', TYPES.Int)
        .output('v_error', TYPES.TinyInt)
        .execute('Sp_Purchase_Using');
      return {
        order_idx: result.output.order_idx,
        v_error: result.output.v_error
      };
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }
}

export default DatabaseCis;
