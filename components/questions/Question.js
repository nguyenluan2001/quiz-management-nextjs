import { Button, Checkbox, IconButton, Radio, Stack, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { Controller, useForm, useFormContext } from "react-hook-form"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, editQuestion, finishCreateQuestion, finishEditQuestion, updateAnswer, updateCorrectAnswer, updateQuestionPoints, updateTitleCurrentQuestion } from "../../redux/slices/quiz";
import { useEffect, useState } from "react";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const orders = ["A", "B", "C", "D"];
const Question = ({ question, index }) => {
    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            question: "",
            // points: question.points,
            answers: []

        }
    });
    const dispatch = useDispatch();
    const [canEdit, setCanEdit] = useState(false);
    const quiz = useSelector(state => state.quiz);
    console.log("quiz", quiz);
    console.log("question", question)
    useEffect(() => {
        // let questionsId = quiz?.listQuestions?.map((item) => item?.id)
        if (question?.id === quiz?.currentQuestion?.id && question) {
            setCanEdit(true)
        }
        else setCanEdit(false)
    }, [quiz])
    const handleChangeTitle = (e) => {
        dispatch(updateTitleCurrentQuestion(e.target.value))
        console.log(e.target.value)
    }
    const handleChangePoint = (e) => {
        dispatch(updateQuestionPoints(e.target.value));
    }
    const handleChangeAnswer = (e, order) => {
        dispatch(updateAnswer({ order: order, answer: e.target.value }))
        console.log(e.target.value)
    }
    const handleFinishCreateQuestion = () => {
        dispatch(finishCreateQuestion())
    }
    const handleChooseCorrectAnswer = (e, order) => {
        if (e.target.checked) {
            dispatch(updateCorrectAnswer(order))
        }
        else {
            dispatch(updateCorrectAnswer(null))
        }

    }
    const handleAddQuestion = () => {
        dispatch(addQuestion())
    }
    const handleEditQuestion = () => {
        dispatch(editQuestion(question?.id))
    }
    const handleFinishEditQuestion = () => {
        dispatch(finishEditQuestion())
        setCanEdit(true)
    }
    const Answer = ({ order }) => {
        const [currentAnswer, setCurrentAnswer] = useState(null);
        useEffect(() => {
            let currentAnswer = quiz.currentQuestion.answers.find(item => item.order === order)
            setCurrentAnswer(currentAnswer)
        }, [quiz]);
        const handleChangeAnswer = (e) => {
            dispatch(updateAnswer({ order: order, answer: e.target.value }))
            console.log(e.target.value)
        }
        return (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 3
                }}
            >
                <Box
                    sx={{
                        width: "30px",
                        height: "30px",
                        background: "gray",
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white"
                    }}
                >{order}</Box>
                <Checkbox
                    {...label}
                // icon={<BookmarkBorderIcon />}
                // checkedIcon={<BookmarkIcon />}
                />
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder='Have a multiple-choice question to ask?'
                    sx={{ flex: 3, mr: 3 }}
                    // value={currentAnswer?.answer}
                    onChange={(e) => handleChangeAnswer(e)}

                />


                <IconButton aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Box>
        )
    }
    return (
        <Stack
            direction="row"
        >
            <Box
                sx={{ width: "70%" }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 4
                    }}
                >
                    {
                        quiz?.listQuestions?.length === 0 &&
                        <Typography variant="h5">1.</Typography>

                    }
                    {
                        quiz?.listQuestions?.length !== 0 &&
                        <Typography variant="h4" >{index ? index : quiz?.listQuestions?.length + 1}.</Typography>
                    }
                    {question ?
                        (
                            canEdit ?
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder='Have a multiple-choice question to ask?'
                                    sx={{ flex: 3, mx: 3 }}
                                    onChange={(e) => handleChangeTitle(e)}
                                    // value={question?.question && question?.question}
                                    value={quiz?.currentQuestion?.question}
                                />
                                : <Typography sx={{ml:3}} variant="body1">{question?.question}</Typography>
                        )
                        : <TextField
                            id="outlined-basic"
                            variant="outlined"
                            placeholder='Have a multiple-choice question to ask?'
                            sx={{ flex: 3, mx: 3 }}
                            onChange={(e) => handleChangeTitle(e)}
                            // value={question?.question && question?.question}
                            value={quiz?.currentQuestion?.question}
                        />


                    }
                    {question ?
                        (
                            canEdit ?
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    placeholder='points'
                                    // value={question?.points && question?.points}
                                    value={quiz?.currentQuestion?.points}
                                    onChange={(e) => handleChangePoint(e)}
                                />
                                : ""

                        )
                        : (
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                placeholder='points'
                                // value={question?.points && question?.points}
                                value={quiz?.currentQuestion?.points}
                                onChange={(e) => handleChangePoint(e)}
                            />
                        )

                    }
                </Box>
                <Box>
                    {/* <Answer order="A"></Answer>
                    <Answer order="B"></Answer>
                    <Answer order="C"></Answer>
                    <Answer order="D"></Answer> */}
                    {
                        orders?.map((item, index) => {
                            return (
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 3
                                    }}
                                    key={index}
                                >
                                    <Box
                                        sx={{
                                            width: "30px",
                                            height: "30px",
                                            background: question?.correct === index ?"green":"gray",
                                            borderRadius: "50%",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            color: "white"
                                        }}
                                    >{item}</Box>
                                    {question ?
                                        (
                                            canEdit ?
                                                (<input type="radio"
                                                    onClick={(e) => handleChooseCorrectAnswer(e, item)}
                                                    name={question ? `answer_${question?.id}` : "answer"}
                                                    // checked={(question?.correct === index || quiz?.currentQuestion?.correct === index) ? true : ""}
                                                    checked={
                                                        ((question && question?.correct === index) || quiz?.currentQuestion?.correct === index)
                                                            ? true : false
                                                    }
                                                />)
                                                : ""
                                        )

                                        : (<input type="radio"
                                            onClick={(e) => handleChooseCorrectAnswer(e, item)}
                                            name={question ? `answer_${question?.id}` : "answer"}
                                            // checked={(question?.correct === index || quiz?.currentQuestion?.correct === index) ? true : ""}
                                            checked={
                                                ((question && question?.correct === index) || quiz?.currentQuestion?.correct === index)
                                                    ? true : false
                                            }
                                        />)
                                    }
                                    {question ?
                                        (
                                            canEdit ?
                                                <TextField
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    placeholder='Have a multiple-choice question to ask?'
                                                    sx={{ flex: 3, mr: 3 }}
                                                    // value={currentAnswer?.answer}
                                                    // value={question?.answers[index]?.answer}
                                                    value={quiz?.currentQuestion?.answers[index]?.answer}
                                                    onChange={(e) => handleChangeAnswer(e, item)}
                                                />
                                                : <Typography sx={{ml:3}}>{question?.answers[index]?.answer}</Typography>
                                        )
                                        : (<TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            placeholder='Have a multiple-choice question to ask?'
                                            sx={{ flex: 3, mr: 3 }}
                                            // value={currentAnswer?.answer}
                                            // value={question?.answers[index]?.answer}
                                            value={quiz?.currentQuestion?.answers[index]?.answer}
                                            onChange={(e) => handleChangeAnswer(e, item)}

                                        />)
                                    }


                                    {canEdit ?
                                        <IconButton aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                        : ""
                                    }
                                </Box>
                            )
                        })
                    }

                    {canEdit && <Button onClick={() => handleFinishEditQuestion()}>submit</Button>}
                    {!question && <Button onClick={() => handleFinishCreateQuestion()}>submit</Button>}
                </Box>
                {/* {<Button onClick={() => handleAddQuestion()}>Add question</Button>} */}
            </Box>
            <Box
                sx={{ width: "30%" }}
            >
                {canEdit ?
                    <Box></Box>
                    : (
                        <Box>
                            <Button onClick={() => handleEditQuestion()}>Edit</Button>
                        </Box>
                    )

                }
            </Box>

        </Stack>
    )
}
export default Question;