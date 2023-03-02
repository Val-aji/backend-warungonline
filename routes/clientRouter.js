import express from "express";
import {
    login,
    register,
    logout,
    getToken
} from "../controllers/clientControllers.js"


const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/token", getToken)
router.post("/logout", logout)
export default router

