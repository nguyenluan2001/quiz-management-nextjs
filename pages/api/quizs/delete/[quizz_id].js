import connectDB from "../../../../utils/configDatabase";
import Quiz from "../../../../utils/models/quiz";
async function deleteQuizz(req, res) {
    let { quizz_id } = req.query;
    let query = req.query;
    await Quiz.deleteOne({ _id: quizz_id });
    return res.json({ message: "Delete quizz successfully" });
}
export default connectDB(deleteQuizz);