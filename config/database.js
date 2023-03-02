import { Sequelize } from "sequelize";

const db = new Sequelize("warungonline", "root", "", {
    host: "localhost",
    dialect: "mysql"
})

db.authenticate()
    .then(() => {
        console.log("koneksi database success")
    })
    .catch(() => {
        console.log("koneksi databases gagal")
    })

export default db

