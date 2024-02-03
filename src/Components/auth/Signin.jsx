import { createUserWithEmailAndPassword } from '@firebase/auth';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { auth } from "../../Firebase"; // Make sure 'auth' is imported correctly

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User account created successfully
        console.log(userCredential);
        setSignUpSuccess(true);
        setSignUpError(false);
      }).catch((error) => {
        // Error occurred while creating user account
        console.log(error);
        setSignUpError(true);
        setSignUpSuccess(false);
      })
  };

  return (
    <div className="container-fluid bg-dark py-5">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="formContainer">
            <h1>Get on Board</h1>
            <form onSubmit={handleSignup} className="form">
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
              <p className='my-2 privecy-alrt-para'>
                By creating an account, you agree to the <span className='signupunderline'>Terms and Use</span> and <span className='signupunderline'>Privacy Policy</span>
              </p>

              {signUpError && <p className="errorMessage">Sign-up failed. Please check your input and try again.</p>}
              {signUpSuccess && <p className="successMessage">Sign-up successful! You can now log in.</p>}

              <button className="signupButton">Sign Up</button>
              <p className='text-center'>
                <span className='signupunderline   privecy-alrt-para'>
                  <Link to="/login"><span className='linkedsignuplogin'>I am already a member</span></Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
