import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import HomePageLayout from "../../components/layouts/homepage";
import { useReportsOfUser } from "../../hooks/useReportsOfUser";
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Link from "next/link";
import axios from "axios";

// const rows = [
//     { id: 1, title: "abc", created_at: "1/1/2022", score: 10 },
//     { id: 2, title: "abc", created_at: "1/1/2022", score: 10 },
//     { id: 3, title: "abc", created_at: "1/1/2022", score: 10 },
//     { id: 4, title: "abc", created_at: "1/1/2022", score: 10 },
// ]
const Reports = () => {
    const { data: reports, isLoading, refetch } = useReportsOfUser();
    const [rows, setRows] = useState(null);
    const [choosedReports, setChoosedReports] = useState([]);
    const [openDialogViewReport, setOpenDialogViewReport] = useState(false);
    const [openDialogConfirmDelete, setOpenDialogConfirmDelete] = useState(false);
    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'title', headerName: 'TITLE', width: 400 },
        { field: 'created_at', headerName: 'DATE', width: 200 },
        { field: 'score', headerName: 'SCORE', width: 100 },
    ];
    useEffect(() => {
        if (reports) {
            let cloneReports = JSON.parse(JSON.stringify(reports));

            let formatedRows = cloneReports?.map((item) => {
                return {
                    id: item?._id,
                    title: item?.quiz?.title,
                    created_at: moment(item.created_at).format("H:m:s DD/MM/YYYY"),
                    score: item?.rewardScore + "/" + item?.totalScore,
                };
            });
            setRows(formatedRows);
        }
    }, [reports]);
    const handleDeleteReport = async () => {
        for(let i=0; i<choosedReports?.length; i++) {
            await axios.get(`/api/reports/${choosedReports[i]?._id}/delete`);
        }
        refetch();
    };

    console.log("choosedReports", choosedReports);
    console.log("reports", reports);
    return (
        <>
            <HomePageLayout>
                <Box mt={3}>
                    <Typography variant="h4" gutterBottom={true}>Reports</Typography>
                    {rows &&
                        <Box
                            sx={{ height: 350 }}
                        >
                            {
                                choosedReports?.length !== 0
                                    ? (
                                        choosedReports?.length > 1
                                            ? <Button onClick={() => handleDeleteReport()}>Delete</Button>
                                            : <>
                                                <Button onClick={() => setOpenDialogViewReport(true)}>View Detail</Button>
                                                <Button onClick={() => handleDeleteReport()}>Delete</Button>
                                            </>
                                    )
                                    : ""
                            }
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                onSelectionModelChange={(newSelectionModel) => {
                                    console.log("newSelectionModel", newSelectionModel);
                                    let cloneReports = JSON.parse(JSON.stringify(reports));
                                    let filterReports = cloneReports?.filter((item) => newSelectionModel.includes(item?._id));
                                    setChoosedReports(filterReports);
                                }}
                            />
                        </Box>
                    }
                </Box>
                <Dialog
                    open={openDialogViewReport}
                    onClose={() => setOpenDialogViewReport(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {/* <DialogTitle id="alert-dialog-title">
                        {"Use Google's location service?"}
                    </DialogTitle> */}
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <Typography variant="h5" align="center">Score: {choosedReports?.[0]?.rewardScore}/{choosedReports?.[0]?.totalScore}</Typography>
                            <Divider my={3}></Divider>
                            <Typography variant="h5" mb={3}>Detail</Typography>
                            {choosedReports?.[0]?.result?.map((item, index) => {
                                const correctAnswer = item?.correctAnswer?.answer;
                                const chooseAnswer = item?.chooseAnswer?.answer;
                                const isCorrect = item?.correctAnswer?.order === item?.chooseAnswer?.order;
                                return (
                                    <Box
                                        key={item?.id}
                                        mb={2}
                                    >
                                        <Typography>{index + 1}. {item?.question}</Typography>
                                        <Box
                                            pl={3}
                                        >
                                            <Typography>Correct answer: {correctAnswer}</Typography>
                                            <Typography>Your answer:
                                                <span
                                                    style={{
                                                        color: isCorrect ? "green" : "red"
                                                    }}
                                                >
                                                    {chooseAnswer}
                                                </span>
                                            </Typography>
                                        </Box>
                                    </Box>
                                );
                            })}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialogViewReport(false)}>Close</Button>
                    </DialogActions>
                </Dialog>
            </HomePageLayout>
        </>
    );
};
export default Reports;