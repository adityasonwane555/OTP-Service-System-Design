import crypto from "crypto";

export function generateOTP(length = 6) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length);

  return crypto.randomInt(min, max).toString();
}