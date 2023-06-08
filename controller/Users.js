
import Users from "../models/usersModel.js";

export const getUsers = async (req, res) => {
  try {
    console.log("meminta data users");
    const data = await Users.findAll();
    if (data) {
      console.log(JSON.parse(data));
    } else {
      console.log("data kosong");
    }
  } catch (error) {}
};
