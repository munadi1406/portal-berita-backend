import { getUsers ,auth,register, deleteUsers} from "../controller/Users.js";
import { getArticle, insertArticke,getArticleByTitle, deleteArticle, showImage, getArticleById, getArticleByKategori } from "../controller/Artikel.js";
import Express from "express";
import multer from "multer";
import { deleteKategori, getKategori, insertKategori, updateKategori } from "../controller/Kategori.js";
import { addView, getViewByIdUser, getViewByMonth } from "../controller/View.js";
import { addLog, getLog } from "../controller/Log.js";

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



route.get("/users", getUsers);
route.delete("/users/:idUsers", deleteUsers);
route.post('/login',auth);
route.post('/register',register);

route.post("/artikel", upload.single("image"), insertArticke);
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
route.post('/view',addView)

route.get('/log',getLog)
route.post('/log',addLog)

export default route;
