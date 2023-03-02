
import clientProductsModels from "../../models/clientProductsModels.js"
import { viewSuccess, viewError } from "./view.js"


export const getAllData = async(req, res) => {
    try {
        const data = await clientProductsModels.findAll()
        viewSuccess(res, "get all data success", data)    
    } catch (error) {
        viewError(res, 400, "get all data gagal")
    }   
}

export const getDataKeranjang = async(req, res) => {
    console.log(req.body)
    const {email} = req.body
    try {
        const data = await clientProductsModels.findOne(
            {attributes: ["id", "keranjang" ]},
            {where: {email}}
        )
        viewSuccess(res, "get data keranjang success", data)
    } catch (error) {
        viewError(res, 400, error.message)
    }
}


export const insertDataKeranjang = async(req, res) => {
    const {email, kodeProduk, tanggal} = req.body
    
    try {
        const dataKeranjang = await clientProductsModels.findOne({
            attributes: ["id", "keranjang"],
            where: {email}
        })

        const keranjang = dataKeranjang.dataValues.keranjang
        const newKeranjang = {kodeProduk, tanggal}
        

        if(!keranjang || keranjang.length === 0 || keranjang == "[]") {
            // jika keranjang kosong, maka buat baru
            await clientProductsModels.update(
                {keranjang: [newKeranjang]},
                {where: {email}}
            )
        } else {
            const listKeranjang = [...JSON.parse(keranjang), newKeranjang]
            await clientProductsModels.update(
                {keranjang: listKeranjang},
                {where: {email}}
            )
        }
        
        return viewSuccess(res, "menambah data keranjang berhasil", [newKeranjang])

    } catch (error) {
        viewError(res, 400,error.message)
    }

}






