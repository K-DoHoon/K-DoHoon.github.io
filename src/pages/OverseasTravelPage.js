import React, { useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { persistedPostsSelector } from "../Atoms";

const BackgroundImage = styled.div`
  background-image: url("/cosmic-timetraveler-3-yOS_NrXHc-unsplash.jpg");
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardWrap = styled.div`
  width: 1100px;
  margin: 200px auto;
`;

const BoardTitle = styled.div`
  margin-bottom: 10px;
`;

const BoardTitleStrong = styled.strong`
  font-size: 3rem;
`;

const BoardListWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding-top: 50px;
`;

const BoardList = styled.div`
  width: 100%;
  border-top: 2px solid #000;
`;

const BoardListItem = styled.div`
  border-bottom: 1px solid #ddd;
  font-size: 0;
  display: flex;
  align-items: center;

  &:last-child {
    border-bottom: 1px solid #000;
  }
`;

const BoardListNum = styled.div`
  width: 10%;
  padding: 15px 0;
  text-align: center;
  font-size: 1.4rem;
`;

const BoardListTitle = styled.div`
  width: 60%;
  text-align: center;
  padding: 15px 0;
  font-size: 1.4rem;
`;

const BoardListTopTitle = styled(BoardListTitle)`
  text-align: center;
`;

const BoardListWriter = styled.div`
  width: 10%;
  text-align: center;
  padding: 15px 0;
  font-size: 1.4rem;
`;

const BoardListDate = styled.div`
  width: 15%;
  text-align: center;
  padding: 15px 0;
  font-size: 1.4rem;
`;

const BoardListCount = styled.div`
  width: 10%;
  text-align: center;
  padding: 15px 0;
  font-size: 1.4rem;
`;

const BoardPage = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 0;
`;

const PostLink = styled(Link)`
  text-decoration: none;
  color: #333;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
  background-color: black;
  padding: 10px;
`;

const SearchInput = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: none;
  padding: 5px;
  margin-right: 10px;
`;

const PaginationContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PaginationItem = styled.span`
  margin: 0 5px;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${(props) => (props.active ? "#000" : "#999")};

  &:hover {
    color: #000;
  }
`;

const DomesticTravelPage = () => {
  const posts = useRecoilValue(persistedPostsSelector);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const PageSize = 5;

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.category === "해외여행" &&
      (post.title?.includes(searchTerm) || post.content?.includes(searchTerm))
  );

  const indexOfLastPost = currentPage * PageSize;
  const indexOfFirstPost = indexOfLastPost - PageSize;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / PageSize);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log("현재 페이지:", pageNumber);
  };

  return (
    <BackgroundImage>
      <BoardWrap>
        <BoardTitle>
          <BoardTitleStrong>해외여행 게시판</BoardTitleStrong>
        </BoardTitle>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </SearchContainer>
        <BoardListWrap>
          <BoardList>
            <BoardListItem className="top">
              <BoardListNum>번호</BoardListNum>
              <BoardListTopTitle>제목</BoardListTopTitle>
              <BoardListWriter>글쓴이</BoardListWriter>
              <BoardListDate>작성일</BoardListDate>
              <BoardListCount>조회</BoardListCount>
            </BoardListItem>
            {currentPosts.map((post, index) => (
              <PostLink key={post.id} to={`/post/${post.id}`}>
                <BoardListItem>
                  <BoardListNum>{indexOfFirstPost + index + 1}</BoardListNum>
                  <BoardListTitle>{post.title}</BoardListTitle>
                  <BoardListWriter>{post.author}</BoardListWriter>
                  <BoardListDate>{post.date}</BoardListDate>
                  <BoardListCount>{post.views}</BoardListCount>
                </BoardListItem>
              </PostLink>
            ))}
          </BoardList>
          <BoardPage>
            <PaginationContainer>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem
                  key={index}
                  active={currentPage === index + 1}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </PaginationItem>
              ))}
            </PaginationContainer>
          </BoardPage>
        </BoardListWrap>
      </BoardWrap>
    </BackgroundImage>
  );
};

export default DomesticTravelPage;
