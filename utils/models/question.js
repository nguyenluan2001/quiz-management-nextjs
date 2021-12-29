import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var question = new Schema({
    title:{
        type: String
    },
    points: {
        type: Number
    },
    anwers:{
        type: Array
    }
});

mongoose.models = {};

var Question = mongoose.model('Question', question);

export default Question;