import express from "express";
import dotenv from "dotenv";

import redisClient from "./config/redis.js";
import otpRoutes from "./routes/otp.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/otp", otpRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await redisClient.connect();

    app.get("/health", (req, res) => {
      return res.status(200).json({
        success: true,
        message: "OTP Service Healthy",
      });
    });

    app.get("/redis-test", async (req, res) => {
      try {
        await redisClient.set("test-key", "hello-redis");

        const value = await redisClient.get("test-key");

        return res.status(200).json({
          success: true,
          value,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      }
    });

    app.get("/ttl-test", async (req, res) => {
      try {
        await redisClient.set("otp:test", "123456", {
          EX: 30,
        });

        return res.status(200).json({
          success: true,
          message: "OTP stored for 30 seconds",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          error: error.message,
        });
      }
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();