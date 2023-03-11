import clientProductsModels from "../../models/clientProductsModels.js"
import { viewSuccess, viewError
 } from "./view.js"
import { checkout } from "../kodePesananControllers.js"


//hanya untuk antrian
export const transaksi = async(req, res) => {

    try { 
        const {email, kodePesanan, tanggalPesanan, dataTransaksi} = req.body
        const data = await clientProductsModels.findOne({
            where: {email},
            attributes: ["id", "transaksi", "keranjang"],
        })

        
        if(!data) {
            viewError(res, 404, "email tidak ditemukan")
            return false
        } else {
            
            const {transaksi, keranjang} = data

            const cek = typeof transaksi == "string" ? JSON.parse(transaksi) : transaksi
            
            const jumlahProduk = cek.filter(i => i.status === "antrian")
            let differenceMinutes = 0
            let differenceHours = 0

            if(jumlahProduk.length > 0  && jumlahProduk.length <= 3) {
                const menit = jumlahProduk[0].estimasi.split(" ")[1].split(":")[1]
                differenceMinutes += parseInt(menit)
                differenceHours += jumlahProduk.length 
            } else if(jumlahProduk.length === 0) {
                differenceHours += 1
            } 
            else if(jumlahProduk.length > 100) {
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

            // if(jam >= 24) {
            //     viewError(res, 400, "batas waktu checkout melebihi batas")
            //     return false
            // }

            const estimasi = `${bulan}/${tanggal}/${tahun} ${jam}:${menit}:${detik}`

            const newTransaksi = {
                kodePesanan, 
                tanggalPesanan, 
                status: "antrian", 
                estimasi
            }
    
            
            const resCek = checkout(JSON.parse(dataTransaksi), {kodePesanan, email, tanggalPesanan, estimasi, status: "antrian"})
            
            
            if(resCek) {
                if(!transaksi || transaksi.length === 0 || transaksi == "[]") {
                    const data = await clientProductsModels.update(
                        {transaksi: [newTransaksi]},
                        {where: {email}}
                    )
                } else {
                    const transaksiNew = typeof transaksi == "string" ? JSON.parse(transaksi) : transaksi
                    const listTransaksi = [...transaksiNew, newTransaksi]
                    try {
                        await clientProductsModels.update(
                            {transaksi: listTransaksi},
                            {where: {email}},
                        )    
                    } catch (error) {
                        console.log(error)
                    }
                    
                }
                
                const listProduk = typeof dataTransaksi == "string" ? JSON.parse(dataTransaksi).listProduk : dataTransaksi.listProduk
                const arrList = listProduk.map(item => item.kodeProduk)
                const newKeranjangClient = keranjang.filter(item => {
                    return !arrList.includes(item.kodeProduk)
                })
                
                await clientProductsModels.update(
                    {keranjang: newKeranjangClient},
                    {where: {email}}
                )
                viewSuccess(res, "checkout berhasil", newTransaksi)
            } else {
                viewError(res, "checkout gagal", newTransaksi)
            }
        }

    } catch (error) {
        console.log(error)
        viewError(res, 400, error.message)

    }

}


export const getDataTransaksi = async(req, res) => {
    
    try {
        const {email} = req.body
        const data = await clientProductsModels.findAll(
            {attributes: ["transaksi", "id"]},
            {where: {email}}
        )        
        viewSuccess(res, "Get data transaksi Success", data)
    } catch (error) {
        viewError(res, 404, error.message)
    }
}



