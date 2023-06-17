import { getUsers ,auth,register} from "../controller/Users.js";
import { getArticle, insertArticke,getArticleByTitle, deleteArticle, showImage, getArticleById, getArticleByKategori } from "../controller/Artikel.js";
import Express from "express";
import multer from "multer";
import { deleteKategori, getKategori, insertKategori, updateKategori } from "../controller/Kategori.js";

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
route.post('/login',auth);
route.post('/register',register);

route.post("/artikel", upload.single("image"), insertArticke);
route.get("/artikelpost/:page", getArticle);
route.get("/image/:image",showImage)
route.delete("/artikel/:artikelId", deleteArticle);
route.get("/artikel/:title", getArticleByTitle);
route.get("/artikelById/:id/:page", getArticleById);
route.get("/artikelByKategori/:kategori/:page", getArticleByKategori);


route.get('/kategori',getKategori)
route.post('/kategori',insertKategori)
route.put('/kategori',updateKategori)
route.delete('/kategori/:id',deleteKategori)


export default route;
