import Router from "express";
const router = Router();

const userData = {
    email: "",
    password: ""
}

import { hashPw, isSame } from "./../util/passwordUtil.js";


router.post("/auth/logout", (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Error while logging out:", error);
            res.status(500).send({ data: "Failed to log out" });
        } else {
            res.send({ data: "Logged out" });
        }
    });
});

router.post("/auth/signup", async (req, res) => {
    userData.email = req.body.email;
    userData.password = await hashPw(req.body.password);
    if(userData.email && userData.password){
        res.send({ data: `true` });
    } else {
        res.send({ data: "Missing fields" })
    }
});

router.post("/auth/login", async (req, res) => {

    const authConfirmation = await isSame(req.body.password, userData.password)
    
    if(req.body.email === userData.email && authConfirmation){
        req.session.user = {
            email: userData.email,
        };
        res.send({ data: "correct" });
    } else if (req.body.email !== userData.email){
        res.send({ data: "Wrong username" });
    } else {
        res.send({ data: "Wrong password" });
    }
});

router.post("/auth/forgotPassword", (req, res) => {
    const email = req.body.email;
});


export default router;