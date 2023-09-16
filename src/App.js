import React, { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseCounter from "./components/ExpenseCounter";
import Table from "./components/Table";
import Card from '@mui/material/Card';

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

    return (
        <div style={{margin: 'auto'}}>
            <Table/>
        </div>
    );
}

export default App;
