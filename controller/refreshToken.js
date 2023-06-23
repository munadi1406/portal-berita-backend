import Users from "../models/usersModel.js";
import Jwt from 'jsonwebtoken'


export const refreshToken = async(req,res)=>{
    try {
        const {refreshToken} = req.body
        if(!refreshToken) return res.sendStatus(401).json({msg:"Refresh Token Required"});
        const user = await Users.findOne({
            where:{
                refresh_token:refreshToken
            }
        });
        if(!user) return res.sendStatus(403);
        Jwt.verify(refreshToken,process.env.REFRESH_TOKEN_KEY,(err,decoded) =>{
            if(err) return res.status(404).json({msg:"Sesi Telah Habis Silahan Login Kembali"});
            const id = user.id;
            const username = user.username;
            const email = user.email;
            const accessToken = Jwt.sign({id,username,email},process.env.ACCESS_TOKEN_KEY,{
                expiresIn:'20s'
            });
            res.status(200).json({accessToken});
        }) 
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" });
    }
}