import redis from "redis";
import credentials from "../data/credentials.json" assert { type: "json" };

// redis://<username>:<password>@redis-18091.c300.eu-central-1-1.ec2.cloud.redislabs.com:18091

const url = `redis://${credentials.REDIS_USERNAME}:${credentials.REDIS_PASSWORD}@redis-18091.c300.eu-central-1-1.ec2.cloud.redislabs.com:18091`;

const client = redis.createClient({ url });

client.on("connect", () => {
  console.log("[STATUS] Connected to Redis");
});

client.connect();

export default client;
