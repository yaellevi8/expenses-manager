import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { totalPrice } from './Table';


// Define a custom theme with updated typography settings
export default function ExpenseCounter({ totalPrice }) {
    return (
        <div style={{ margin: "auto" }}>
            <Card variant="outlined" sx={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
                <div>
                    <CardContent orientation="horizontal">
                        <Typography fontSize="lg" fontWeight="lg">Total Price:</Typography>
                        <Typography fontSize="lg" fontWeight="lg" level="body-xs">
                            {totalPrice} $
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}