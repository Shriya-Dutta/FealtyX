import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/slices/authSlice";
import users from "../../utils/mockUsers";
import { useNavigate } from "react-router-dom";
import { LoginContainer, LoginForm, Input, Button, ErrorText } from "./styles";


const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      dispatch(loginSuccess(user));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
      dispatch(loginFailure("Invalid credentials"));
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
        {error && <ErrorText>{error}</ErrorText>}
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
