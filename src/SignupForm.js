import React, { useState } from 'react';
import './SignupForm.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:5001/register',{name, email, password})
    .then(result => {console.log(result)
      navigate('/home')
    })
    .catch(err=> console.log(err))

    // Basic validation
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const result = await axios.post('http://localhost:5001/register', { name, email, password });
      console.log(result);
      navigate('./home'); // Correct navigation path
    } catch (err) {
      console.error(err);
      setError('Error during signup. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="submit-button">Signup</button>
      </form>
      <p className='para'> <Link to="/login" >Already have a account?</Link></p>
    </div>
  );
};

export default SignupForm;
