/*
Efi Tzaig, 315852160
Yael Levi, 207196205
*/

import React from 'react';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

/**
 * A component that displays a success message in a dialog.
 *
 * @param {object} props - The props passed to the component.
 * @param {boolean} props.open - A boolean indicating whether the dialog is open.
 * @param {function} props.onClose - A function to be called when the dialog is closed.
 * @returns {JSX.Element} The rendered SuccessAlert component.
 */
export default function SuccessAlert({ open,message, onClose }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <Alert severity="success" variant="outlined">
                <AlertTitle>Success</AlertTitle>
                {message}
            </Alert>
        </Dialog>
    );
}