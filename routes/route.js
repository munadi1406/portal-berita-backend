import { getUsers ,auth,register, deleteUsers, updateRoleUsers,  updateUsernameUsers, updatePasswordUsers, logout} from "../controller/Users.js";
import { getArticle, insertArticke,getArticleByTitle, deleteArticle, showImage, getArticleById, getArticleByKategori, updateArticle } from "../controller/Artikel.js";
import Express from "express";
import multer from "multer";
import { deleteKategori, getKategori, insertKategori, updateKategori } from "../controller/Kategori.js";
import { addView, getViewByIdUser, getViewByMonth, getViewByWeek, totalPostAndView } from "../controller/View.js";
import { addLog, getLog } from "../controller/Log.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Menentukan folder penyimpanan gambar
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, uniqueSuffix + "." + extension); // Menentukan nama file gambar yang unik
  },
});

const upload = multer({ storage: storage });


const route = Express.Router();



route.get("/users",verifyToken, getUsers);
route.delete("/users/:idUsers", deleteUsers);
route.put("/usersrole", updateRoleUsers);
route.put("/usersupdateusername", updateUsernameUsers);
route.put("/usersupdatepassword", updatePasswordUsers);
route.post('/login',auth);
route.post('/register',register);
route.post('/logout',logout);

route.post('/newaccesstoken',refreshToken)

route.post("/artikel", upload.single("image"), insertArticke);
route.put("/artikel", upload.single("image"), updateArticle);
route.get("/artikelpost/:page", getArticle);
route.get("/image/:image",showImage)
route.delete("/artikel/:artikelId", deleteArticle);
route.get("/artikel/:title", getArticleByTitle);
route.get("/artikelById/:id", getArticleById);
route.get("/artikelByKategori/:kategori/:page", getArticleByKategori);


route.get('/kategori',getKategori)
route.post('/kategori',insertKategori)
route.put('/kategori',updateKategori)
route.delete('/kategori/:id',deleteKategori)

route.get('/view/:id',getViewByIdUser)
route.get('/viewByMonth/:id',getViewByMonth)
route.get('/viewByWeek/:id',getViewByWeek)
route.post('/view',addView)
route.get('/totalpostandview/:idUsers',totalPostAndView)

route.get('/log/:page',getLog)
route.post('/log',addLog)

export default route;
