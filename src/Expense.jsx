import React, { useEffect, useState } from 'react'

export default function Expense() {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("expense"));
        if (saved) setTransactions(saved);
    }, []);

    useEffect(() => {
        localStorage.setItem("expense", JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = () => {
        if (!amount || !text) {
            return alert("Please Enter Values")
        }

        const newTransaction = {
            amount: +amount,
            text: text,
        }
        setTransactions([...transactions, newTransaction]);
        setAmount("");
        setText("");
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter((item) => item.id !== id));
    };

    const balance = transactions.reduce((acc, item) => acc + item.amount, 0);

    return (
        <div className="container">
            <h2>Expense Tracker</h2>

            <h3>Balance: ₹{balance}</h3>

            <div className="input-field">
                <input
                    type="text"
                    placeholder="Enter Title"
                    value={text}
                    onChange={(e) => setText(e.target.value)} />

                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}/>

                <button onClick={addTransaction} className='add-btn'>Add</button>

            </div>

            <ul>
                {transactions.map((item) => (
                    <li key={item.id}>
                        <p>{item.text}</p>
                        <p>₹{item.amount}</p>
                        <button onClick={() => deleteTransaction(item.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
