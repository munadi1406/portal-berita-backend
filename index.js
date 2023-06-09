// import Express from "express";
import express from "express";
import cors from 'cors';
import connection from "./config/db.js";
import route from './routes/route.js'
import "dotenv/config.js"


const app = express();


try{
  await connection()
  console.log('database terkoneksi');
}catch(error){
  console.log({error})
}


app.use(cors({credentials:true,origin:'*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(route);



const port = 5000;
app.listen(port, () => {
  console.log(`server jalan di port ${port}`);
});
