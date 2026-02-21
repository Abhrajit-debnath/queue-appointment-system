import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 60000 * 10,
  limit: 50,
  standardHeaders: false,
  legacyHeaders: true,
  ipv6Subnet: 56,
  message: "Too many requests, please try again later",
  handler: (req, res, options) => {
    res.status(options.statusCode).send(options.message);
  },
});
