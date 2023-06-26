import { Sequelize } from "sequelize";


export const db = new Sequelize('portalberita', 'munadi1406', 'munadi1406!', {
  host: 'db4free.net',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  retry: {
    max: 3 // Jumlah maksimal percobaan koneksi ulang
  }
});

const connection = async ()=>{
  try{
    await db.authenticate()
    console.log("database terkoneksi")
  }catch(error){
  }
}


export default connection