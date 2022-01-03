import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Avatar, Container, Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from '@mui/styles';
import { useRouter } from "next/router";
import ProtectRoute from "../ProtectRoute";
const useStyles = makeStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
    tabItem: {
        '&:hover + div': {
            visibility: "visible"

        }
    }
});
const HomePageLayout = ({ children }) => {
    const user = useSelector(state => state.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState(0);
    const router = useRouter();
    let path = router.route.split("/")[1];
    console.log(path);
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const getLetterOfName = () => {
        let firstLetter = user.fullname[0];
        return firstLetter?.toUpperCase() || "U";
    };
    return (
        <ProtectRoute>

            <Box>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    px={5}
                    py={3}
                    sx={{
                        background: "#8cb4d2"
                    }}
                >
                    <Box>
                    </Box>
                    <Box>
                        <Typography variant="h5" color="white">
                            <Link href="/quizzes">QUIZ MANAGEMENT</Link>
                        </Typography>
                    </Box>
                    <Box>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>{getLetterOfName()}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                Hello, {user.fullname}
                            </MenuItem>
                            <MenuItem>
                                <Avatar /> Profile
                            </MenuItem>
                            <MenuItem>
                                <Avatar /> My account
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon>
                                    <PersonAdd fontSize="small" />
                                </ListItemIcon>
                                Add another account
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Stack>
                <Box
                    sx={{
                        background: "#8cb4d2"
                    }}
                >
                    <Container maxWidth="lg">
                        <Stack
                            direction="row"
                        >
                            <Box
                                sx={{
                                    paddingBottom: "2px",
                                    paddingRight: "2px"

                                }}
                            >
                                <Box
                                    px={3}
                                    className={classes.tabItem}

                                >
                                    <Typography
                                        variant="subtitle1"
                                        color="white"
                                    >
                                        <Link
                                            href="/quizzes"
                                        >
                                            QUIZZES
                                        </Link>
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "3px",
                                        background: "white",
                                        visibility: path === "quizzes" ? "visible" : "hidden"
                                    }}
                                ></Box>
                            </Box>
                            <Box
                                sx={{
                                    paddingBottom: "2px",
                                    paddingRight: "2px"

                                }}
                            >
                                <Box
                                    px={3}
                                    className={classes.tabItem}

                                >
                                    <Typography
                                        variant="subtitle1"
                                        color="white"
                                    >
                                        <Link
                                            href="/reports"
                                        >
                                            REPORTS
                                        </Link>
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "3px",
                                        background: "white",
                                        visibility: path === "reports" ? "visible" : "hidden"
                                    }}
                                ></Box>
                            </Box>

                        </Stack>
                    </Container>
                </Box>
                <Container maxWidth="lg">
                    {children}
                </Container>
            </Box>
        </ProtectRoute>
    )
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
export default HomePageLayout;