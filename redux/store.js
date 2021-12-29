import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/user";
import QuizSlice from "./slices/quiz"
const store = configureStore({
    reducer:{
        "user": UserSlice,
        "quiz": QuizSlice
    }
})
export default store;