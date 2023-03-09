import kodePesananModels from "../models/kodePesananModels.js"
import { viewError, viewSuccess } from "./clientProducts/view.js"
import clientModels from "../models/clientModels.js"

export const checkout = async(data, body) => {
    // const {kodePesanan,nama, nomor, alamat, metode, status, listProduk, subtotal} = data

    try {
        const {email, kodePesanan, tanggalPesanan, estimasi, status} = body
        const {metode, listProduk, subtotal, jumlahProduk, identitasPenerima} = data

        const {namaLengkap, nomorWhatsapp, alamat, namaJalan} = identitasPenerima


        const newAlamat = namaJalan + " " + alamat.slice().reverse().join(" ")

        const obj = {
            email,
            emailPenjual,
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
            tanggalPesanan,
            tanggalPesanan: "false"
        }

        const result = await kodePesananModels.create(obj)
        console.log(result)
        return true    
    } catch (error) {
        console.log({error})
        return false
    }
    
    
}


export const getTransaksiByKode = async (req, res) => {
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


