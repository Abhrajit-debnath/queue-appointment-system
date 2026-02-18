import { createClient } from "redis";

let redisClient;

export async function initializeClient() {
  if (redisClient) {
    return redisClient;
  }

  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error("REDIS_URL is not defined");
  }

  redisClient = createClient({ url: redisUrl });

  redisClient.on("error", (err) => {
    console.error("Redis Client Error:", err);
  });

  await redisClient.connect();
  console.log("Connected to Redis");

  return redisClient;
}
