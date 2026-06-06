import { createOTP } from "../services/otp.service.js";

export async function sendOTP(req, res) {
  try {
    const target = req.body?.target;

    if (!target) {
      return res.status(400).json({
        success: false,
        message: "Target is required",
      });
    }

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