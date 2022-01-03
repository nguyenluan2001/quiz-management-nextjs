import connectDB from "../../../utils/configDatabase";
import Quiz from "../../../utils/models/quiz";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookie from 'cookie';
 async function getQuizzById(req, res) {
    let {quizz_id} = req.query;
    let query = req.query;
    let quizz = await Quiz.findOne({_id:quizz_id});
    console.log("quizz_id", query);
    return res.json(quizz);
}
export default connectDB(getQuizzById);