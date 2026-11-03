import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rk_academy',
  RESEND_API_KEY: process.env.RESEND_API_KEY || '',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'rkacademykili@gmail.com',
  ACADEMY_PHONE: '074 0224 355',
  ACADEMY_WHATSAPP: '94740224355',
  ACADEMY_ADDRESS: 'A-9 Road, Near Theresamma Kovil, Kilinochchi',
};
