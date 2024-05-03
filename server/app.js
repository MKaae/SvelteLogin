import "dotenv/config";

import express from "express";
const app = express();

app.use(express.json());

import cors from "cors";

const corsOptions = {
    credentials: true,
    origin: "http://localhost:5173"
}
app.use(cors(corsOptions));

import session from "express-session";
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

import helmet from "helmet";
app.use(helmet());

import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 50, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(limiter)

const authRateLimiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 30 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use("auth", authRateLimiter);

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

app.use("api/rooms", limiter);

import roomsRouter from "./routers/roomsRouter.js";
app.use(roomsRouter);


const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log(`Server is running on`, PORT));