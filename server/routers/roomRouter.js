import Router from "express";
import { requireAuth } from "./authMiddleware.js";

const router = Router();

const room = 1;

router.get("/api/room", requireAuth, (req, res) => {
    res.send({ data: room });
});

export default router;