export function validateSendOTP(req, res, next) {
  const target = req.body?.target;

  if (!target) {
    return res.status(400).json({
      success: false,
      message: "Target is required",
    });
  }

  if (typeof target !== "string") {
    return res.status(400).json({
      success: false,
      message: "Target must be a string",
    });
  }

  if (target.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Target cannot be empty",
    });
  }

  next();
}

export function validateVerifyOTP(req, res, next) {
  const requestId = req.body?.requestId;
  const otp = req.body?.otp;

  if (!requestId || !otp) {
    return res.status(400).json({
      success: false,
      message: "requestId and otp are required",
    });
  }

  if (typeof requestId !== "string") {
    return res.status(400).json({
      success: false,
      message: "requestId must be a string",
    });
  }

  if (typeof otp !== "string") {
    return res.status(400).json({
      success: false,
      message: "otp must be a string",
    });
  }

  next();
}