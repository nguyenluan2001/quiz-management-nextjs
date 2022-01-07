import connectDB from "../../../../utils/configDatabase";
import Report from "../../../../utils/models/report";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import cookie from 'cookie';
 async function deleteReport(req, res) {
    let {report_id} = req.query;
    await Report.deleteOne({_id: report_id});
    return res.json({message:"delete report successfully"});
}
export default connectDB(deleteReport);