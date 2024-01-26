import React, { useState } from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div``;

const SearchInput = styled.input``;

const SearchButton = styled.button``;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <SearchButton onClick={handleSearch}>검색</SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
