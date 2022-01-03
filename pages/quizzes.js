import { AccountCircle } from "@mui/icons-material";
import { Button, Container, Input, InputAdornment, Stack } from "@mui/material";
import { Icon } from '@iconify/react';
import magnifyIcon from '@iconify/icons-mdi/magnify';
import plusIcon from '@iconify/icons-mdi/plus';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import HomePageLayout from "../components/layouts/homepage";
import { useQuizzes } from "../hooks/useQuizzes";
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import axios from "axios";
const Quizzes = () => {
    const { data: quizzes, isLoading, refetch } = useQuizzes();
    const [currentQuizzes, setCurrentQuizzes] = useState(null);
    const [keyWord, setKeyWord] = useState(null);
    const router = useRouter();
    useEffect(()=>{
        if(quizzes) setCurrentQuizzes(quizzes)
    }, [quizzes])
    const handleSubmitSearch = async(e) => {
        e.preventDefault();
        let response = await axios.get(`/api/quizs/search?p=${keyWord}`);
        setCurrentQuizzes(response.data);
    }
    return (
        <>
            <HomePageLayout>
                <Container
                    sx={{
                        padding: "20px 0 20px 0"
                    }}
                >
                    <Stack direction="row" justifyContent="space-between" mb={3}>
                        <form onSubmit={(e)=>handleSubmitSearch(e)}>
                            <Input
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <Icon icon={magnifyIcon} style={{ fontSize: "2rem" }}></Icon>
                                }
                                placeholder="Search Quizzes"
                                onChange={(e) => setKeyWord(e.target.value)}
                            />
                        </form>
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<Icon icon={plusIcon}></Icon>}
                            onClick={() => router.push("/quizzes/create")}
                        >Add new</Button>
                    </Stack>
                    <ListQuizzes quizzes={currentQuizzes} refetch={refetch}></ListQuizzes>
                </Container>
            </HomePageLayout>
        </>
    )
}
const ListQuizzes = ({ quizzes, refetch }) => {
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [chooseQuizz, setChooseQuiz] = useState(null);
    const handleChooseDeleteQuizz = (quizz) => {
        setChooseQuiz(quizz);
        setOpenConfirmDelete(true);
    }
    const handleCloseDialog = () => {
        setOpenConfirmDelete(false);
    }
    const handleDeleteQuizz = async () => {
        await axios.delete(`/api/quizs/delete/${chooseQuizz._id}`);
        setOpenConfirmDelete(false);
        refetch();
    }
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {quizzes?.map((row) => (
                            <TableRow
                                key={row?._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row?.title}
                                </TableCell>
                                <TableCell component="th" scope="row" align="center">
                                    {moment(row?.created_at).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={3} justifyContent="center">
                                        <Button variant="contained" color="primary">
                                            <Link href={`/quizzes/edit/${row?._id}`}>Edit</Link>
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleChooseDeleteQuizz(row)}>Delete</Button>
                                        <Button variant="contained" color="warning">
                                            <Link href={`/play/${row?._id}`}>Play</Link>
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={openConfirmDelete}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm delete quizz"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete this quizz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Disagree</Button>
                    <Button onClick={() => handleDeleteQuizz()} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
export default Quizzes;