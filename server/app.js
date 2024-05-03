import "dotenv/config";

import express from "express";
const app = express();

import cors from "cors";

const corsOptions = {
    credentials: true,
    origin: "http://localhost:5173"
}
app.use(cors(corsOptions));;

app.use(express.json());

import session from "express-session";
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

//prepared for chat will also implement escape-html, will wait for sockets class before i try
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

app.use("/api/login", authRateLimiter);

import authRouter from "./routers/authRouter.js";
app.use(authRouter);

app.use("/api/room", limiter);

import roomRouter from "./routers/roomRouter.js";
app.use(roomRouter);


const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log(`Server is running on`, PORT));
