import { Icon } from "@iconify/react";
import { Button, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import HomePageLayout from "../../components/layouts/homepage";
import chevronLeft from '@iconify/icons-mdi/chevron-left';
import chevronRight from '@iconify/icons-mdi/chevron-right';

import { useQuizzById } from "../../hooks/useQuizzById";
import { chooseAnswer, getQuizz, nextQuestion, previosQuestion, previousQuestion } from "../../redux/slices/play";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import quiz, { resetQuizz } from "../../redux/slices/quiz";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from "next/link";
import axios from "axios";
const Play = () => {
    const router = useRouter();
    const { quizz_id } = router.query;
    const { data: quizz, isLoading } = useQuizzById({ quizz_id });
    const [currentQuestionOrder, setCurrentQuestionOrder] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const play = useSelector(state => state.play);
    const user = useSelector(state => state.user);
    console.log("user", user);
    const dispatch = useDispatch();
    useEffect(() => {
        if (quizz && !isLoading) dispatch(getQuizz(quizz));
    }, [isLoading]);
    useEffect(() => {
        let currentIndex = play?.listQuestions?.findIndex((item) => item.id === play.currentQuestion.id);
        setCurrentQuestionOrder(currentIndex + 1);
    }, [play]);
    const handleNextQuestion = () => {
        dispatch(nextQuestion());
    };
    const handlePreviousQuestion = () => {
        dispatch(previousQuestion());
    };
    const handleFinishedQuizz = async() => {
        console.log("play", play);
        let result = play?.listQuestions?.map((item) => {
            const chooseAnswer = item?.answers?.find((answer) => answer.order === item?.chooseAnswer);
            return {
                question: item.question,
                correctAnswer: item?.answers[item.correct],
                chooseAnswer: {
                    order: item?.chooseAnswer,
                    answer: chooseAnswer?.answer
                }
            };
        });
        let report = {
            quiz: quizz_id,
            result:result,
            totalScore: play?.totalScore,
            rewardScore: play?.rewardScore,
            user: user?._id
        } ;
        await axios.post("/api/reports/create", report);
        setOpenDialog(true);
        console.log("report", report);

    };
    const AnswerItem = ({ answer }) => {
        const handleChooseAnswer = () => {
            dispatch(chooseAnswer(answer));
        };
        return (
            <Grid item xs={6}>
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                >
                    <Box
                        sx={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "1px solid black",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer"
                        }}
                        onClick={() => handleChooseAnswer()}
                    >{answer?.order}</Box>
                    <Box
                        sx={{
                            borderRadius: "5px",
                            border: "1px solid black",
                            height: "40px",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: "10px",
                            cursor: "pointer",
                            background: play?.currentQuestion?.chooseAnswer === answer?.order ? "red" : ""

                        }}
                        onClick={() => handleChooseAnswer()}
                    >
                        {answer?.answer}
                    </Box>
                </Stack>
            </Grid>
        );
    };
    return (
        <HomePageLayout>
            <Box mt={5}>
                <Stack direction="row" justifyContent="space-between" mb={3}>
                    <Typography variant="h3">{play?.title}</Typography>
                    <Button variant="contained" color="warning" onClick={() => handleFinishedQuizz()}>Finish Quiz</Button>
                    <Dialog
                        open={openDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Result"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Typography variant="h5" align="center">Score: {play?.rewardScore}/{play?.totalScore}</Typography>
                                <Divider my={3}></Divider>
                                <Typography variant="h5" mb={3}>Detail</Typography>
                                {play?.listQuestions?.map((item, index) => {
                                    const correctAnswer = item?.answers[item?.correct];
                                    const yourAnswer = item?.answers.find((answer) => answer?.order === item?.chooseAnswer);
                                    const isCorrect = item?.answers?.[item?.correct]?.order === item?.chooseAnswer;
                                    return (
                                        <Box
                                            key={item?.id}
                                            mb={2}
                                        >
                                            <Typography>{index + 1}. {item?.question}</Typography>
                                            <Box
                                                pl={3}
                                            >
                                                <Typography>Correct answer: {correctAnswer?.answer}</Typography>
                                                <Typography>Your answer:
                                                    <span
                                                        style={{
                                                            color:isCorrect ? "green" : "red"
                                                        }}
                                                    >
                                                        {yourAnswer?.answer}
                                                    </span>
                                                </Typography>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus>
                                <Link href="/quizzes">Back to homepage</Link>
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Stack>
                <Divider></Divider>
                <Stack direction="row" justifyContent="center" alignItems="center">
                    {currentQuestionOrder > 1
                        ? (<IconButton size="large" onClick={() => handlePreviousQuestion()}>
                            <Icon icon={chevronLeft}></Icon>
                        </IconButton>)
                        : (<IconButton size="large" disabled>
                            <Icon icon={chevronLeft}></Icon>
                        </IconButton>)
                    }
                    <Typography variant="subtitle1">
                        {currentQuestionOrder || 1}
                        of {play?.listQuestions?.length}</Typography>
                    {currentQuestionOrder < play?.listQuestions.length
                        ? (<IconButton size="large" onClick={() => handleNextQuestion()}>
                            <Icon icon={chevronRight}></Icon>
                        </IconButton>)
                        : (<IconButton size="large" disabled>
                            <Icon icon={chevronRight}></Icon>
                        </IconButton>)
                    }
                </Stack>
                <Divider></Divider>
                <Box mt={3}>
                    <Typography variant="h5" mb={5}>{currentQuestionOrder}. {play?.currentQuestion?.question}</Typography>
                    <Grid container spacing={3}>
                        {
                            play?.currentQuestion?.answers?.map((item, index) => {
                                return (<AnswerItem answer={item} key={index}></AnswerItem>);
                            })
                        }

                    </Grid>

                </Box>
            </Box>
        </HomePageLayout>
    );
};

export default Play;