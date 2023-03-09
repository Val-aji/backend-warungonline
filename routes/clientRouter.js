import express from "express";
import {
    login,
    register,
    logout,
    getToken,
    getIdentitas
} from "../controllers/clientControllers.js"


const router = express.Router()

router.post("/register", register)
router.post("/getIdentitas", getIdentitas)
router.post("/login", login)
router.post("/token", getToken)
router.post("/logout", logout)
export default router

