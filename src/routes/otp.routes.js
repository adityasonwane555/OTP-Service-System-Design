import express from "express";

import {
  sendOTP,
  verifyOTPController
} from "../controllers/otp.controller.js";

import {
  validateSendOTP,
  validateVerifyOTP
} from "../middleware/otp.validation.js";

const router = express.Router();

router.post(
  "/send",
  validateSendOTP,
  sendOTP
);

router.post(
  "/verify",
  validateVerifyOTP,
  verifyOTPController
);

export default router;