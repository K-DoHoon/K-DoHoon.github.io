import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../firebaseConfig/firebaseConfig";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  height: 100%;
  width: 250px;
  background-color: #ffffff;
  padding-top: 20px;
  padding-left: 20px;
  color: #333333;
  z-index: 1000;
  transition: left 0.3s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledLink = styled(Link)`
  display: block;
  color: #333333;
  text-decoration: none;
  margin-bottom: 10px;
  font-size: 18px;

  &:hover {
    text-decoration: underline;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 18px;
  color: #333333;
  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  return (
    <SidebarContainer isOpen={isOpen}>
      <CloseButton onClick={onClose}>×</CloseButton>
      {user && (
        <StyledLink to="/my-page" onClick={onClose}>
          마이페이지
        </StyledLink>
      )}
      <StyledLink to="/domestic-travel" onClick={onClose}>
        국내여행
      </StyledLink>

      <StyledLink to="/overseas-travel" onClick={onClose}>
        해외여행
      </StyledLink>
    </SidebarContainer>
  );
};

export default Sidebar;
