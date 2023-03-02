import { DataTypes } from "sequelize";
import db from "../config/database.js";

const clientModels = db.define("clients", {
    namaLengkap: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4, 50],
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 255]
        }
    },
    nomorWhatsapp: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10, 15]
        }
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    alamat: {
        type: DataTypes.TEXT,
        validate: {
            len: [10, 100]
        }
    }

})

// clientModels.sync()
//     .then(() => console.log("tabel client berhasil dibuat"))
//     .catch(() => console.log("tabel client gagal di buat"))

export default clientModels

