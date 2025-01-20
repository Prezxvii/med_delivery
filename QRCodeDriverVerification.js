import React, { useState, useEffect } from 'react';

function DriverVerification() {
  const [verificationCode, setVerificationCode] = useState('');
  const [scannedCode, setScannedCode] = useState('');
  const [message, setMessage] = useState('');
  const [codeExpires, setCodeExpires] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  // Function to generate a 6-digit random number
  const generateVerificationCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000); // Generates a number between 100000 and 999999
    setVerificationCode(randomCode);
    const expirationTime = Date.now() + 300000; // Code expires in 5 minutes
    setCodeExpires(expirationTime);
    setMessage('');
  };

  // Handle code input and comparison
  const handleScan = (code) => {
    setScannedCode(code);

    if (!verificationCode) {
      setMessage('Please generate a verification code first.');
      return;
    }

    if (timeLeft <= 0) {
      setMessage('Verification code expired. Please generate a new code.');
      return;
    }

    if (code === String(verificationCode)) {
      setMessage('Verification Successful!');
    } else {
      setMessage('Verification Failed!');
    }
  };

  // Update the remaining time in real time
  useEffect(() => {
    if (!codeExpires) return;

    const interval = setInterval(() => {
      const remainingTime = Math.max(0, codeExpires - Date.now());
      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        clearInterval(interval);
        setMessage('Verification code expired. Please generate a new code.');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [codeExpires]);

  // Format the remaining time for display
  const formatTimeLeft = () => {
    if (timeLeft === null || timeLeft <= 0) return 'Expired';
    const minutes = Math.floor(timeLeft / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Driver Verification</h1>
      <button
        onClick={generateVerificationCode}
        style={{
          padding: '5px 10px',
          fontSize: '14px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '150px', // Set width to make the button smaller
        }}
      >
        Generate Verification Code
      </button>

      {/* Display the generated verification code */}
      {verificationCode && (
        <div>
          <h2>Your Verification Code: {verificationCode}</h2>
          <p style={{ color: 'gray' }}>Code expires in: {formatTimeLeft()}</p>
        </div>
      )}

      {/* Input field for simulating scanning the code */}
      <input
        type="number"
        placeholder="Enter scanned code"
        value={scannedCode}
        onChange={(e) => handleScan(e.target.value)}
        maxLength="6"
        style={{
          margin: '10px 0',
          padding: '5px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      {/* Display verification messages */}
      {message && (
        <p style={{ color: message === 'Verification Successful!' ? 'green' : 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default DriverVerification;











