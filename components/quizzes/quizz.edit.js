import { Box, Button, Container, Divider, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import Question from '../../components/questions/Question';
import { addQuestion, resetQuizz, updateQuizTitle } from '../../redux/slices/quiz';
const QuizzEdit = ({ quizz }) => {
    const quiz = useSelector(state => state.quiz);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
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
    const handleSave = async () => {
        let newQuiz = {
            title: quiz?.title,
            listQuestions: quiz?.listQuestions,
            user: user?._id
        };
        if (quizz) await axios.post(`/api/quizs/edit/${quizz._id}`, newQuiz);
        else await axios.post("/api/quizs/create", newQuiz);
        dispatch(resetQuizz());
        router.push("/quizzes");


    }

    return (
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
                    onChange={(e) => handleChangeTitle(e)}
                />
                <Button variant="contained" color="primary" onClick={() => handleSave()}>Save and Exit</Button>


            </Box>
            <Divider sx={{ my: 3 }}></Divider>
            {quiz?.listQuestions?.map((question, index) => {
                return <Question question={question} index={index + 1}></Question>
            })}
            {quiz?.isAddNewQuestion && <Question></Question>}
            <Button onClick={() => handleAddQuestion()}>Add Question</Button>
        </Container>
    )
}
export default QuizzEdit;