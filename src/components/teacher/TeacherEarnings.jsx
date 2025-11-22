import React, { useState, useEffect } from 'react';
import './TeacherPayment.css';

const TeacherEarnings = ({ teacher }) => {
  const [earnings, setEarnings] = useState({
    totalEarnings: 0,
    pendingPayout: 0,
    paidOut: 0,
    transactions: []
  });

  useEffect(() => {
    if (teacher?.earnings) {
      setEarnings(teacher.earnings);
    }
  }, [teacher]);

  const simulatePayout = () => {
    if (earnings.pendingPayout > 0) {
      alert(`💰 Payment of ₦${earnings.pendingPayout} initiated! Funds will arrive in 1-3 business days.`);
      // In production, call payout API
    } else {
      alert('No pending payout available.');
    }
  };

  return (
    <div className="earnings-dashboard">
      <h3>💰 Earnings Dashboard</h3>
      
      <div className="earnings-cards">
        <div className="earnings-card total">
          <h4>Total Earnings</h4>
          <p className="amount">₦{earnings.totalEarnings.toLocaleString()}</p>
        </div>
        
        <div className="earnings-card pending">
          <h4>Pending Payout</h4>
          <p className="amount">₦{earnings.pendingPayout.toLocaleString()}</p>
          <button 
            onClick={simulatePayout}
            disabled={earnings.pendingPayout === 0}
            className="payout-btn"
          >
            Request Payout
          </button>
        </div>
        
        <div className="earnings-card paid">
          <h4>Paid Out</h4>
          <p className="amount">₦{earnings.paidOut.toLocaleString()}</p>
        </div>
      </div>

      <div className="transactions-section">
        <h4>Recent Transactions</h4>
        {earnings.transactions.length > 0 ? (
          <div className="transactions-list">
            {earnings.transactions.map((transaction, index) => (
              <div key={index} className="transaction-item">
                <div className="transaction-info">
                  <span className="lesson">{transaction.lessonTitle}</span>
                  <span className="student">Student: {transaction.studentName}</span>
                </div>
                <div className="transaction-amount">
                  <span className="amount">₦{transaction.amount}</span>
                  <span className={`status ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-transactions">No transactions yet. Earnings will appear here when students purchase your lessons.</p>
        )}
      </div>
    </div>
  );
};

export default TeacherEarnings;