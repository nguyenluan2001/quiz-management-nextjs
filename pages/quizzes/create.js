import { Box, Button, Container, Divider, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import HomePageLayout from '../../components/layouts/homepage';
import ProtectRoute from '../../components/ProtectRoute';
import Question from '../../components/questions/Question';
import QuizzEdit from '../../components/quizzes/quizz.edit';
import { addQuestion, updateQuizTitle } from '../../redux/slices/quiz';

function CreateQuiz() {
    return (
        <ProtectRoute>
            <HomePageLayout>
               <QuizzEdit></QuizzEdit>
            </HomePageLayout>
        </ProtectRoute>
    )
}

export default CreateQuiz;
