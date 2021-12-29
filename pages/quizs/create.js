import { Box, Button, Container, Divider, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import ProtectRoute from '../../components/ProtectRoute';
import Question from '../../components/questions/Question';
import { addQuestion, updateQuizTitle } from '../../redux/slices/quiz';

function CreateQuiz() {
    const quiz = useSelector(state => state.quiz);
    const dispatch = useDispatch();
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            checkbox: false,
        }
    });
    const handleChangeTitle = (e) => {
        let title = e.target.value;
        dispatch(updateQuizTitle(title));
    }
    const handleAddQuestion = () => {
        dispatch(addQuestion())
    }
    const handleSave = async() => {
        let newQuiz = {
            title: quiz?.title,
            listQuestions: quiz?.listQuestions
        };
        await axios.post("/api/quizs/create", newQuiz)
    }
    return (
        <ProtectRoute>
            <Container
                maxWidth="lg"
                sx={{ mt: 5 }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <TextField 
                    id="outlined-basic" 
                    variant="outlined" 
                    sx={{ width: "50%" }} 
                    value={quiz?.title} 
                    onChange={(e)=>handleChangeTitle(e)}
                    />
                    <Button variant="contained" color="primary" onClick={()=>handleSave()}>Save and Exit</Button>
                </Box>
                <Divider sx={{ my: 3 }}></Divider>
                {quiz?.listQuestions?.map((question, index) => {
                    return <Question question={question} index={index + 1}></Question>
                })}
                {quiz?.isAddNewQuestion && <Question></Question>}
                <Button onClick={() => handleAddQuestion()}>Add Question</Button>
            </Container>
        </ProtectRoute>
    )
}

export default CreateQuiz;
