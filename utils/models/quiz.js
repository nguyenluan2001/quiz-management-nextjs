import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  };
var quiz = new Schema({
    title: {
        type:String
    },
    listQuestions:{
        type: Array,
    },
    user:{
        type: mongoose.Types.ObjectId
    }
}, schemaOptions);

mongoose.models = {};

var Quiz = mongoose.model('Quiz', quiz);

export default Quiz;