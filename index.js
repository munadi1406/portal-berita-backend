// import Express from "express";
import express from "express";
import cors from 'cors';
import connection from "./config/db.js";
import route from './routes/route.js'
import "dotenv/config.js"
import {rateLimit} from 'express-rate-limit'


const app = express();


try{
  await connection()
}catch(error){
  console.log({error})
}


app.use(cors({credentials:true,origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Periode waktu dalam milidetik (di sini 15 menit)
  max: 200, // Jumlah maksimal permintaan dalam periode waktu yang sama
  message: 'Terlalu banyak permintaan dari IP Anda. Coba lagi nanti.',
});

app.use(limiter);

app.use(route);


const port = 5000;
app.listen(port, () => {
  console.log(`server jalan di port ${port}`);
});
