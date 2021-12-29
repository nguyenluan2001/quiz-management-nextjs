import { Alert, Button, Container, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import AuthenticateLayout from "../components/layouts/authentication";
import axios from "axios"
import Link from "next/link";
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpSchema } from "../utils/validation/SignUpSchema";
import useSnackBar from "../hooks/useSnackBar";
import { useState } from "react";
import { useRouter } from "next/router";
export default function SignUp() {
    const { handleSubmit, control, reset, formState:{errors} } = useForm({
        defaultValues: {
            fullname: "",
            username: "", 
            email: "",
            password: ""
        },
        resolver: yupResolver(SignUpSchema)
    });
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const router = useRouter();
    const onSubmit = async (data) => {
        let res = await axios.post("/api/authentication/signup", data);
        console.log(res);
        if(res.data.status === 400) {
            setResponseData(res.data);
            setOpenSnackBar(true)
        } else {
            setResponseData(res.data);
            router.push("/signin");
        }
    }
    const onError = () => {

    }
    return (
        <>
            <Container
                maxWidth="sm"
            >
                <Typography variant="h5" textAlign={"center"}>SIGN UP</Typography>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <Box>
                        <Typography variant="subtitle1">Fullname</Typography>
                        <Controller
                            name="fullname"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField {...field} 
                                error = {errors?.fullname?.message}
                                fullWidth 
                                id="outlined-basic" 
                                variant="outlined" 
                                helperText ={ <Typography color="error" variant="subtitle2">{errors?.fullname?.message && errors?.fullname?.message }</Typography>}
                                />
                            )}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">Email</Typography>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                error = {errors?.email?.message ? true : false}
                                fullWidth 
                                id="outlined-basic" 
                                variant="outlined" 
                                helperText = {<Typography color="error" variant="subtitle2">{errors?.email?.message && errors?.email?.message }</Typography>}
                                />
                            )}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">Username</Typography>
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                error = {errors?.username?.message ? true : false}
                                fullWidth 
                                id="outlined-basic" 
                                variant="outlined" 
                                helperText = {<Typography color="error" variant="subtitle2">{errors?.username?.message && errors?.username?.message }</Typography>}
                                />
                            )}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">Password</Typography>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                error = {errors?.password?.message ? true : false}
                                fullWidth 
                                type="password"
                                id="outlined-basic" 
                                variant="outlined" 
                                helperText = {<Typography color="error" variant="subtitle2">{errors?.password?.message && errors?.password?.message }</Typography>}
                                />
                            )}
                        />
                    </Box>
                    <Box
                        sx={{
                            display:"flex",
                            justifyContent:"center",
                            mt:3
                        }}
                    >
                        <Button variant="contained" color="success" type="submit">Submit</Button>
                    </Box>
                    <Box
                        sx={{
                            display:"flex", 
                            justifyContent:"center",
                            alignItems:"center",
                            mt:3
                        }}
                    >
                        You already have account
                        <Typography
                            color="primary"
                            sx={{textDecoration:"underline"}}
                        ><Link href="/signin">Sign in </Link></Typography>
                        here</Box>
                </form>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={6000}
                    // onClose={handleClose}
                    // message={errorResponse}
                    anchorOrigin={{vertical: "bottom",horizontal: "right"}}
                    // action={action}
                >
                    <Alert severity={responseData?.status === 400 ? "error" : "success"}>{responseData?.message}</Alert>
                </Snackbar>
            </Container>

        </>
    );
};
SignUp.getLayout = function getLayout(page) {
    return (
        <>
            <AuthenticateLayout>
                {page}
            </AuthenticateLayout>
        </>
    );
};
