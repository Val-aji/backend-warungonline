import clientProductsModels from "../../models/clientProductsModels.js"
import { viewSuccess, viewError
 } from "./view.js"

import { checkout } from "../kodePesananControllers.js"


//hanya untuk antrian
export const transaksi = async(req, res) => {

    try { 
        const {email, kodePesanan, tanggalPesanan, dataBody} = req.body
        const data = await clientProductsModels.findOne({
            where: {email},
            attributes: ["id", "transaksi"]
        })

        if(!data) {
            viewError(res, 404, "email tidak ditemukan")
            return false
        } else {
            const {transaksi} = data.dataValues
            
            const result = await clientProductsModels.findOne({
                attributes: ["id", "transaksi"],
                where: {email}
            })

            const jumlahProduk = JSON.parse(result.transaksi).filter(i => i.status === "antrian")
            let differenceMinutes = 0
            let differenceHours = 0
            if(jumlahProduk.length > 0  && jumlahProduk.length <= 3) {
                const menit = jumlahProduk[0].estimasi.split(" ")[1].split(":")[1]
                differenceMinutes += parseInt(menit)
                differenceHours += jumlahProduk.length 
            } else if(jumlahProduk.length === 0) {
                differenceMinutes += 0
                differenceHours += 1
            } else if(jumlahProduk.length > 3) {
                viewError(res, 400, "maksimal antrian 3")
                return false
            }
            
            const newTime = new Date().toLocaleString("ID-id")
            let [bulan, tanggal, tahun] =  newTime.split(" ")[0].split("/")
            let [jam, menit, detik] = newTime.split(" ")[1].split(".")
            jam = parseInt(jam) + differenceHours
            menit = parseInt(menit) + differenceMinutes
            if(menit > 60) {
                menit -= 60
                jam += 1
            }

            if(jam >= 24) {
                viewError(res, 400, "batas waktu checkout melebihi batas")
                return false
            }
            const estimasi = `${bulan}/${tanggal}/${tahun} ${jam}:${menit}:${detik}`

            const newTransaksi = {kodePesanan, tanggalPesanan, status: "antrian", estimasi }
    
            if(!transaksi || transaksi.length === 0 || transaksi == "[]") {
                const data = await clientProductsModels.update(
                    {transaksi: [newTransaksi]},
                    {where: {email}}
                )
            } else {
                const listTransaksi = [...JSON.parse(transaksi), newTransaksi]
                await clientProductsModels.update(
                    {transaksi: listTransaksi},
                    {where: {email}},
                )
            }
            checkout(dataBody)
            viewSuccess(res, "checkout berhasil", newTransaksi)
        }

    } catch (error) {
        console.log(error)
        viewError(res, 400, error.message)

    }

}


export const getDataTransaksi = async(req, res) => {
    const {email} = req.body
    try {
        const data = await clientProductsModels.findAll(
            {attributes: ["transaksi", "id"]},
            {where: {email}}
        )        
        viewSuccess(res, "Get data transaksi Success", data)
    } catch (error) {
        viewError(res, 404, error.message)
    }
}



