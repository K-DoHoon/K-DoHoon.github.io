// src/pages/LoginPage.js

import React, { useState } from "react";
import styled from "styled-components";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const StyledLoginPage = styled.div`
  text-align: center;
  margin: 50px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const FormContainer = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 50px;
  border: 4px solid #e6e6e6;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 10px;
  border: 1px solid #808080;
  border-radius: 4px;
  height: 2rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -10px;
`;

const LoginButton = styled.button`
  background-color: #a9c9f1;
  color: #333;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

const GoogleLoginButton = styled.button`
  background-color: #a9c9f1;
  color: #333;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError("계정이 존재하지 않습니다.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("로그인 성공", user);
      navigate("/");
    } catch (error) {
      console.error("계정이 올바르지 않습니다", error);
    }
  };

  return (
    <StyledLoginPage>
      <Title>로그인</Title>
      <FormContainer>
        <Label htmlFor="email">이메일:</Label>
        <Input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label htmlFor="password">비밀번호:</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <LoginButton type="button" onClick={handleLogin}>
          로그인
        </LoginButton>

        <GoogleLoginButton type="button" onClick={handleGoogleLogin}>
          Google로 로그인
        </GoogleLoginButton>
      </FormContainer>
    </StyledLoginPage>
  );
};

export default LoginPage;
