import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../firebaseConfig/firebaseConfig";
import { signOut } from "firebase/auth";
import Sidebar from "./Sidebar";

const StyledHeader = styled.header`
  background-color: white;
  color: black;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: black;
  margin-left: 30px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledAuthLink = styled(Link)`
  color: black;
  margin-right: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const MenuIcon = styled.span`
  color: black;
  font-size: 30px;
  cursor: pointer;
  padding: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  const { user, auth } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const renderAuthLinks = () => {
    if (user) {
      return (
        <>
          <StyledAuthLink to="/my-page">마이페이지</StyledAuthLink>
          <StyledAuthLink to="/" onClick={handleLogout}>
            로그아웃
          </StyledAuthLink>
        </>
      );
    } else {
      return (
        <>
          <StyledAuthLink to="/login">로그인</StyledAuthLink>
          <StyledAuthLink to="/signup">회원가입</StyledAuthLink>
        </>
      );
    }
  };

  const handleCreatePost = () => {
    if (user) {
      navigate("/create-post");
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    handleCreatePost();
  };

  return (
    <>
      <StyledHeader>
        <StyledNav>
          <HeaderContent>
            <MenuIcon onClick={toggleSidebar}>☰</MenuIcon>{" "}
            <StyledLink to="/">Travel Trove</StyledLink>
          </HeaderContent>
          <StyledLink onClick={handleLinkClick}>글 작성</StyledLink>
        </StyledNav>
        <div>{renderAuthLinks()}</div>
      </StyledHeader>
      <Sidebar isOpen={isOpen} onClose={toggleSidebar} />{" "}
    </>
  );
};

export default Header;
