// Hàm tính toán MD5 hash
import * as crypto from 'crypto';
import iconv from 'iconv-lite';
import { get, set } from 'lodash';

const rateLimit = 10; // Number of allowed requests per minute

const rateLimiter: Record<string, number[]> = {};
const maxCacheSize = 100; // Số lượng timestamps tối đa cho mỗi địa chỉ IP

export function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberWithDot(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function decodeCP1258(cp1258EncodedText: string): string {
  const buffer = Buffer.from(cp1258EncodedText, 'binary');
  return iconv.decode(buffer, 'win1258');
}

// Hàm tính toán MD5 hash
function getMD5(str: string): string {
  const md5 = crypto.createHash('md5');
  return md5.update(str, 'utf8').digest('hex');
}

// Hàm so sánh mật khẩu đã mã hóa với mật khẩu người dùng đã nhập
export function comparePasswords(inputPassword: string, hashedPassword: string): boolean {
  const inputPasswordHashed = getMD5(inputPassword);
  return inputPasswordHashed === hashedPassword;
}

export function hashPasswords(inputPassword: string) {
  return getMD5(inputPassword);
}

export const rateLimiterMiddleware = (ip: string) => {
  const now = Date.now();
  const windowStart = now - 60 * 1000; // 1 minute ago

  // Lấy timestamps từ cache
  const requestTimestamps = get(rateLimiter, ip, []);

  // Loại bỏ timestamps cũ hơn cacheTime
  const recentTimestamps = requestTimestamps.filter((timestamp) => timestamp > windowStart);

  // Giới hạn kích thước mảng timestamps
  if (recentTimestamps.length >= maxCacheSize) {
    recentTimestamps.splice(0, recentTimestamps.length - maxCacheSize);
  }

  // Cập nhật cache với timestamps mới
  set(rateLimiter, ip, recentTimestamps.concat(now));

  return recentTimestamps.length <= rateLimit;
};

export const rateLimiterMiddlewareByCount = (ip: string, limit: number) => {
  const now = Date.now();
  const windowStart = now - 60 * 1000; // 1 minute ago

  // Lấy timestamps từ cache
  const requestTimestamps = get(rateLimiter, ip, []);

  // Loại bỏ timestamps cũ hơn cacheTime
  const recentTimestamps = requestTimestamps.filter((timestamp) => timestamp > windowStart);

  // Giới hạn kích thước mảng timestamps
  if (recentTimestamps.length >= maxCacheSize) {
    recentTimestamps.splice(0, recentTimestamps.length - maxCacheSize);
  }

  // Cập nhật cache với timestamps mới
  set(rateLimiter, ip, recentTimestamps.concat(now));

  return recentTimestamps.length <= limit;
};

export function getCurrentDomain() {
  const parts = window.location.hostname.split('.');
  parts.shift();
  return parts.join('.');
}

export function findIdWithTransaction(text: string) {
  const data = text.match(/NAP9D(\d+)\./);
  if (data) {
    return data[1];
  }
  return null;
}

export async function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
