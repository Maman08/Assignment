import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';
import { auth } from "../../Firebase";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If user successfully logged in, set isLoggedIn to true
        setIsLoggedIn(true);
        console.log(userCredential); // You can replace this with redirection code
      }).catch((error) => {
        // Handle login error
        console.log(error);
        setLoginError(true);
      })
  };

  return (
    <div className="container-fluid bg-dark py-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="formContainer">
            <h1>Log In</h1>
            <form onSubmit={handleLogin} className="form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="inputField"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="inputField"
              />
              <button type="submit" className="loginButton signupButton">Login</button>
              <p className='text-center'>
                <span className='signupunderline'>
                  <Link to="/signup">I am not a member</Link>
                </span>
              </p>
            </form>
            {loginError && <p className="errorMessage">Invalid email or password</p>}
            {isLoggedIn && <p className="successMessage">Login successful!</p>} {/* Display success message if logged in */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
