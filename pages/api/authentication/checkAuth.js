import connectDB from "../../../utils/configDatabase";
import User from "../../../utils/models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookie from 'cookie';
async function checkAuth(req, res) {
     try {
        let jwt = req.cookies.jwt;
        let _id = await jsonwebtoken.verify(jwt, "ntluan0301");
        let user = await User.findById(_id).select("-password");
        if(user) {
            return res.status(200).json(JSON.parse(JSON.stringify(user)));
        } else {
            return res.json({status:401, message:"Authenticate fail"});
        }
    } catch (error){
        return res.json({status:401, message:"Authenticate fail"});
    }
   
}
export default connectDB(checkAuth);