import connectDB from "../../../utils/configDatabase";
import Report from "../../../utils/models/report";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookie from 'cookie';
 async function getReports(req, res) {
    let jwt = req.cookies.jwt;
    let _id = await jsonwebtoken.verify(jwt, "ntluan0301");
    let reports = await Report.find({user:_id}).populate("quiz");
    console.log("reports", reports);
    return res.json(reports);
}
export default connectDB(getReports);