import Users from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

export const getUsers = async (req, res) => {
  try {
    const data = await Users.findAll({
      attributes: ["id", "username", "email", "role"],
      order:[['createdAt','desc']]
    });
    if (data) {
      return res.status(200).json({ data });
    } else {
      return res.status(404).json({ msg: "Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (
      !username ||
      !validator.isLength(username, { min: 5, max: 50 }) ||
      !validator.matches(username, /^[a-zA-Z0-9_]{5,50}$/)
    )
      return res.status(400).json({
        msg: "Nama harus terdiri dari 5 karakter atau lebih dan tidak boleh mengandung angka atau karakter khusus",
      });
    const nameExist = await Users.findOne({ where: { username } });
    if (nameExist) return res.status(400).json({ msg: "Nama Tidak Tersedia" });

    if (!email || !validator.isEmail(email))
      return res
        .status(400)
        .json({ msg: "Email yang Anda masukkan tidak valid" });

    // validasi domain email
    const domain = email.split(".")[1];
    if (["tk", "ml", "ga", "cf", "gq"].includes(domain))
      return res.status(400).json({ msg: "Domain email tidak valid" });

    // validasi email jika email sudah terdafatar
    const emailExist = await Users.findOne({ where: { email: email } });
    if (emailExist)
      return res.status(400).json({ msg: "Email sudah terdaftar" });

    if (!validator.isLength(password, { min: 8, max: 50 }))
      return res
        .status(400)
        .json({ msg: "Password Minimal 8 Karakter Dan Maksimal 50 Karakter" });
    if (!password || !validator.isStrongPassword(password))
      return res.status(400).json({
        msg: "Password harus terdiri dari huruf besar, huruf kecil, angka, dan karakter khusus",
      });
    if (password != confirmPassword)
      return res
        .status(400)
        .json({ msg: "Konfirmasi Password tidak sama dengan Password" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    await Users.create({
      username,
      email,
      password: hashPassword,
    });
    res.json({ msg: "register berhasil" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Terjadi kesalahan" });
  }
};

export const auth = async (req, res) => {
  try {
    const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
    const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
    const { email, password } = req.body;

    if (!email || !validator.isEmail(email))
      return res
        .status(400)
        .json({ msg: "Email yang Anda masukkan tidak valid" });

    // validasi domain email
    const domain = email.split(".")[1];
    if (["tk", "ml", "ga", "cf", "gq"].includes(domain))
      return res.status(400).json({ msg: "Domain email tidak valid" });

    if (!password)
      return res
        .status(500)
        .json({ msg: "Password Yang Anda Masukkan Kosong" });

    const authCheck = await Users.findOne({ where: { email } });
    if (!authCheck)
      return res.status(500).json({ msg: "Akun Tidak Di Temukan" });
    const match = await bcrypt.compare(password, authCheck.password);
    if (!match)
      return res
        .status(500)
        .json({ msg: "Password Yang Anda Masukkan Salah " });

    const idUsers = authCheck.id;
    const username = authCheck.username;
    const emaill = authCheck.email;
    const role = authCheck.role;

    const accessToken = jwt.sign(
      { idUsers, username, emaill, role },
      accessTokenKey,
      {
        expiresIn: "20s",
      }
    );
    let jwtCheck;
    let refreshToken;
    try {
      jwtCheck = jwt.verify(authCheck.refresh_token, refreshTokenKey);
      refreshToken = authCheck.refresh_token;
    } catch (error) {
      refreshToken = jwt.sign(
        { idUsers, username, emaill, role },
        refreshTokenKey,
        {
          expiresIn: "5d",
        }
      );
      await Users.update(
        { refresh_token: refreshToken },
        {
          where: {
            id: idUsers,
          },
        }
      );
    }

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const { idUsers } = req.params;
    await Users.destroy({ where: { id: idUsers } });
    return res.status(200).json({ message: "User berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
