// src/components/ExpenseList.js
import React from 'react';

function ExpenseList({ expenses, onDeleteExpense }) {
    return (
        <ul>
            {expenses.map((expense, index) => (
                <li key={index}>
                    {expense.description} - ${expense.amount}
                    <button onClick={() => onDeleteExpense(index)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default ExpenseList;
