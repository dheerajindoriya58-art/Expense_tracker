import React, { useEffect, useState } from "react";

export default function Expense() {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");

    const [transactions, setTransactions] = useState(() => {
        const saved = JSON.parse(localStorage.getItem("expense"));
        return saved || [];
    });

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem("expense", JSON.stringify(transactions));
    }, [transactions]);

    const addTransaction = () => {
        if (!text || !amount) {
            alert("Please enter values");
            return;
        }

        const newTransaction = {
            id: Date.now(),
            text,
            amount: Number(amount),
        };

        setTransactions([...transactions, newTransaction]);
        setText("");
        setAmount("");
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter((t) => t.id !== id));
    };

    const balance = transactions.reduce(
        (acc, item) => acc + item.amount,
        0
    );

    const allClear = () => {
        setTransactions([]);
        localStorage.removeItem("expense");
    };

    return (
        <div className="container">
            <h2>Expense Tracker</h2>
            <h3 className="money">Balance: ₹{balance}</h3>

            <div className="input-field">
                <input
                    type="text"
                    placeholder="Enter Title"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <button onClick={addTransaction} className="add-btn">
                    Add
                </button>
            </div>

            <ul>
                {transactions.map((item) => (
                    <li key={item.id} className="lists">
                        <p>{item.text}</p>
                        <p>₹{item.amount}</p>
                        <button onClick={() => deleteTransaction(item.id)}>X</button>
                    </li>
                ))}

                <button onClick={allClear} className="clear">clear</button>

            </ul>
        </div>
    );
}
