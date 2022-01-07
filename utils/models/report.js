import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  };
var report = new Schema({
    quiz:{
        type: mongoose.Types.ObjectId,
        ref: "Quiz"
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    result:{
        type: Array
    },
    totalScore:{
        type: Number
    },
    rewardScore:{
        type: Number
    }
}, schemaOptions);

mongoose.models = {};

var Report = mongoose.model('Report', report);

export default Report;