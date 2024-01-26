import React, { useState } from "react";
import styled from "styled-components";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig/firebaseConfig";
import { useNavigate } from "react-router-dom";

const SignupWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

const SignupButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        setError("비밀번호가 일치하지 않습니다");
        return;
      }

      if (password.length < 6) {
        setError("비밀번호는 최소 6자 이상이어야 합니다");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      await updateProfile(user, { displayName: nickname });

      alert("회원가입 성공!");
      navigate("/");
    } catch (error) {
      setError("양식이 올바르지 않습니다. ");
    }
  };

  return (
    <SignupWrapper>
      <Title>회원가입</Title>

      <Label>이메일:</Label>
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Label>비밀번호:</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Label>비밀번호 확인:</Label>
      <Input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Label>닉네임:</Label>
      <Input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SignupButton onClick={handleSignup}>가입하기</SignupButton>
    </SignupWrapper>
  );
};

export default SignupPage;
