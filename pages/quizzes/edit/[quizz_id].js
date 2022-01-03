import { Box, Button, Container, Divider, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import {useEffect} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import HomePageLayout from '../../../components/layouts/homepage';
import ProtectRoute from '../../../components/ProtectRoute';
import Question from '../../../components/questions/Question';
import QuizzEdit from '../../../components/quizzes/quizz.edit';
import { useQuizzById } from '../../../hooks/useQuizzById';
import { addQuestion, getQuizz, updateQuizTitle } from '../../../redux/slices/quiz';

function EditQuiz() {
    const router = useRouter();
    const {quizz_id} = router.query;
    const {data: quizz} = useQuizzById({quizz_id});
    const dispatch = useDispatch();
    console.log("quizz", quizz);
    useEffect(() => {
        if(quizz) {
            dispatch(getQuizz(quizz));
        }
    }, [quizz])
    return (
        <ProtectRoute>
            <HomePageLayout>
               <QuizzEdit quizz={quizz}></QuizzEdit>
            </HomePageLayout>
        </ProtectRoute>
    )
}

export default EditQuiz;
