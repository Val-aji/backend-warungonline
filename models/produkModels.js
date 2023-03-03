import db from "../config/database.js";
import { DataTypes } from "sequelize";

const produkModels = db.define("produk", {
    namaProduk: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 80]
        }
    },
    kodeProduk: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kategoriProduk: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsiProduk: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [10, 3000]
        }
    },
    hargaProduk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100000000 // 100jt
        }
    },
    diskonProduk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    },
    subtotalProduk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100000000 // 100jt
        }
    },
    gambarProduk: {
        type: DataTypes.JSON,
    },
    emailPembuat: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    jumlahPembeli: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0
        }
    }
}, {
    freezeTableName: true,
})

produkModels.sync({alter: true})
     .then(() => {
         console.log("tabel produk sukses dibuat")
     })
     .catch(err => {
         console.log(err)
         console.log("tabel produk gagal dibuat")
     })


export default produkModels
