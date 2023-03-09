import express from "express"
import cors from "cors"
import FileUpload from "express-fileupload"
import produkRouter from "./routes/produkRouter.js"
import clientRouter from "./routes/clientRouter.js"
import cookieParser from "cookie-parser"
import clientProductsRouter from "./routes/clientProductsRouter.js"
import kodePesananRouter from "./routes/kodePesananRoutes.js"
import {join} from "path"

const app = express()

app.use(cookieParser())
app.use(cors())
app.use(FileUpload())
app.use(express.static("public"))

app.use("/produk", produkRouter)
app.use("/client", clientRouter)
app.use("/clientProduk", clientProductsRouter)
app.use("/kodePesanan", kodePesananRouter)

app.get("/", (req, res) => {
  res.send("sukses")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("server running in localhost:3000")
})
