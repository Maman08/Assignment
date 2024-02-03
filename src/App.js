// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import WeatherApp from './Components/WeatherApp';
import LoginPage from './Components/auth/LoginPage';
import SignUpPage from './Components/auth/Signin';
import User from './Components/User';
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route path="/users" element={<User />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<WeatherApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
