import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 700px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  flex-wrap: wrap; /* 박스가 한 줄에 다 들어가지 않으면 자동으로 다음 줄로 넘어가도록 설정 */
  gap: 2rem; /* 박스 사이의 간격 설정 */
`;

const RoundedBox = styled.div`
  width: 500px;
  height: 400px;
  border-radius: 10px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 30px;
  background-size: cover;
  background-position: center;
`;

const DomesticBox = styled(RoundedBox)`
  background-image: url("/korea.jpg");
`;

const OverseasBox = styled(RoundedBox)`
  background-image: url("/Overseas.jpg");
`;

const BoxText = styled.span`
  color: white;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const HomePage = () => {
  return (
    <MainContainer>
      <ImageContainer>
        <StyledImage src="/car-6603726_1920.jpg" alt="여행 이미지" />
      </ImageContainer>
      <BoxContainer>
        <Link to="/domestic-travel">
          <DomesticBox>
            <BoxText>국내여행 커뮤니티</BoxText>
          </DomesticBox>
        </Link>
        <Link to="/overseas-travel">
          <OverseasBox>
            <BoxText>해외여행 커뮤니티</BoxText>
          </OverseasBox>
        </Link>
      </BoxContainer>
    </MainContainer>
  );
};

export default HomePage;
