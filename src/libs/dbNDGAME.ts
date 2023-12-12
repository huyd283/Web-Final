import { ConnectionPool } from 'mssql';

import { Env } from '@/libs/Env.mjs';

const dbConfig = {
  user: Env.DATABASE_USERNAME || '',
  password: Env.DATABASE_PASSWORD || '',
  server: Env.DATABASE_URL || '',
  database: 'ND_GAME_0' || '',
  options: {
    instancename: 'SQLEXPRESS',
    trustedconnection: true,
    trustServerCertificate: true,
    providerName: 'System.Data.SqlClient',
    encrypt: false
  }
};

class Database {
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

  public static async getRankInfo() {
    try {
      if (!this.pool || !this.pool.connected) {
        await this.connect();
        const querry =
          'SELECT TOP 100 * FROM dbo.VIEW_RANK_INFO ORDER BY inner_level DESC, level_rate DESC , levelup_time ASC';
        const result = await this.pool!.request().query(querry);
        return result.recordset;
      }
      const querry =
        'SELECT TOP 100 * FROM dbo.VIEW_RANK_INFO ORDER BY inner_level DESC, level_rate DESC , levelup_time ASC';
      const result = await this.pool!.request().query(querry);
      return result.recordset;
    } catch (error) {
      throw new Error('An internal server error occurred');
    }
  }
}

export default Database;
