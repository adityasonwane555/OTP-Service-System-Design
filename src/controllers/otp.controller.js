import { createOTP, verifyOTP } from "../services/otp.service.js";

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

export async function verifyOTPController(req, res) {
  try {
    const requestId = req.body?.requestId;
    const otp = req.body?.otp;

    if (!requestId || !otp) {
      return res.status(400).json({
        success: false,
        message: "requestId and otp are required",
      });
    }

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