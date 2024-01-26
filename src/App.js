import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import GlobalStyle from "./styles/GlobalStyle";
import PostCreationPage from "./pages/PostCreationPage";
import DomesticTravelPage from "./pages/DomesticTravelPage";
import OverseasTravelPage from "./pages/OverseasTravelPage";
import Post from "./components/Post";
import { RecoilRoot } from "recoil";
import MyPage from "./pages/MyPage";
import PostEditPage from "./components/PostEditPage";

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <>
          <GlobalStyle />
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              <Route path="/my-page" element={<MyPage />} />
              <Route path="/create-post" element={<PostCreationPage />} />
              <Route path="/domestic-travel" element={<DomesticTravelPage />} />
              <Route path="/overseas-travel" element={<OverseasTravelPage />} />
              <Route path="/post/:postId" element={<Post />} />
              <Route path="/edit/:postId" element={<PostEditPage />} />
            </Routes>
          </div>
        </>
      </Router>
    </RecoilRoot>
  );
};

export default App;
