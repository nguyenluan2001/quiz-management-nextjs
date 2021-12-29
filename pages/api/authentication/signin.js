import connectDB from "../../../utils/configDatabase";
import User from "../../../utils/models/user";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookie from 'cookie';
 async function signIn(req, res) {
    let data = req.body;
    console.log("data", data)
    let user = await User.findOne({username: data.username});
    console.log(user);
    if(user) {
        const checkPassword = bcrypt.compareSync(data.password, user.password)
        if (checkPassword) {
            const {_id,fullname, email, username,...password}=user;
            let jwt = jsonwebtoken.sign({_id}, "ntluan0301");
            user = {_id,fullname, email, username, jwt};
            res.setHeader('Set-Cookie', cookie.serialize('jwt', jwt, { 
                httpOnly:true,
                maxAge: 60*60,
                sameSite:"strict",
                path: "/"
            }));
            return res.json({status:200, message: "Sign in successfully", user: user});
        } else {
            return res.json({status: 400, message: "Sign in fail"});
        }
    }
    else {
        return res.json({status: 400, message: "Sign in fail"});
    }
}
export default connectDB(signIn);