import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackAlertBar({message,severity,variant,duration}) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant={variant}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}