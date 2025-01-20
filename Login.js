import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5001/api/login', {
        email,
        password,
      });

      // Store the token
      localStorage.setItem('token', response.data.token);

      // Fetch user profile data using the token
      const profileResponse = await axios.get('http://localhost:5001/api/profile', {
        headers: { Authorization: `Bearer ${response.data.token}` },
      });

      // Store user profile data (in localStorage)
      localStorage.setItem('userProfile', JSON.stringify(profileResponse.data));

      // Redirect user to profile page
      alert('Login successful!');
      window.location.href = '/profile';  // Or use react-router if using routing
    } catch (error) {
      setErrorMessage('Login failed! Please check your credentials.');
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.loginHeader}>HypernovaHealth 💊</header>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.formGroup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroupPassword}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.inputPassword}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.togglePassword}
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={styles.icon}
              >
                <path
                  d="M3 3l18 18M3 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S3 12 3 12z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={styles.icon}
              >
                <path
                  d="M1.5 12s3.5-7 10.5-7 10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12z"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>
        <div style={styles.extraOptions}>
          <label style={styles.rememberMe}>
            <input type="checkbox" /> Remember Me
          </label>
          <a href="/forgot-password" style={styles.forgotPassword}>
            Forgot Password?
          </a>
        </div>
        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
    flexDirection: 'column',
    textAlign: 'center',
  },
  loginHeader: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    marginTop: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 6px 8px rgba(0, 0, 0, 0.15)',
    width: '400px',
  },
  formGroup: {
    width: '100%',
    marginBottom: '15px',
  },
  formGroupPassword: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    marginBottom: '15px',
  },
  input: {
    padding: '15px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  inputPassword: {
    padding: '15px 50px 15px 15px',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  togglePassword: {
    position: 'absolute',
    right: '-180px', // Adjusted to move the button more to the right
    top: '30%', // Vertically center the button
    transform: 'translateY(-50%)', // Fine-tuning for centering
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: 'skyblue', // Default light blue shade
    width: '20px', // Smaller icon size
    height: '20px',
    transition: 'color 0.3s ease', // Smooth transition for color change
  },
  iconHover: {
    color: '#ADD8E6', // Lighter blue shade when hovered
  },
  iconActive: {
    color: '#4682B4', // Darker blue shade when clicked/active
  },
  extraOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '20px',
  },
  rememberMe: {
    fontSize: '14px',
    color: '#333',
  },
  forgotPassword: {
    fontSize: '14px',
    color: '#007bff',
    textDecoration: 'none',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  button: {
    padding: '15px 20px',
    backgroundColor: '#7F52FF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '18px',
    width: '100%',
  },
};

export default Login;

