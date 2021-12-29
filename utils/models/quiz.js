import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var quiz = new Schema({
    title: {
        type:String
    },
    listQuestions:{
        type: Array,
    }
});

mongoose.models = {};

var Quiz = mongoose.model('Quiz', quiz);

export default Quiz;