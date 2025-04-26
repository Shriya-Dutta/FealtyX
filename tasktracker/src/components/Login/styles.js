import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
`;

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  color: red;
`;