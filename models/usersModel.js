import {Sequelize} from 'sequelize'
import { db } from '../config/db.js';


const {DataTypes} = Sequelize;


const Users = db.define('users',{
    username:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.TEXT
    },
    refresh_token:{
        type:DataTypes.TEXT
    },
},{
    timestamps: true,
    freezeTableName:true
})



export default Users



