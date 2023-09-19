/*
Efi Tzaig, 315852160
Yael Levi, 207196205
*/

import * as React from 'react';
import './ExpenseCounter.css';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import CardContent from '@mui/joy/CardContent';


/**
 * React component for displaying the total sum of expenses.
 *
 * @param {object} props - The props passed to the component.
 * @param {number} props.totalSum - The total sum of expenses to be displayed.
 * @returns {JSX.Element} The rendered expense counter component.
 */
export default function ExpenseCounter({ totalSum }) {
    return (
        <div className="card-container">
            <Card className="counter-card">
                <div>
                    <CardContent orientation="horizontal" className="card-content">
                        <Typography className="total-sum-label">Total Sum:</Typography>
                        <Typography className="total-sum-value">
                            ${totalSum.toLocaleString()}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}