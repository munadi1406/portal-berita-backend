import Article from "../models/artikel.js";
import multer from "multer";





export const insertArticke = async (req, res) => {
    try {
      const { title, content, kategori } = req.body;
      const image = req.file;
  
      const data = {
        title,
        content,
        image: image ? image.path : null, // Menyimpan path gambar jika ada, jika tidak kosongkan
        kategori,
        publisherId: 1
      };
  
      const insertData = await Article.create(data);
      if (!insertData) {
        return res.status(500).json({ error: 'Gagal membuat artikel' });
      }
  
      return res.status(201).json({ message: 'Artikel berhasil dibuat' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Gagal membuat artikel' });
    }
  };


  export const getArticle = async(req,res)=>{
    try {
        const data = await Article.findAll()
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(404)
        }
        
    } catch (error) {
        
    }
  }
  