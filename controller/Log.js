import validator from "validator";
import Log from '../models/log.js'



export const addLog = async (req,res)=>{
    try {
        const {ipAddress,browser,currentPage,city,region,country} = req.body
        if(!ipAddress ||!validator.isIP(ipAddress) || !browser || !currentPage || !city || !region || !country) return res.status(400).json({msg:"Pastikan Semua Sudah Terisi"})
        const insertLog = await Log.create({ipAddress,browser,currentPage,city,region,country})
        if(!insertLog) return res.status(400).json({msg:"log gagal di tambahkan"})
        return res.status(201).json({success:true})
    } catch (error) {
      console.log(error)
        return res.status(500).json({msg:"internal server error"})
    }
}



export const getLog = async (req,res)=>{
    try {
       const data = await Log.findAll({order:[['id','desc']]});
       return res.status(200).json({data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({msg:"internal server error"})
    }
}