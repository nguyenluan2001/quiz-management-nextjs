import connectDB from "../../../utils/configDatabase";
import Quiz from "../../../utils/models/quiz";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookie from 'cookie';
 async function create(req, res) {
    let data = req.body;
    let quiz = new Quiz(data);
    await quiz.save();
    return res.json({message:"Create quizz successfully"});
}
export default connectDB(create);