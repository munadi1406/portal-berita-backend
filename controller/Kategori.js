import { Kategori } from "../models/Kategori.js"
import validator from "validator"



export const getKategori = async (req,res)=>{
    try {
        const data = await Kategori.findAll()
        
        return res.status(200).json({data})
    } catch (error) {
        return res.status(500).json({msg:"Not Found"})
    }
}



export const insertKategori = async (req,res)=>{
    try {
        const {kategori } = req.body
        if(!validator.isAlpha(kategori)) return res.status(500).json({msg:"Kategori Tidak Boleh Mengandung Angka,Spasi,Dan Karekter Khusus"})
        await Kategori.create({kategori})

        return res.status(201).json({msg:"Kategori Berhasil Di Buat"})

    } catch (error) {
        return res.status(500).json({msg:"Terjadi Kesalahan"})
    }
}


export const deleteKategori = async (req,res)=>{
    try {
        const {id} = req.params
        if(!validator.isNumeric(id)) return res.status(500).json({msg:"gagal menghapus kategori"})

        await Kategori.destroy({where:{id}})
        return res.status(200).json({msg:"kategori berhasil di hapus"})
    } catch (error) {
        return res.status(500).json({msg:"Terjadi Kesalahan"})
    }
}