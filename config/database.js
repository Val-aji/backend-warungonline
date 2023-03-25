import { Sequelize } from "sequelize";
import mysql2 from "mysql2"

const DB_HOST = process.env.DB_HOST 
const DB_PORT = process.env.DB_PORT 
const DB_NAME = process.env.DB_NAME 
const DB_USER = process.env.DB_USER 
const DB_PASSWORD = process.env.DB_PASSWORD 

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

