import path from "path";
import Article from "../models/artikel.js";
import Users from "../models/usersModel.js";
import validator from "validator";
import fs from "fs";

export const getArticle = async (req, res) => {
  try {
    const { page } = req.params;
    if(!validator.isNumeric(page)) return res.status(500).json({msg:"Parameter Harus Angka"})
    const limit = 10;
    const data = await Article.findAndCountAll({
      offset: (page - 1) * limit,
      limit: limit,
      order: [["createdAt", "desc"]],
    });
    const totalPages = Math.ceil(data.count / limit);
    if (data) {
      return res
        .status(200)
        .json({
          totalPages: totalPages,
          currentPage: parseInt(page),
          data: data.rows,
        });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Internal server error' });
  }
};

export const insertArticke = async (req, res) => {
  try {
    const { title, content,prolog, kategori } = req.body;
    const image = req.file;
    const baseUrl = process.env.BASE_URL;

    if(!validator.isAlphanumeric(title)) return res.status(500).json({msg:"Title Harus Berupa Huruf dan angka saja"})
    if(!validator.isAlphanumeric(prolog)) return res.status(500).json({msg:"Prolog Harus Di Title Harus Berupa Huruf dan angka saja"})
    if(!content) return res.status(500).json({msg:"Content Harus Di Isi"})
    if(!validator.isAlpha(kategori)) return res.status(500).json({msg:"Kategori Hanya Berupa Huruf"})
    if(!image) return res.status(500).json({msg:"Masukkan Gambar"})


    const imagePath = image ? `${baseUrl}/image/${image.filename}` : null;
    const formattedImagePath = imagePath ? imagePath.replace(/\\/g, "/") : null;
    const data = {
      title,
      content,
      image: formattedImagePath,
      kategori,
      publisherId: 1,
      prolog
    };

    const insertData = await Article.create(data);
    if (!insertData) {
      return res.status(500).json({ error: "Gagal membuat artikel" });
    }

    return res.status(201).json({ msg: "Artikel berhasil dibuat" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Gagal membuat artikel" });
  }
};

export const getArticleByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const formattedTitle = title.split("-").join(" ");
    console.log(formattedTitle);

    const formattedTitleWithoutSpaces = formattedTitle.replace(/\s/g, ""); // Menghapus spasi menggunakan regex
    if (!title || !formattedTitleWithoutSpaces)
      return res.status(404).json({ msg: "Not Found" });
    Article.belongsTo(Users, { foreignKey: "publisherId" });
    const data = await Article.findAll({
      where: { title: formattedTitle },
      attributes: [
        "artikelId",
        "title",
        "content",
        "createdAt",
        "image",
        "kategori",
      ],
      include: {
        model: Users,
        as: "user", // alias untuk model Users
        required: false, // menggunakan LEFT OUTER JOIN
        attributes: ["username"],
      },
      order: [["createdAt", "desc"]],
    });

    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { artikelId } = req.params;

    if (!validator.isNumeric(artikelId))
      return res.status(500).json({ msg: "Gagal Menghapus Artikel" });

    const data = await Article.findOne({ where: { artikelId } });
    console.log(data);
    const fileName = path.basename(data.image);
    fs.unlinkSync(`uploads/${fileName}`);

    await Article.destroy({ where: { artikelId: data.artikelId } });

    return res.status(200).json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

export const showImage = async (req, res) => {
  try {
    const { image } = req.params;
    const imagePath = path.join(process.cwd(), "uploads", image);

    res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
  }
};
