import {Sequelize} from 'sequelize'
import db from "../config/db.js"


const {DataTypes} = Sequelize;


const Users = db.define('Users',{
    username:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    refresh_token:{
        type:DataTypes.TEXT
    },
},{
    freezeTableName:true
})



export default Users



