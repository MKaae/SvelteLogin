import db from "../database/connection.js";
import Router from "express";
const router = Router();

import { hashPw, isSame } from "./../util/passwordUtil.js";


router.post("/api/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Error while logging out:", error);
            res.status(500).send({ data: "Failed to log out" });
        } else {
            res.send({ data: "Logged out" });
        }
    });
});

import { sendEmail } from "../emailService/emailService.js";

router.post("/api/signup", async (req, res) => {
    const email = req.body.email;
    
    const checkEmailUnique = await db.get(`SELECT * FROM chatters WHERE email = ?`, [email])
    
    if(checkEmailUnique){
        return res.send({ data: "Email already exists"});
    }
    
    const password = await hashPw(req.body.password);

    if(email && password){
        const result = await db.run(`INSERT INTO chatters (email, password) VALUES(?, ?)`, [email, password])
        sendEmail(email);
        res.send({ lastId: result.lastID });
    } else {
        res.send({ data: "Missing fields" })
    }
});

router.post("/api/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await db.get(`SELECT * FROM chatters WHERE email = ?`, [email])
    
    const authConfirmation = await isSame(password, user.password)
    
    if(email === user.email && authConfirmation){
        req.session.user = {
            email: email
        };
        res.send({ data: "correct" });
    } else {
        res.send({ data: "Wrong password" });
    }
});

export default router;