import connectDB from "../../../utils/configDatabase";
import User from "../../../utils/models/user";
import bcrypt from "bcrypt";
async function signUp(req, res) {
    let data = req.body;
    let user = await User.findOne({ username: data.username });
    console.log(user);
    if (user) {
        return res.json({ status:400, message: "Username existed" })
    } else {
        const salt = bcrypt.genSaltSync(process.env.BCRYPT_SALTROUNDS);
        data.password = await bcrypt.hash(data.password, salt);
        console.log(data);
        let newUser = new User(data);
        await newUser.save();
        console.log(newUser);
        return res.json({ status: 200, message: "Sign up successfully" });
    }
}
export default connectDB(signUp);