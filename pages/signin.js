import { Alert, Button, Container, Snackbar, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import AuthenticateLayout from "../components/layouts/authentication";
import axios from "axios"
import Link from "next/link";
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInSchema } from "../utils/validation/SignInSchema";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignIn() {
    const { handleSubmit, control, reset, formState:{errors} } = useForm({
        defaultValues: {
            username: "",
            password: ""
        },
        resolver: yupResolver(SignInSchema)
    });
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const router = useRouter();
    const onSubmit = async (data) => {
        let res = await axios.post("/api/authentication/signin", data);
        if(res.data.status === 400) {
            setOpenSnackBar(true)
        } else {
            router.push("/")
        }
    }
    const onError = () => {

    }
    const handleCloseSnackBar = () => {
        setOpenSnackBar(false)
    }
    return (
        <>
            <Container
                maxWidth="sm"
            >
                <Typography variant="h5" textAlign={"center"}>SIGN IN</Typography>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <Box>
                        <Typography variant="subtitle1">Username</Typography>
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <TextField 
                                {...field} 
                                error ={errors?.username?.message ? true : false}
                                fullWidth 
                                id="outlined-basic" 
                                variant="outlined" 
                                helperText = {<Typography variant="subtitle2" color="error">{errors?.username?.message && errors?.username?.message }</Typography>}
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
                                id="outlined-basic" 
                                variant="outlined" 
                                type="password"
                                helperText = {<Typography>{errors?.password?.message && errors?.password?.message}</Typography>}
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
                        You don't have any account? 
                        <Typography
                            color="primary"
                            sx={{textDecoration:"underline"}}
                            variant="subtitle1"
                        ><Link href="/signup">Sign up </Link></Typography>
                        here</Box>
                </form>
                <Snackbar
                    open={openSnackBar}
                    autoHideDuration={2000}
                    onClose={handleCloseSnackBar}
                    // message={errorResponse}
                    anchorOrigin={{vertical: "bottom",horizontal: "right"}}
                    // action={action}
                >
                    <Alert severity= "error">Username or password is not correct</Alert>
                </Snackbar>
            </Container>

        </>
    );
};
SignIn.getLayout = function getLayout(page) {
    return (
        <>
            <AuthenticateLayout>
                {page}
            </AuthenticateLayout>
        </>
    );
};
