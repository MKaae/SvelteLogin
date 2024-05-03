import Router from "express";
const router = Router();

const rooms = [
    { name: "chatroom1" },
    { name: "chatroom2" },
    { name: "chatroom3" },
    { name: "chatroom4" },
    { name: "chatroom5" },
]

router.get("/api/rooms", (req, res) => {
    res.send({ data: rooms })
});

export default router;