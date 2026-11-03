import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';

export * from './config/db.js';
export * from './config/env.js';
export * from './models/Course.js';
export * from './models/Batch.js';
export * from './models/Enquiry.js';
export * from './models/Student.js';
export * from './models/Trainer.js';
export * from './models/Testimonial.js';
export * from './models/Post.js';
export * from './models/Setting.js';
export * from './models/User.js';
export * from './controllers/enquiryController.js';
export * from './controllers/registrationController.js';
export * from './controllers/courseController.js';
export * from './controllers/blogController.js';

export async function initBackend() {
  console.log(`[RK Academy Backend] Starting in ${ENV.NODE_ENV} mode...`);
  try {
    await connectDB();
    console.log('[RK Academy Backend] Database and services initialized.');
  } catch (err) {
    console.warn('[RK Academy Backend] Database connection deferred until active request:', err);
  }
}
