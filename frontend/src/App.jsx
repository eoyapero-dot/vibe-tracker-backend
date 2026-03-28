import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  // Form States
  const [taskTitle, setTaskTitle] = useState('');
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  // 1. Fetch Data on Load
  useEffect(() => {
    fetch('http://localhost:8081/api/tasks').then(res => res.json()).then(setTasks);
    fetch('http://localhost:8081/api/income').then(res => res.json()).then(setIncomes);
    fetch('http://localhost:8081/api/expenses').then(res => res.json()).then(setExpenses);
  }, []);

  // 2. Submit Handlers
  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = { title: taskTitle, description: "", completed: false };

    fetch('http://localhost:8081/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
        .then(res => res.json())
        .then(data => {
          setTasks([...tasks, data]);
          setTaskTitle(''); // Clear input
        });
  };

  const handleAddIncome = (e) => {
    e.preventDefault();
    const newIncome = { source: incomeSource, amount: parseFloat(incomeAmount), date: new Date().toISOString().split('T')[0] };

    fetch('http://localhost:8081/api/income', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIncome)
    })
        .then(res => res.json())
        .then(data => {
          setIncomes([...incomes, data]);
          setIncomeSource(''); setIncomeAmount('');
        });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const newExpense = { category: expenseCategory, amount: parseFloat(expenseAmount), date: new Date().toISOString().split('T')[0] };

    fetch('http://localhost:8081/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense)
    })
        .then(res => res.json())
        .then(data => {
          setExpenses([...expenses, data]);
          setExpenseCategory(''); setExpenseAmount('');
        });
  };

  return (
      <div className="dashboard">
        <h1>⚡ Vibe Tracker Dashboard</h1>

        <div className="grid">
          {/* Tasks Section */}
          <div className="card">
            <h2>📝 Active Tasks</h2>
            <form onSubmit={handleAddTask}>
              <input type="text" placeholder="New task..." value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} required />
              <button type="submit">Add Task</button>
            </form>
            {tasks.length === 0 ? <p>No tasks yet.</p> : tasks.map(task => (
                <div key={task.id} className="item">
                  <span>{task.completed ? '✅' : '⏳'} {task.title}</span>
                </div>
            ))}
          </div>

          {/* Income Section */}
          <div className="card">
            <h2>💰 Income</h2>
            <form onSubmit={handleAddIncome}>
              <input type="text" placeholder="Source (e.g. Upwork)" value={incomeSource} onChange={(e) => setIncomeSource(e.target.value)} required />
              <input type="number" step="0.01" placeholder="Amount ($)" value={incomeAmount} onChange={(e) => setIncomeAmount(e.target.value)} required />
              <button type="submit">Add Income</button>
            </form>
            {incomes.length === 0 ? <p>No income logged.</p> : incomes.map(income => (
                <div key={income.id} className="item">
                  <span>{income.source}</span>
                  <span className="income-text">+${income.amount.toFixed(2)}</span>
                </div>
            ))}
          </div>

          {/* Expenses Section */}
          <div className="card">
            <h2>📉 Expenses</h2>
            <form onSubmit={handleAddExpense}>
              <input type="text" placeholder="Category (e.g. Software)" value={expenseCategory} onChange={(e) => setExpenseCategory(e.target.value)} required />
              <input type="number" step="0.01" placeholder="Amount ($)" value={expenseAmount} onChange={(e) => setExpenseAmount(e.target.value)} required />
              <button type="submit">Add Expense</button>
            </form>
            {expenses.length === 0 ? <p>No expenses logged.</p> : expenses.map(expense => (
                <div key={expense.id} className="item">
                  <span>{expense.category}</span>
                  <span className="expense-text">-${expense.amount.toFixed(2)}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default App