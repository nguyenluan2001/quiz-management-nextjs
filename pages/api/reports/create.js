import connectDB from "../../../utils/configDatabase";
import Report from "../../../utils/models/report";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookie from 'cookie';
 async function create(req, res) {
    let data = req.body;
    let report = new Report(data);
    await report.save();
    console.log(data);
    return res.json({message:"Create report successfully"});
}
export default connectDB(create);