import clientProductsModels from "../../models/clientProductsModels.js"
import { viewError, viewSuccess } from "./view.js"



export const incrementPoint = async(req, res) => {
    // 5% point dari total belanja
    const {email, subtotal} = req.body
    
    try {
        //get point
        const client = await clientProductsModels.findOne(
            {where: {email}},
            {attributes: ["id", "point"]}
        )
        
        const tambahanPoint = parseInt(subtotal) * (5 / 100)
        const {point} = client.dataValues

        if(point > 300000) {
            viewError(res, 400, "Point anda sudah melebih batas")
            return false
        }
            
        await clientProductsModels.update(
            {point: point + tambahanPoint},
            {where: {email}}
        )

        viewSuccess(res, "Point berhasil ditambahkan", {subtotal, point})
        
    } catch (error) {
        viewError(res, 400, error.message)
    }

}