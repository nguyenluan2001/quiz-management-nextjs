import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
const useSnackBar = () => {
    const [openSuccess, setOpenSuccess] = useState(true)
    // const [openSuccess, setOpenSuccess] = useState(true)
    const openSuccessSnack = ({ title = "" }) => {
        const handleClose = (event, reason)=>{
            if(reason === "clickaway") {
                return;
            }
            setOpenSuccess(false);
        }
        return (
            <>
                <Snackbar
                    open={true}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={title}
                    // action={action}
                />
                {/* {alert(openSuccess)} */}
            </>
        )
    }
    return {openSuccessSnack};

}
export default useSnackBar;