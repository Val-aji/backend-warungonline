import { Sequelize } from "sequelize";
import mysql2 from "mysql2"
// const DB_NAME = process.env.DB_NAME || "warungonline"
// const DB_HOST = process.env.DB_HOST || "localhost"
// const DB_PORT = process.env.DB_PORT || 3306
// const DB_PASSWORD = process.env.DB_PASSWORD || ""
// const DB_USER = process.env.DB_USER || "root"

// const DB_HOST = "containers-us-west-57.railway.app"
// const DB_NAME = "railway"
// const DB_PASSWORD = "5NU4Ncx7DW5J65Ui1Q5b"
// const DB_PORT = 5804
// const DB_USER = "root"

const DB_HOST = process.env.DB_HOST || "megatron.idserverhost.com"
const DB_PORT = process.env.DB_PORT || 3306
const DB_NAME = process.env.DB_NAME || "nouvalaj_todolist"
const DB_USER = process.env.DB_USER || "nouvalaj_admin"
const DB_PASSWORD = process.env.DB_PASSWORD || "Y0i@I2cVz(-G"

const db = new Sequelize({
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  dialect: "mysql",
  port: DB_PORT,
  host: DB_HOST,
  dialectModule: mysql2
})

db.authenticate()
    .then(() => {
        console.log("koneksi database success")
    })
    .catch(() => {
        console.log("koneksi databases gagal")
    })

export default db

