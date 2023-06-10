import path from 'path';
import Article from "../models/artikel.js";
import Users from "../models/usersModel.js";
import validator from "validator";
import fs from 'fs';

export const getArticle = async (req, res) => {
  try {
    const data = await Article.findAll({ order: [["createdAt", "desc"]] });
    if (data) {
      return res.status(200).json({ data });
    } else {
      return res.status(404);
    }
  } catch (error) {}
};

export const insertArticke = async (req, res) => {
  try {
    const { title, content, kategori } = req.body;
    const image = req.file;
    const baseUrl = process.env.BASE_URL;

    console.log({ image });

    const imagePath = image ? `${baseUrl}/image/${image.filename}` : null;
    const formattedImagePath = imagePath ? imagePath.replace(/\\/g, "/") : null;
    const data = {
      title,
      content,
      image: formattedImagePath,
      kategori,
      publisherId: 1,
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
    if (!title || !validator.isAlphanumeric(formattedTitleWithoutSpaces))
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
    return res.status(500).json({ msg: "Not Found" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { artikelId } = req.params;

    if (!validator.isNumeric(artikelId))
      return res.status(500).json({ msg: "Gagal Menghapus Artikel" });

    const data = await Article.findOne({ where: { artikelId } });
    console.log(data)
    const fileName = path.basename(data.image);
    fs.unlinkSync(`uploads/${fileName}`);

    await Article.destroy({where:{artikelId:data.artikelId}})

    return res.status(200).json({ message: "Artikel berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};


export const showImage = async (req, res) => {
  try {
    const { image } = req.params;
    const imagePath = path.join(process.cwd(), 'uploads', image);

    res.sendFile(imagePath);
  } catch (error) {
    console.log(error);
  }
};

