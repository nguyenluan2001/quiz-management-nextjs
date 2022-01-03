import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/user";
import QuizSlice from "./slices/quiz";
import PlaySlice from "./slices/play";
const store = configureStore({
    reducer:{
        "user": UserSlice,
        "quiz": QuizSlice,
        "play": PlaySlice,
    }
});
export default store;