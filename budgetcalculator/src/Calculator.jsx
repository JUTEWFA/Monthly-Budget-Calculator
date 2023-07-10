import React, { useState } from 'react';
import DownloadButton from './DownloadButton';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';




const BudgetCalculator = () => {
  const [income, setIncome] = useState('');
  const [rent, setRent] = useState('');
  const [utilities, setUtilities] = useState('');
  const [groceries, setGroceries] = useState('');
  const [transportation, setTransportation] = useState('');
  const [otherExpenses, setOtherExpenses] = useState('');
  const [additionalExpenses, setAdditionalExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savings, setSavings] = useState(0);

  const calculateTotalExpenses = () => {
    const additionalExpensesTotal = additionalExpenses.reduce((total, expense) => total + expense.amount, 0);
    const total = Number(rent) + Number(utilities) + Number(groceries) + Number(transportation) + Number(otherExpenses) + additionalExpensesTotal;
    setTotalExpenses(total);
  };

  const calculateSavings = () => {
    const savings = Number(income) - totalExpenses;
    setSavings(savings);
  };

  const handleAddExpense = () => {
    setAdditionalExpenses([...additionalExpenses, { name: '', amount: '' }]);
  };

  const handleExpenseChange = (index, field, value) => {
    const updatedExpenses = [...additionalExpenses];
    updatedExpenses[index][field] = value;
    setAdditionalExpenses(updatedExpenses);
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const inputStyles = {
    marginBottom: '1rem',
    padding: '0.5rem',
    width: '100%',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#eaf6ff',
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const buttonStyles = {
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const handleDownload = () => {
    const budgetData = {
      income,
      rent,
      utilities,
      groceries,
      transportation,
      otherExpenses,
      additionalExpenses,
      totalExpenses,
      savings
    };
  
    const doc = new jsPDF();
  
    const tableData = Object.entries(budgetData).map(([category, amount]) => [category, amount]);
  
    doc.autoTable({
      head: [['Category', 'Amount']],
      body: tableData,
    });
  
    doc.save('budget.pdf');
  };
  
  
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={containerStyles}>
        <h2 style={{ marginBottom: '1rem' }}>Monthly Budget Calculator</h2>
        <label>Monthly Income: </label>
        <input
          style={inputStyles}
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Enter income"
        />
        <label>Rent: </label>
        <input
          style={inputStyles}
          type="number"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
          placeholder="Enter rent"
        />
        <label>Utilities: </label>
        <input
          style={inputStyles}
          type="number"
          value={utilities}
          onChange={(e) => setUtilities(e.target.value)}
          placeholder="Enter utilities"
        />
        <label>Groceries: </label>
        <input
          style={inputStyles}
          type="number"
          value={groceries}
          onChange={(e) => setGroceries(e.target.value)}
          placeholder="Enter groceries"
        />
        <label>Transportation: </label>
        <input
          style={inputStyles}
          type="number"
          value={transportation}
          onChange={(e) => setTransportation(e.target.value)}
          placeholder="Enter transportation"
        />
        <label>Other Expenses: </label>
        <input
          style={inputStyles}
          type="number"
          value={otherExpenses}
          onChange={(e) => setOtherExpenses(e.target.value)}
          placeholder="Enter other expenses"
        />
        <label>Additional Expenses: </label>
        {additionalExpenses.map((expense, index) => (
          <div key={index}>
            <input
              style={inputStyles}
              type="text"
              value={expense.name}
              onChange={(e) => handleExpenseChange(index, 'name', e.target.value)}
              placeholder="Enter expense name"
            />
            <input
              style={inputStyles}
              type="number"
              value={expense.amount}
              onChange={(e) => handleExpenseChange(index, 'amount', e.target.value)}
              placeholder="Enter expense amount"
            />
          </div>
        ))}
        <button style={buttonStyles} onClick={handleAddExpense}>
          Add Expense
        </button>
        <button style={buttonStyles} onClick={calculateTotalExpenses}>
          Calculate Total Expenses
        </button>
        <p>Total Expenses: {totalExpenses}</p>
        <button style={buttonStyles} onClick={calculateSavings}>
          Calculate Savings
        </button>
        <p>Savings: {savings}</p>

        <button onClick={handleDownload}>Download Budget</button>

      </div>

      <footer className="footer">
         <p>This project developed by Jutewfa Borpatra Gohain.</p>
      </footer>
    </div>
  );
};

export default BudgetCalculator;
