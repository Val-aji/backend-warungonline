import kodePesananModels from "../models/kodePesananModels.js"
import { viewError, viewSuccess } from "./clientProducts/view.js"

export const checkout = async(data, body) => {

    try {
        const {email, kodePesanan, tanggalPesanan, estimasi, status} = body
        const {metode, listProduk, subtotal, jumlahProduk, identitasPenerima} = data

        const {namaLengkap, nomorWhatsapp, alamat, namaJalan} = identitasPenerima


        const newAlamat = namaJalan + " " + alamat.slice().reverse().join(" ")
        const dateTime = new Date().toLocaleString("ID-id")
        const obj = {
            email,
            kodePesanan,
            estimasi,
            namaLengkap,
            nomorWhatsapp,
            alamat: newAlamat,
            metode,
            status,
            listProduk,
            jumlahProduk,
            subtotal,
            tanggalPesanan: dateTime,
        }

        await kodePesananModels.create(obj)
        return true    
    } catch (error) {
        console.log({error})
        return false
    }
    
    
}


export const getTransaksiByKode = async(req, res) => {
    try {
        const {email, kodePesanan} = req.body
        const result = await kodePesananModels.findOne({
            where: {email, kodePesanan}
        })

        if(result.length <= 0 || !result) {
            viewError(res, 404, "Kode Pesanan tidak di temukan")
            return false
        } else {
            viewSuccess(res, "Get Transaksi By Kode Berhasil", result)
            return false
        }

    } catch (error) {
        viewError(res, 400, "Get Transaksi By Kode Error")
    }
}



export const getTransaksi = async (req, res) => {
    try {
        const {email} = req.body
        const result = await kodePesananModels.findAll({
            where: {email},
        })
        
        
        if(!result || result.length <= 0) {
            viewError(res, 404, "email tidak di kenali")
            return false
        } else {
            viewSuccess(res, "Get Transaksi Sukses", result)
            return false    
        }

    } catch (error) {
        viewError(res, 404, error.message)
    }
}


export const getKodePesanan = async() => {
    try {
        const result = await kodePesananModels.findAll({
            attributes: ["id", "kodePesanan"]
        })

        viewSuccess(res, "get Kode Pesanan Success", result)
    } catch (error) {
        viewError(res, 500, "Kode Pesanan gagal di dapat")
    }
}