import { rateLimit } from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min in milliseconds
  max: 20,
  message: 'You have exceeded the 20 requests in 1 minute limit!',
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
