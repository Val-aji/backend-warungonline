import kodePesananModels from "../models/kodePesananModels.js"

export const checkout = async(data) => {
    // const {kodePesanan,nama, nomor, alamat, metode, status, listProduk, subtotal} = data

    try {
        const {listProduk} = data
        const jumlahPoduk = listProduk.length

        await kodePesananModels.create(
            {...data, jumlahPoduk}
        )
    } catch (error) {
        console.log("error")
    }
    
}