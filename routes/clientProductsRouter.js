import express from "express"
import {
    getAllData,
    getDataKeranjang,
    insertDataKeranjang
} from "../controllers/clientProducts/keranjang.js"

import { transaksi, getDataTransaksi } from "../controllers/clientProducts/transaksi.js"
import { incrementPoint } from "../controllers/clientProducts/point.js"

const router = express.Router()


router.get("/", getAllData)

router.post("/keranjang", getDataKeranjang)
router.put("/keranjang", insertDataKeranjang)

router.post("/transaksi", getDataTransaksi)
router.put("/transaksi", transaksi)

router.put("/point", incrementPoint)
export default router

