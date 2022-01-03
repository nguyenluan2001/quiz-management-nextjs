import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    title: null,
    listQuestions: [],
    currentQuestion: null,
    totalScore: 0,
    rewardScore: 0
};
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

export const playSlice = createSlice({
    name: "play",
    initialState,
    reducers: {
        getQuizz: (state, action) => {
            let { title, listQuestions } = action.payload;
            state.title = title;
            state.listQuestions = listQuestions.sort(() => Math.random() - 0.5);
            
            let score = listQuestions.reduce((pre, curr) => {
                return {points: parseInt(pre.points)+parseInt(curr.points)};
            });
            console.log("score", score);
            state.totalScore = score.points;
            state.currentQuestion = state.listQuestions[0];
            // state.finishedQuestions.push(state.currentQuestion);
        },
        chooseAnswer: (state, action) => {
            //handle choose answer
            let answer = action.payload;
            let correctIndex = state.currentQuestion.correct;
            state.currentQuestion.chooseAnswer = answer?.order;
            if (state.currentQuestion.answers[correctIndex]?.order === answer?.order) {
                state.currentQuestion.result = true;
                state.rewardScore += parseInt(state.currentQuestion.points);
            } else {
                state.currentQuestion.result = false;
            }
            // let newFinishedQuestions = [...state.finishedQuestions].map((item) => {
            //     if (item.id === state.currentQuestion.id) return state.currentQuestion;
            //     else return item;
            // })
            // state.finishedQuestions = newFinishedQuestions;
            let newListQuestions = [...state.listQuestions].map((item) => {
                if(item.id === state.currentQuestion.id) return state.currentQuestion;
                else return item;
            });
            state.listQuestions = newListQuestions;

        },
        nextQuestion: (state, action) => {
            // let finishQuestionsId = [...state.finishedQuestions].map((item) => item.id);
            // let restQuestions = [...state.listQuestions].filter((item) => !finishQuestionsId.includes(item.id));
            // console.log("restQuestions", restQuestions);
            // state.currentQuestion = restQuestions[0];
            // state.finishedQuestions.push(state.currentQuestion);
            let currentIndex = [...state.listQuestions].findIndex((item) => item.id === state.currentQuestion.id);
            state.currentQuestion = state.listQuestions[currentIndex+1];
        },
        previousQuestion: (state, action) => {
            // let finishedQuestionsLen = state.finishedQuestions.length;
            // state.currentQuestion = state.finishedQuestions[finishedQuestionsLen-2]
            let currentIndex = [...state.listQuestions].findIndex((item) => item.id === state.currentQuestion.id);
            state.currentQuestion = state.listQuestions[currentIndex-1];
        }

    }
});
export const {
    getQuizz,
    chooseAnswer,
    nextQuestion,
    previousQuestion
} = playSlice.actions;
export default playSlice.reducer;