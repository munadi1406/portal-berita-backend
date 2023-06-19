import View from "../models/view.js";
import validator from "validator";
import Article from "../models/artikel.js";
import { Sequelize } from "sequelize";

export const addView = async (req, res) => {
  try {
    const { artikelId, date } = req.body;
    if (!validator.isNumeric(artikelId))
      return res.status(400).json({ msg: "artiel id harus berupa angka" });

    const insert = await View.create({ artikelId, date });
    if (!insert) return res.status(400).json({ msg: "Gagal Menambah View" });
    return res.status(201).json({ msg: "Berhasil Menambah View" });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

export const getViewByIdUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await View.findAll({
      attributes: [
        [Sequelize.fn("COUNT", Sequelize.col("view.artikelId")), "jumlah_view"],
      ],
      include: [
        {
          model: Article,
          as: "art",
          attributes: ['artikelId','title'], 
          where: {
            publisherId: id,
          },
        },
      ],
      group: ["view.artikelId"],
      raw: true,
    });

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};



export const getViewByMonth = async (req, res) => {
    try {
      const { id } = req.params;
  
      const data = await View.findAll({
        attributes: [
          [Sequelize.fn("MONTH", Sequelize.col("date")), "bulan"],
          [Sequelize.fn("COUNT", Sequelize.col("view.artikelId")), "jumlah_view"],
        ],
        include: [
          {
            model: Article,
            as: "art",
            attributes: ['artikelId', 'title'],
            where: {
              publisherId: id,
            },
          },
        ],
        group: ["view.artikelId", [Sequelize.fn("MONTH", Sequelize.col("date"))]],
        raw: true,
      });
  
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ msg: "internal server error" });
    }
  };
  