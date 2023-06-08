import { getUsers } from "../controller/Users.js";
import  Express  from "express";

const route = Express.Router()


route.get('/users',getUsers);




export default route