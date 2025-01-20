import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'; // Import NavLink for routing
import './Signup.css'; // Ensure the styles match your medical app's design

function Signup() {
  // State management for form fields
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    dob: '',
    address: '',
    phoneNumber: '',
    insuranceNumber: '',
  });

  // Handle change for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Check for missing fields
    const requiredFields = Object.values(formData).every((field) => field.trim() !== '');
    if (!requiredFields) {
      alert('Please fill in all required fields.');
      return;
    }

    // Send request to the backend API
    try {
      const response = await axios.post('http://localhost:5001/api/signup', formData); // Updated port to 5001
      alert('Signup successful! Please log in to your account.');
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        phoneNumber: '',
        insuranceNumber: '',
      });
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed! Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSignup} className="signup-form">
      <h2>Patient Signup</h2>
      <p>Create your account to manage prescriptions and medical records.</p>

      {/* Form Fields */}
      {[
        { label: 'First Name', type: 'text', name: 'firstName', placeholder: 'Enter your first name' },
        { label: 'Last Name', type: 'text', name: 'lastName', placeholder: 'Enter your last name' },
        { label: 'Email', type: 'email', name: 'email', placeholder: 'Enter your email address' },
        { label: 'Date of Birth', type: 'date', name: 'dob', placeholder: 'Select your date of birth' },
        { label: 'Address', type: 'text', name: 'address', placeholder: 'Enter your address' },
        { label: 'Phone Number', type: 'tel', name: 'phoneNumber', placeholder: 'Enter your phone number' },
        { label: 'Insurance Number', type: 'text', name: 'insuranceNumber', placeholder: 'Enter your insurance number' },
        { label: 'Password', type: 'password', name: 'password', placeholder: 'Create a password' },
        { label: 'Confirm Password', type: 'password', name: 'confirmPassword', placeholder: 'Re-enter your password' },
      ].map(({ label, type, name, placeholder }) => (
        <div key={name} className="form-group">
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <button type="submit" className="signup-button">Sign Up</button>

      {/* Add a redirect to login page after successful signup */}
      <div className="login-link">
        <p>Already have an account? <NavLink to="/login">Log in</NavLink></p>
      </div>
    </form>
  );
}

export default Signup;








// Inline CSS styles for a cleaner design
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f7f7', // light gray background for contrast
  },
  form: {
    maxWidth: '400px', // limits width for cleaner look
    width: '100%',
    padding: '30px', // more padding for breathing space
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', // soft shadow for depth
    borderRadius: '10px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '26px',
    marginBottom: '10px',
    color: '#333', // darker text for better readability
  },
  subHeading: {
    fontSize: '14px',
    marginBottom: '20px',
    color: '#666', // lighter text color for subtler secondary info
  },
  formGroup: {
    marginBottom: '20px', // more space between form fields
    position: 'relative',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#555', // slightly darker for better visibility
  },
  input: {
    width: '100%',
    padding: '12px', // more padding for ease of input
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '16px', // improved font size for better legibility
    boxSizing: 'border-box',
    backgroundColor: '#f9f9f9', // light background for input fields
  },
  passwordToggle: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#007bff', // blue for password toggle
  },
  signupButton: {
    width: '100%',
    padding: '14px', // slightly larger button for better interaction
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
  signupButtonHover: {
    backgroundColor: '#45a049',
  },
};



