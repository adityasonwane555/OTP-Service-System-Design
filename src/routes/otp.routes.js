import express from "express";

import {
  sendOTP,
  verifyOTPController
} from "../controllers/otp.controller.js";

const router = express.Router();

router.post("/send", sendOTP);

router.post(
  "/verify",
  verifyOTPController
);

export default router;