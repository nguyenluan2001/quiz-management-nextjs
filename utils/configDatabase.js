import {MongoClient} from "mongodb";
import mongoose from "mongoose"
// async function connection() {
//     // let client = new MongoClient("mongodb+srv://luannguyen:ntluan2001@demo-express.6rj7r.mongodb.net?retryWrites=true&w=majority")
//     // return client.connect();
//     await mongoose.connect('mongodb+srv://luannguyen:ntluan2001@demo-express.6rj7r.mongodb.net/quiz-management?retryWrites=true&w=majority', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true
//       });
//     console.log("connection database ok")

// }
// export default connection
const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
      // Use current db connection
      return handler(req, res);
    }
    // Use new db connection
    await mongoose.connect(process.env.MONGDB_URL, {
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    //   useCreateIndex: true,
    //   useNewUrlParser: true
    });
    return handler(req, res);
  };
  
  export default connectDB;