import clientModels from "../models/clientModels.js"
import bcrypt from "bcrypt"
import  Sequelize  from "sequelize"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { viewError, viewSuccess } from "./clientProducts/view.js"
dotenv.config()


export const register = async (req, res) => {
    
    const viewSuccess = (message) => {
        res.status(200).json({
            "status": 200,
            "message": message,
            "data": {namaLengkap, email, nomorWhatsapp, alamat}
        })
    }

    const viewError = (status, msg, msgError) => {
        res.status(status).json({
            "status": status,
            "message": msg,
            "error": msgError
        })
    }

    const {namaLengkap, email, password, konfirmPassword, nomorWhatsapp, alamat} = req.body
    const data = await clientModels.findAll({
        where: {
            [Sequelize.Op.or]: [{email}, {namaLengkap}]
        }
    })

    let msgError;    
    const filterEmail = email.match("@gmail.com")
    const filterNomor = nomorWhatsapp.match(/[^0-9]/g)
    
    if(namaLengkap.length < 4 || namaLengkap.length > 50) {
        msgError = "Nama Lengkap minimal 4 karakter dan maksimal 50 karakter"
    } else if(data.length > 0) {
        viewError(400,"email atau nama lengkap tidak valid", "email atau nama lengkap telah ada", )
        return false
    }else if(!filterEmail) {
        viewError(400, "email not valid", "email harus ada @gmail.com")
        return false
    } else if(password !== konfirmPassword) {
        viewError(400, "konfirm password not valid", "Konfirm password tidak sama dengan password asli")
        return false
    } else if(filterNomor) {
        viewError(400, "Nomor Whatsapp tidak valid", "Input yang anda masukkan bukan nomor Whatsapp")
        return false 
    } else if(alamat.length < 10 || alamat.length > 100) {
        msgError = "jumlah karakter alamat minimal 10 dan maksimal 100"
    } else {
        msgError = "Registrasi Gagal"
    }

    const hashPassword = bcrypt.hashSync(password, 8)
    
    try {   
        await clientModels.create({
            namaLengkap,
            email,
            password: hashPassword,
            nomorWhatsapp,
            alamat
        })
        viewSuccess("Success")        
    } catch (error) {   
        viewError(400, error.message, msgError)   
    }
}


export const login = async (req, res) => {
    const {email, password} = req.body
    const viewError = (status, errMsg, msg) => {
        res.json({
            "status": status,
            "messageError": errMsg,
            "message": msg
        })
    }

    const viewSuccess = (data) => {
        res.status(200).json({
            "status": 200,
            "message": "Login Berhasil",
            "data": data
        })
    }

    try {
        const user = await clientModels.findOne({
            where: {
                [Sequelize.Op.or]: [{email,}, {nomorWhatsapp: email}]
            }
        })   
        
        if(!user) return viewError(404, "email atau nomor telepon tidak valid", "email atau nomor handphone tidak ditemukan")

        const comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) return viewError(401, "password tidak valid", "password yang anda masukkan salah!")

        const token = jwt.sign({id: user.id }, process.env.SECRET_KEY)
        
        const options = {
            expires: 0,
            httpOnly: true,
        }
        
        try {
            await clientModels.update(
                {token},
                {where: {
                    [Sequelize.Op.or]: [
                        {email},
                        {nomorWhatsapp: email}]
                    }
                }
            )    
        } catch (error) {
            return viewError(500 ,error.message, "manipulasi token not valid")
        }
        
        viewSuccess({email: user.email, token})
    } catch (error) {
        viewError(400, error.message, "login gagal")
    }
}

export const getToken = async(req, res) => {
    const {email} = req.body
    console.log(email)
    try {
        const token = await clientModels.findOne({
            attributes: ["id", "token"],
            where: {email}
        })
        
        viewSuccess(res, "get token berhasil", token)    
    } catch (error) {
        viewError(res, 401, "request not valid")
    }
}

export const logout = async (req, res) => {
    const {email} = req.body
    
    try {

        const result = await clientModels.update(
            {token: null},
            {where: {
                    [Sequelize.Op.or]: [
                        {email},
                        { nomorWhatsapp: email}
                    ]
                }
            }
        )
            
        console.log(result)
        
        res.status(200).json({status: 200, mesagge: "logout berhasil"})    
    } catch (error) {
        res.sendStatus(400)
    }
    
}


