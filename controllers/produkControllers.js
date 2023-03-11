import produkModels from "../models/produkModels.js"

const viewsSuccess = (res, value, message) => {
    res.status(200).json(
        {
            "status": "OK",
            "data": value,
            "message": message
        }
    )
}

const viewError = (res, status, err, pesan) => {
    res.status(status).json(
        {
            "status": status,
            "message": pesan,
            "errorMessage": err.message,
            "data": null 
        }
    )
}

export const getAllData = async(req, res) => {
    try {
        const data = await produkModels.findAll()
        viewsSuccess(res, data, "Get All Data Success")    
    } catch (error) {
        viewError(res, 400, error, "Get All Data Gagal")
    }
}

export const getDataByKategori = async(req, res) => {
    
    try {
        const kategori = req.params.kategori.kategori.toString()
        const data = await produkModels.findAll({where: {kategoriProduk: kategori}})
            
        if(data.length === 0) {
            viewError(res, 404, {message: `kategori ${kategori} tidak ada ditemukan`},"kategori tidak ditemukan ")
        } else {
            viewsSuccess(res, data, "Get Data Berdasarkan Kategori Sukses")
        }
    } catch (error) {
        viewError(res, 400, error, "Get Data Berdasarkan Kategori Gagal")
    }
}

export const getKodeProduk = async(req, res) => {
    try {
        const data = await produkModels.findAll({
            attributes: ["id", "namaProduk", "kodeProduk"]
        })
        viewsSuccess(res, data, "get data kategori success")
        
    } catch (error) {
        viewError(res, 400, error, "kode produk tidak valid")
    }
}


import { handleGambar, validasiHarga } from "./logicProduk.js"
export const insertProduk = async (req, res) => {
    const {body} = req      
    const max = 100000000 // 100jt
    const emailPembuat = "tes@gmail.com"
    const {namaProduk, deskripsiProduk, kategoriProduk} = body


    //validasi kode Produk
    const splitKode = namaProduk.split(" ")
    const kodeProduk = splitKode.map((item, index) => { 
        return splitKode.length == index + 1 ? item : item.substr(0, 2).toUpperCase() 
    }).join("")

    const hargaProduk = validasiHarga(body.hargaProduk, max)
    const diskonProduk = validasiHarga(body.diskonProduk, 100)
    const subtotalProduk = validasiHarga(body.subtotalProduk, max)

    const cbError = msg => viewError(res, 400, {message: null},msg)
    
    const url = "https" + "://" + req.get("host") + "/image" 
    const gambarProduk = handleGambar(req.files, url, cbError)
    
    

    const objInsert = {
        namaProduk,
        kodeProduk,
        deskripsiProduk,
        hargaProduk,
        diskonProduk,
        subtotalProduk,
        kategoriProduk,
        emailPembuat,
        gambarProduk
    }
    try {

        const response = await produkModels.create(
            {...objInsert,emailPembuat})
        viewsSuccess(res, body, "Insert Data Berhasil")
    } catch (error) {
        const local = (msg) => {
            viewError(res, 400, error, msg)
        }    

        
        const filterEmail = emailPembuat.match("@gmail.com")
        
        console.log(error.message)
        console.log(error)
        if(namaProduk.length < 10 || namaProduk.length > 80) {
            local("nama produk minimal 10 dan maksimal 80")
        } else if (deskripsiProduk < 10 || deskripsiProduk > 3000) {
            local("deksirpsi produk maksimal 3000 karakter dan minimal 10")
        } else if(diskonProduk < 0 || diskonProduk > 100) {
            local("diskon produk minimal 0 dan maksimal 100%")
        } else if(subtotalProduk < 0 || subtotalProduk > 100000000) {
            local("subtotal minimal 0 dan maksimal 100JT")
        } else if(!filterEmail) {
            local("email tidak terdektesi")
        } else {
            local("insert data erroor")
            
        } 
        
    }
}


export const removeDataById = async(req, res) => {
    const id = req.params.id
    console.log(id)
    try {
        const data = await produkModels.findAll(
            {where: {
                id
            }}
        )
        await produkModels.destroy(
            {where: {
                id
            }}
        )
        
        viewsSuccess(res, data, `data dengan id ${id} berhasil di hapus`)

    } catch (error) {
        viewError(res, 400, error, "Hapus data gagal")
    }
}

