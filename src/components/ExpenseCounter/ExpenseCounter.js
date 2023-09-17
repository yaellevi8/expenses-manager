import * as React from 'react';
import './ExpenseCounter.css';
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
        <div className="card-container">
            <Card variant="outlined" className="card">
                <div>
                    <CardContent orientation="horizontal" className="card-content">
                        <Typography className="total-price-label">Total Price:</Typography>
                        <Typography className="total-price-value">
                            {totalPrice} $
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}