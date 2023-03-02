import express from "express";
import {
    getAllData,
    getDataByKategori,
    insertProduk,
    removeDataById,
    getKodeProduk
} from "../controllers/produkControllers.js"

const router = express.Router()

router.get("/", getAllData)
router.get("/kategori/:kategori", getDataByKategori)
router.post("/kodeProduk", getKodeProduk)
router.post("/", insertProduk)
router.delete("/:id", removeDataById)

export default router