import express from "express";
import {
    getTransaksiByKode,
    getTransaksi
} from "../controllers/kodePesananControllers.js"

const router = express.Router()


router.post("/getTransaksi/Kode", getTransaksiByKode)

router.post("/getTransaksi", getTransaksi)

export default router