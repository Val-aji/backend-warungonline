import db from "../config/database.js";
import { DataTypes } from "sequelize";


const clientProductModels = db.define("clientProducts", {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 50],
            isEmail: true
        }
    },
    keranjang: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [],
        // [{kodeProduk, tanggal}]
    },
    transaksi: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
        // [{kodePesanan, tanggalPesan, status, estimasi}]
    },
    voucher: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
        // [{kode, tanggalSelesai, potongan: bentuk persen}]
    },
    produk: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    point: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
        validate: {
            min: 0,
            max: 300000 // maksimal 300k
        }
    }

})


 clientProductModels.sync()
    .then(() => console.log("tabel clientProducts berhasil dibuat"))
    .catch(() => console.log("tabel clientProducts gagal dibuat"))

export default clientProductModels;


