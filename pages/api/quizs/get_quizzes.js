import connectDB from "../../../utils/configDatabase";
import Quiz from "../../../utils/models/quiz";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookie from 'cookie';
async function getQuizzes(req, res) {
    let params = req.query;
    let quizzes = await Quiz.find({}).sort("desc");
    console.log(params);
    return res.json(quizzes);
}
export default connectDB(getQuizzes);