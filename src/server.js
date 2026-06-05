import express from "express";
import dotenv from "dotenv";

import redisClient from "./config/redis.js";

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to Redis before starting the server
    await redisClient.connect();

    /*
     * Health Check Endpoint
     */
    app.get("/health", (req, res) => {
      return res.status(200).json({
        success: true,
        message: "OTP Service Healthy",
      });
    });

    /*
     * Redis Connectivity Test
     */
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

    /*
     * Redis TTL Test
     */
    app.get("/ttl-test", async (req, res) => {
      try {
        await redisClient.set("otp:test", "123456", {
          EX: 30, // expires in 30 seconds
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