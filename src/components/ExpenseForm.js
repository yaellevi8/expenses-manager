// src/components/ExpenseForm.js
import React, { useState } from 'react';
import { Button, TextField, Grid, Paper } from '@mui/material';
import { AddCircleOutline as AddCircleOutlineIcon } from '@mui/icons-material';

function ExpenseForm({ onAddExpense }) {
    const [expense, setExpense] = useState({
        description: '',
        amount: 0,
        category: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddExpense(expense);
        setExpense({ description: '', amount: 0, category: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        variant="outlined"
                        value={expense.description}
                        onChange={handleChange}
                    />
                </Grid>
                {/* ... other input fields */}
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                    >
                        Add Expense
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default ExpenseForm;
