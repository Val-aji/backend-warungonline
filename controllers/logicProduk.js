export const validasiHarga = (value, max) => {
    const filterHarga = parseInt(value.replace(/[Rp|.]/g, ""))

    if(filterHarga < max && filterHarga > 0) {
        return filterHarga
    } else {
        return false
    }

}

export const handleGambar = (obj, url, cb) => {
    const result = {
        "thumbnail": "",
        "gambar": []
    }
    for (const key in obj) {
        const file = obj[key][0]
        
        const {name, md5} = file
        //ext file
        const extFile = name.split(".")[1]
        const allowExt = ["jpg", "png", "jpeg"]
        if(!allowExt.includes(extFile)) {
            cb(`gambar pada input ${key} tidak ditemukan`)
            return false
        }

        //maksimal gambar 3MB
        const maxMB = 3000000
        if(file.size > maxMB) {
            cb(`ukuran gambar pada file ${key} terlalu besar. maksimal file gambar adalah 3MB.`)
            return false
        }  

        const urlFile = url + "/" + md5 + "." + extFile 
        if(key === "gambarThumbnail") {
            result["thumbnail"] = urlFile   
        } else {
            result["gambar"].push(urlFile)
        }

        file.mv("./public/image/"+ md5 +"." + extFile)
    }

    return result
}


