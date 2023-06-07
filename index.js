import Express from "express";
import db from "./config/db.js";

const app = Express();


try{
  await db.authenticate()
  db.sync()
  console.log('database terkoneksi')
}catch(error){
  console.log({error})
}



const port = 5000;
app.listen(port, () => {
  console.log(`server jalan di port ${port}`);
});
