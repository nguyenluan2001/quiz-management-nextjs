import { Grid, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Image from 'next/image';
const AuthenticateLayout = ({ children }) => {
    return (
        <>
            <Box
                sx={{
                    height:"100vh",
                    overflow:"hidden",
                    display:"flex"
                }}
            >
                <Box
                    sx={{
                        width:"60%"
                    }}
                >
                    <img src="/static/images/background_authen.jpg" style={{width:"100%"}}></img>
                </Box>
                <Box
                    sx={{
                        width:"40%"
                    }}
                >
                    <Box
                        sx={{
                            textAlign:"center",
                            mb:5
                        }}
                    >
                        <Typography variant='h3'>QUIZ MANAGEMENT</Typography>
                    </Box>
                    {children}
                </Box>
            </Box>

        </>

    );
};
export default AuthenticateLayout;