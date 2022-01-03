import { createSlice, current } from "@reduxjs/toolkit";
const initId = Math.floor(Math.random() * 100)
const initialState = {
    title: "Untitled Quiz",
    listQuestions: [
        // {
        //     id: initId,
        //     question: "",
        //     points: 1,
        //     answers: [
        //         {
        //             order: "A",
        //             answer: ""
        //         },
        //         {
        //             order: "B",
        //             answer: ""
        //         },
        //         {
        //             order: "C",
        //             answer: ""
        //         },
        //         {
        //             order: "D",
        //             answer: ""
        //         },
        //     ],
        //     correct: null
        // }
    ],
    isAddNewQuestion: true,
    currentQuestion: {
        id: initId,
        question: "",
        points: 1,
        answers: [
            {
                order: "A",
                answer: ""
            },
            {
                order: "B",
                answer: ""
            },
            {
                order: "C",
                answer: ""
            },
            {
                order: "D",
                answer: ""
            },
        ],
        correct: null,
        isEditting: true
    }
}
const quizSlice = createSlice({
    name: "quiz",
    initialState: initialState,
    reducers: {
        resetQuizz:(state) => {
            return initialState;
        },
        getQuizz: (state, action) =>{
            let {title, listQuestions} = action.payload;
            state.title = title,
            state.listQuestions = listQuestions;
        },
        updateQuizTitle: (state, action) => {
            let title = action.payload;
            state.title = title;
         },
        updateTitleCurrentQuestion: (state, action) => {
            state.currentQuestion.question = action.payload;
        },
        updateQuestionPoints: (state, action) => {
            state.currentQuestion.points = action.payload;
        },
        updateAnswer: (state, action) => {
            let { order, answer } = action.payload;
            // let cloneState = JSON.parse(JSON.stringify(current(state)))
            // console.log("cloneState", cloneState)
            // let newAnswers = cloneState.currentQuestion.answers.map(item=>{
            //     if(item.order === order) {
            //         return {...item, answer: answer};
            //     } else return item
            // })
            // state.currentQuestion = newAnswers
            // console.log(1111111111)
            switch (order) {
                case "A": {
                    state.currentQuestion.answers[0].answer = answer;
                    break;
                }
                case "B": {
                    state.currentQuestion.answers[1].answer = answer;
                    break;
                }
                case "C": {
                    state.currentQuestion.answers[2].answer = answer;
                    break;
                }
                case "D": {
                    state.currentQuestion.answers[3].answer = answer;
                    break;
                }
            }
        },
        updateCorrectAnswer: (state, action) => {
            let order = action.payload;
            // let cloneState = JSON.parse(JSON.stringify(current(state)))
            // console.log("cloneState", cloneState)
            // let newAnswers = cloneState.currentQuestion.answers.map(item=>{
            //     if(item.order === order) {
            //         return {...item, answer: answer};
            //     } else return item
            // })
            // state.currentQuestion = newAnswers
            console.log(order)
            switch (order) {
                case "A": {
                    state.currentQuestion.correct = 0;
                    break;
                }
                case "B": {
                    state.currentQuestion.correct = 1;
                    break;
                }
                case "C": {
                    state.currentQuestion.correct = 2;
                    break;
                }
                case "D": {
                    state.currentQuestion.correct = 3;
                    break;
                }
                default: {
                    state.currentQuestion.correct = null;
                    break;
                }
            }
        },
        finishCreateQuestion: (state, action) => {
            // let newListQuestion = [...state.listQuestions].map(item => {
            //     if (item.id === state.currentQuestion.id) return state.currentQuestion;
            //     else return item;
            // })
            // state.listQuestions = newListQuestion;
            let newQuestion = JSON.parse(JSON.stringify(state.currentQuestion))
            newQuestion.isEditting = false;
            state.listQuestions.push(newQuestion)
            let emptyQuestion = {
                id: Math.floor(Math.random() * 100),
                question: "",
                points: 1,
                answers: [
                    {
                        order: "A",
                        answer: ""
                    },
                    {
                        order: "B",
                        answer: ""
                    },
                    {
                        order: "C",
                        answer: ""
                    },
                    {
                        order: "D",
                        answer: ""
                    },
                ],
                correct: null
            };
            state.currentQuestion = emptyQuestion;
            state.isAddNewQuestion = false;
        },
        addQuestion: (state) => {
            state.isAddNewQuestion = true;
           
            // state.listQuestions.push(emptyQuestion);
        },
        editQuestion: (state, action) => {
            let id = action.payload;
            let question = state.listQuestions.find(item => item.id === id);
            state.isAddNewQuestion = false
            state.currentQuestion = question;

        },
        finishEditQuestion: (state, action) => {
            let newListQuetions = [...state.listQuestions].map(item => {
                if (item.id === state.currentQuestion.id) {
                    return state.currentQuestion
                }
                else return item
            })
            state.listQuestions = newListQuetions;
            let emptyQuestion = {
                id: Math.floor(Math.random() * 100),
                question: "",
                points: 1,
                answers: [
                    {
                        order: "A",
                        answer: ""
                    },
                    {
                        order: "B",
                        answer: ""
                    },
                    {
                        order: "C",
                        answer: ""
                    },
                    {
                        order: "D",
                        answer: ""
                    },
                ],
                correct: null
            };
            state.currentQuestion = emptyQuestion;
        }
    }
})
export const { 
    resetQuizz,
    getQuizz,
    createQuiz,
    updateTitleCurrentQuestion,
    updateAnswer,
    updateQuestionPoints,
    updateCorrectAnswer,
    finishCreateQuestion,
    addQuestion,
    editQuestion,
    finishEditQuestion,
    updateQuizTitle
} = quizSlice.actions;
export default quizSlice.reducer;