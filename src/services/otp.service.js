import { v4 as uuidv4 } from "uuid";

import redisClient from "../config/redis.js";
import { generateOTP } from "../utils/otp.js";
import { hashOTP } from "../utils/hash.js";

const OTP_TTL_SECONDS = 300;

export async function createOTP(target) {
  const otp = generateOTP();

  const requestId = uuidv4();

  const otpHash = hashOTP(otp);

  const redisKey = `otp:${requestId}`;

  const payload = {
    target,
    otpHash,
    attempts: 0,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };

  await redisClient.set(
    redisKey,
    JSON.stringify(payload),
    {
      EX: OTP_TTL_SECONDS,
    }
  );

  return {
    requestId,
    otp, // temporary for testing
  };
}