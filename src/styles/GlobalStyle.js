import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, h1, h2, h3, p, ul, li {
    margin: 0;
    padding: 0;
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    margin: 0;
    background-color: white; //배경색을 밝은 색으로 변경
    color: #333; //폰트 색상을 어두운 색으로 변경
  }

  html, body {
    height: 100%;
  }

  #root {
    height: 100%;
  }
`;

export default GlobalStyle;
