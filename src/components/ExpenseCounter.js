import * as React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import CardContent from '@mui/joy/CardContent';


/**
 * React component for displaying the total price of expenses.
 *
 * @param {object} props - The props passed to the component.
 * @param {number} props.totalPrice - The total price of expenses to be displayed.
 * @returns {JSX.Element} The rendered expense counter component.
 */
export default function ExpenseCounter({ totalPrice }) {
    return (
        <div style={{ margin: "auto" }}>
            <Card variant="outlined" sx={{ marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
                <div>
                    <CardContent orientation="horizontal">
                        <Typography fontWeight="bold">Total Price:</Typography>
                        <Typography fontWeight="bold" variant="body-xs">
                            {totalPrice} $
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}