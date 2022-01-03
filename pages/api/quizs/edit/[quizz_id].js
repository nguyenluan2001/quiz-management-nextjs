import connectDB from "../../../../utils/configDatabase";
import Quiz from "../../../../utils/models/quiz";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookie from 'cookie';
 async function editQuizz(req, res) {
    let {quizz_id} = req.query;
    let {title, listQuestions} = req.body;
    let query = req.query;
    let quizz = await Quiz.updateOne({_id:quizz_id},{title, listQuestions});
    console.log("quizz_id", query);
    return res.json(quizz);
}
export default connectDB(editQuizz);