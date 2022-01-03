import connectDB from "../../../utils/configDatabase";
import Quiz from "../../../utils/models/quiz";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookie from 'cookie';
async function search(req, res) {
    let {p} = req.query;
    let quizzes = await Quiz.find({
        title:{$regex:`${p}`}
    }).sort("desc");
    console.log(p);
    return res.json(quizzes);
}
export default connectDB(search);