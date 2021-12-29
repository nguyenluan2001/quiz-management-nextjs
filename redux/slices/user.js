import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    _id:"",
    fullname:"",
    email:"",
    username:""
}
const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    reducers:{
        getUser:(state, action) =>{
            let data= action.payload;
            console.log("Data", action.payload)
            state._id=data._id;
            state.fullname=data.fullname;
            state.email=data.email;
            state.username=data.username;
        }
    }
})
export const {getUser} = userSlice.actions;
export default userSlice.reducer;