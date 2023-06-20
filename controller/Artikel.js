import path from "path";
import Article from "../models/artikel.js";
import Users from "../models/usersModel.js";
import validator from "validator";
import fs from "fs";
import { Op } from "sequelize";

export const getArticle = async (req, res) => {
  try {
    const { page } = req.params;
    if (!validator.isNumeric(page))
      return res.status(500).json({ msg: "Parameter Harus Angka" });
    const limit = 9;
    const data = await Article.findAndCountAll({
      offset: (page - 1) * limit,
      limit: limit,
      order: [["createdAt", "desc"]],
    });
    const totalPages = Math.ceil(data.count / limit);
    if (data) {
      return res.status(200).json({
        totalPages: totalPages,
        currentPage: parseInt(page),
        data: data.rows,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const insertArticke = async (req, res) => {
  try {
    const { publisherId, title, prolog, content, kategori } = req.body;
    const image = req.file;
    const baseUrl = process.env.BASE_URL;
    if (!publisherId || !validator.isNumeric(publisherId))
      return res.status(400).json({ msg: "Publisher id harus angka" });
    if (
      !title ||
      !validator.isAscii(title.replace(/\s/g, "")) ||
      title.includes("-")
    )
      return res
        .status(400)
        .json({
          msg: "Judul tidak valid. Judul tidak boleh kosong, mengandung karakter non-ASCII, atau mengandung karakter '-'",
        });
    if (!prolog || !validator.isAscii(prolog))
      return res.status(400).json({ msg: "Prolog tidak valid" });
    if (!content) return res.status(400).json({ msg: "Content Harus Di Isi" });
    if (!kategori || !validator.isAscii(kategori))
      return res.status(400).json({ msg: "Masukkan Kategori" });
    if (!image || !validator.isMimeType(image.mimetype))
      return res.status(400).json({ msg: "Masukkan Gambar Yang valid" });

    const imagePath = image ? `${baseUrl}/image/${image.filename}` : null;
    const formattedImagePath = imagePath ? imagePath.replace(/\\/g, "/") : null;
    const data = {
      title,
      content,
      image: formattedImagePath,
      kategori,
      publisherId,
      prolog,
    };
    const insertData = await Article.create(data);
    if (!insertData) {
      return res.status(500).json({ error: "Gagal membuat artikel" });
    }
    return res.status(201).json({ msg: "Artikel berhasil dibuat" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Gagal membuat artikel" });
  }
};

export const getArticleByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    if (!title || !validator.isAscii(title))
      return res.status(400).json({ msg: "Title tidak valid" });

    const formattedTitle = title.split("-").join(" ");

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
    if (data.length === 0) {
      return res.status(404).json({ msg: "Not Found" });
    }
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

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !validator.isNumeric(id))
      return res.status(400).json({ msg: "Id Harus Berupa Angka" });
    const data = await Article.findAll({
      order: [["createdAt", "desc"]],
      attributes: [
        "artikelId",
        "title",
        "prolog",
        "content",
        "createdAt",
        "updatedAt",
        "image",
        "kategori",
      ],
      include: {
        model: Users,
        as: "user",
        attributes: ["username"],
      },
      where: {
        publisherId: id,
      },
    });
    if (data) {
      return res.status(200).json({
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const getArticleByKategori = async (req, res) => {
  try {
    const { kategori, page } = req.params;
    if (!kategori || !validator.isAlpha(kategori))
      return res.status(400).json({ msg: "kategori harus berupa huruf" });
    if (!page || !validator.isNumeric(page))
      return res.status(400).json({ msg: "page Harus Berupa Angka" });

    const limit = 10;
    const data = await Article.findAndCountAll({
      where: {
        kategori: {
          [Op.like]: `%${kategori}%`,
        },
      },
      order: [["createdAt", "desc"]],
      attributes: [
        "artikelId",
        "title",
        "content",
        "createdAt",
        "image",
        "kategori",
        "prolog",
      ],
      limit: limit,
      offset: (page - 1) * limit,
      include: {
        model: Users,
        as: "user",
        attributes: ["username"],
      },
    });
    const totalPages = Math.ceil(data.count / limit);
    if (data) {
      return res.status(200).json({
        totalPages: totalPages,
        currentPage: parseInt(page),
        data: data.rows,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
