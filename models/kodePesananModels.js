import { DataTypes } from "sequelize"
import db from "../config/database.js"


const kodePesananModels = db.define("kodePesanan", {
    kodePesanan: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estimasi: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailPenjual: {
        type: DataTypes.STRING,
        allowNull: false
    },
    namaLengkap: {
        type: DataTypes.STRING,
        validate: {
            len: [3, 100]
        },
        allowNull: false
    },
    nomorWhatsapp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    metode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    listProduk: {
        type: DataTypes.JSON, //array
        allowNull: false
    },
    jumlahProduk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 1,
        }
    },
    subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 1
        }
    },
    tanggalPesanan: {
        type: DataTypes.STRING,
    },
    tanggalBerakhir: {
        type: DataTypes.STRING
    },
    pointTambahan: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
}, {
    freezeTableName: true,
    timestamps: false
})


 kodePesananModels.sync()
     .then(() => console.log("tabel kode pesanan berhasil di buat"))
     .catch(() => console.log("tabel kodePesanan gagal di buat"))

export default kodePesananModels;

