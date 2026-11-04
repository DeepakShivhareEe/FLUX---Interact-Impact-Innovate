import dns from 'node:dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);
dns.setDefaultResultOrder('ipv4first');

import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

process.on("unhandledRejection", (reason, promise) => {
  console.error("⚠️ Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("⚠️ Uncaught Exception:", err);
});
mongoose.connection.on("error", (err) => {
  console.error("⚠️ Mongoose connection error:", err.message);
});
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ Mongoose connection disconnected.");
});

import auth from "./routes/auth.js";
import detailed from "./routes/getDetail.js";
import judge from "./routes/judge.js";
import lead from "./routes/leader.js";
import ideathonTeam from "./routes/ideathonTeam.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import applications from "./routes/applications.js";
import judgeAuthRoutes from "./routes/judgeAuth.js";
import sheLeadsRoutes from "./routes/sheLeadsRoutes.js";
import bytebrawlRoutes from "./routes/bytebrawlRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import chatRoutes from "./routes/chat.js";

const app = express();
app.set("trust proxy", 1);

// Security Headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// Middleware
app.use(express.json());

// Allowed CORS origins
const defaultAllowedOrigins = [
  "https://flux.org.in",
  "https://www.flux.org.in",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

// Normalize origin
const normalizeOrigin = (value = "") =>
  value.trim().replace(/\/$/, "");

// Get allowed origins from environment or use defaults
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : defaultAllowedOrigins
)
  .map(normalizeOrigin)
  .filter(Boolean);

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an origin
    // Example: Postman, curl, mobile apps
    if (!origin) {
      return callback(null, true);
    }

    const normalized = normalizeOrigin(origin);
    let isVercel = false;
    try {
      const url = new URL(origin);
      isVercel = url.hostname.endsWith(".vercel.app");
    } catch {
      // ignore
    }

    if (allowedOrigins.includes(normalized) || isVercel) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// ==================== DATABASE CONNECTION ====================

let dbConnectionPromise = null;
export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  if (!dbConnectionPromise) {
    if (process.env.MONGO_URI) {
      dbConnectionPromise = mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
          console.log("✅ CONNECTED TO DB");
        })
        .catch((err) => {
          dbConnectionPromise = null;
          throw err;
        });
    } else {
      console.log(
        "⚠️ No MONGO_URI specified; running server in local storage mode."
      );
      return;
    }
  }
  await dbConnectionPromise;
};

// Ensure DB connection for requests in serverless environments
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    next(error);
  }
});

// ==================== ROUTES ====================

app.use("/api/auth", auth);

app.use("/api/details", detailed);

app.use("/api/judge", judge);

app.use("/api/leader", lead);

app.use("/api/ideathonTeam", ideathonTeam);

app.use("/api/upload", uploadRoutes);

app.use("/api/applications", applications);

app.use("/api/judge-auth", judgeAuthRoutes);

app.use("/api/she-leads", sheLeadsRoutes);

app.use("/api/events/bytebrawl-hacktoberfest", bytebrawlRoutes);

app.use("/api/admin", adminRoutes);

// FLUX AI chatbot — Groq-powered, retrieval-grounded over chatbot-content/
app.use("/api/chat", chatRoutes);

// ==================== HEALTH CHECK ====================

app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

// ==================== START SERVER (LOCAL DEV) ====================

if (process.env.VERCEL !== "1" && process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 4000;
  connectDB().finally(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);

      const selfPingUrl = process.env.SELF_PING_URL;
      if (selfPingUrl) {
        // Self ping every 10 minutes
        setInterval(() => {
          fetch(selfPingUrl)
            .then(() => {
              console.log("🔁 Pinged self!");
            })
            .catch(() => {
              console.log("❌ Self ping failed.");
            });
        }, 1000 * 60 * 10);
      }
    });
  });
}

// Export app for Vercel serverless integration
export default app;