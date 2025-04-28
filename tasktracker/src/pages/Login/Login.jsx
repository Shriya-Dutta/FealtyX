import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import users from "../../utils/mockUsers";
import { useNavigate } from "react-router-dom";
import "./LoginStyles.css";
import Button from "../../components/Button/Button";
import NavBar from "../../components/NavBar/NavBar";


const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      dispatch(loginSuccess(user));
      setError("");

      if (user.role === 'Developer') {
        navigate('/developer-dashboard');
      } else if (user.role === 'Manager') {
        navigate('/manager-dashboard');
      }
    }
    else {
      setError("Invalid email or password");
      dispatch(loginFailure("Invalid credentials"));
    }

  };

  return (
    <>
    <NavBar
      value="Login"
    />
      <div id="login-page" className="loginPage">
        <div id="login-container" className="LoginContainer">
          <h2>FealtyX Task Tracker Login</h2>
          <form id="login-form" className="LoginForm" onSubmit={handleSubmit}>
            <input
              id="email-input"
              className="emailInput"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ margin: "0.5rem" }}
            />
            <input
              id="password-input"
              className="passwordInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ margin: "0.5rem" }}
            />
            <Button
              id="login-btn"
              className="LoginBtn"
              type="submit"
              value="Login"
              disabled={false}
            />
          </form>
          {error && <p id="error-text" className="ErrorText">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Login;
