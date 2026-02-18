import { initializeClient } from "../../config.redis.js";

let redis;

const getRedis = async () => {
  if (!redis) {
    redis = await initializeClient();
  }
  return redis;
};

const checkQueueInCache = async (req, res, next) => {
  const { businessId } = req.params;

  try {
    const redisClient = await getRedis();
    const value = await redisClient.get(`Queue:${businessId}`);

    if (!value) return next();

    return res.status(200).json({
      message: "Queue fetched from cache",
      queue: JSON.parse(value),
    });
  } catch (error) {
    console.error(error);
    return next();
  }
};

const setQueueInCache = async (id, data) => {
  try {
    const redisClient = await getRedis();
    await redisClient.set(`Queue:${id}`, JSON.stringify(data), {
      EX: 60 * 5,
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { setQueueInCache, checkQueueInCache };
