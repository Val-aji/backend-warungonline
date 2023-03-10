
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
    console.log(email)
    try {
        const dataKeranjang = await clientProductsModels.findOne({
            attributes: ["id", "keranjang"],
            where: {email}
        })
        console.log(dataKeranjang.keranjang)
        console.log(JSON.parse(dataKeranjang.keranjang))
        const keranjang = JSON.parse(dataKeranjang.keranjang)
        console.log({keranjang})
        const newKeranjang = {kodeProduk, tanggal, jumlah: 1}
        
        if(!keranjang || keranjang.length === 0 || keranjang == "[]") {
            // jika keranjang kosong, maka buat baru
            await clientProductsModels.update(
                {keranjang: [newKeranjang]},
                {where: {email}}
            )


        } else {
            let cekDuplikat = false
            const result = keranjang.slice().map(i => {
                if(i.kodeProduk === kodeProduk) {
                    const newObj = {
                        kodeProduk: i.kodeProduk,
                        tanggal: new Date().toLocaleString("ID-id", {timezone: "asia/jakarta"}),
                        jumlah: i.jumlah + 1
                    }
                    cekDuplikat = true
                    return newObj
                } else {
                    return i   
                }
            }) 
            const listKeranjang = [...result]
            if(!cekDuplikat) {
                console.log("duplikat")
                listKeranjang.push(newKeranjang)
            }
            const resut = await clientProductsModels.update(
                {keranjang: listKeranjang},
                {where: {email}}
            )
            
        }
        
        viewSuccess(res, "menambah data keranjang berhasil", newKeranjang)

    } catch (error) {
        viewError(res, 400,error.message)
        console.log({error})
        return false
    }

}






