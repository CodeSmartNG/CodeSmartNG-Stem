import React, { useState, useEffect } from 'react';
import './TeacherPayment.css';

const TeacherBankAccount = ({ teacher, onUpdate }) => {
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    accountName: '',
    bankCode: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [banks, setBanks] = useState([]);

  // Load Nigerian banks (you can fetch this from an API)
  useEffect(() => {
    loadNigerianBanks();
    if (teacher?.bankAccount) {
      setBankDetails(teacher.bankAccount);
    }
  }, [teacher]);

  const loadNigerianBanks = () => {
    // Simplified list - in production, fetch from Paystack/Flutterwave API
    const nigerianBanks = [
      { name: 'Access Bank', code: '044' },
      { name: 'First Bank', code: '011' },
      { name: 'Guaranty Trust Bank', code: '058' },
      { name: 'Zenith Bank', code: '057' },
      { name: 'United Bank for Africa', code: '033' },
      { name: 'OPay', code: '100' },
      { name: 'PalmPay', code: '100' },
      { name: 'Kuda Bank', code: '100' },
    ];
    setBanks(nigerianBanks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate account number
    if (bankDetails.accountNumber.length < 10) {
      alert('Please enter a valid account number');
      return;
    }

    // Verify account name with bank API (in production)
    verifyBankAccount();
  };

  const verifyBankAccount = async () => {
    try {
      // Simulate bank account verification
      // In production, use Paystack/Flutterwave verification API
      const verifiedAccount = {
        ...bankDetails,
        accountName: bankDetails.accountName || `${teacher.name}'s Account`,
        isVerified: true,
        verifiedAt: new Date().toISOString()
      };

      onUpdate(verifiedAccount);
      setIsEditing(false);
      alert('✅ Bank account added successfully!');
    } catch (error) {
      alert('❌ Failed to verify bank account. Please check details.');
    }
  };

  const handleBankChange = (e) => {
    const selectedBank = banks.find(bank => bank.name === e.target.value);
    setBankDetails(prev => ({
      ...prev,
      bankName: e.target.value,
      bankCode: selectedBank?.code || ''
    }));
  };

  if (!isEditing && teacher?.bankAccount) {
    return (
      <div className="bank-account-card">
        <h3>🏦 Bank Account Details</h3>
        <div className="bank-details">
          <p><strong>Bank:</strong> {teacher.bankAccount.bankName}</p>
          <p><strong>Account Number:</strong> {teacher.bankAccount.accountNumber}</p>
          <p><strong>Account Name:</strong> {teacher.bankAccount.accountName}</p>
          <p><strong>Status:</strong> 
            <span className={`status ${teacher.bankAccount.isVerified ? 'verified' : 'pending'}`}>
              {teacher.bankAccount.isVerified ? '✅ Verified' : '⏳ Pending'}
            </span>
          </p>
        </div>
        <button 
          onClick={() => setIsEditing(true)}
          className="edit-btn"
        >
          ✏️ Edit Bank Details
        </button>
      </div>
    );
  }

  return (
    <div className="bank-account-form">
      <h3>{teacher?.bankAccount ? 'Update Bank Account' : 'Add Bank Account'}</h3>
      <p>Receive payments directly to your bank account when students purchase your lessons.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Bank:</label>
          <select 
            value={bankDetails.bankName} 
            onChange={handleBankChange}
            required
          >
            <option value="">Choose your bank</option>
            {banks.map(bank => (
              <option key={bank.code} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Account Number:</label>
          <input
            type="text"
            value={bankDetails.accountNumber}
            onChange={(e) => setBankDetails(prev => ({
              ...prev,
              accountNumber: e.target.value.replace(/\D/g, '')
            }))}
            placeholder="10-digit account number"
            maxLength="10"
            required
          />
        </div>

        <div className="form-group">
          <label>Account Name:</label>
          <input
            type="text"
            value={bankDetails.accountName}
            onChange={(e) => setBankDetails(prev => ({
              ...prev,
              accountName: e.target.value
            }))}
            placeholder="Name as it appears on bank account"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">
            {teacher?.bankAccount ? 'Update Account' : 'Save Bank Details'}
          </button>
          {teacher?.bankAccount && (
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TeacherBankAccount;