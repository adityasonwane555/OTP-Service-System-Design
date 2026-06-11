import { createOTP, verifyOTP } from "../services/otp.service.js";

export async function sendOTP(req, res) {
  try {
    const { target } = req.body;

    const result = await createOTP(target);

    return res.status(201).json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function verifyOTPController(req, res) {
  try {
    const { requestId, otp } = req.body;

    const result = await verifyOTP(
      requestId,
      otp
    );

    return res.status(200).json({
      success: true,
      ...result,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}