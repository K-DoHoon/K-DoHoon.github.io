// PostEditPage.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { postState } from "../Atoms";
import { useAuth } from "../firebaseConfig/firebaseConfig";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  text-align: center;
  width: 100%;
  max-width: 900px;
  height: 1000px;
`;

const StyledForm = styled.form`
  display: inline-block;
  text-align: left;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 8px;
  margin-bottom: 15px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: calc(100% - 20px);
  padding: 8px;
  margin-bottom: 15px;
  box-sizing: border-box;
  height: 600px;
`;

const FileInput = styled.input`
  margin-bottom: 15px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
`;

const CategorySelect = styled.select`
  width: calc(100% - 20px);
  padding: 8px;
  margin-bottom: 15px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const PostEditPage = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("");
  const { user } = useAuth();
  const posts = useRecoilValue(postState);
  const setPosts = useSetRecoilState(postState);
  const navigate = useNavigate();

  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    if (post && user && post.userId !== user.uid) {
      // 사용자가 게시물의 작성자가 아니면 페이지 이동
      navigate(`/post/${postId}`);
    } else {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
    }
  }, [posts, postId, user, navigate]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let photoURL = "";
    if (category === "국내여행") {
      if (photo) {
      }
    }

    const updatedPosts = posts.map((post) => {
      if (post.id === parseInt(postId)) {
        return {
          ...post,
          title,
          content,
          photo: photoURL || post.photo,
          category,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    navigate(`/post/${postId}`);
  };

  return (
    <PageContainer>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Label htmlFor="title">제목:</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
          <Label htmlFor="content">내용:</Label>
          <TextArea
            id="content"
            name="content"
            value={content}
            onChange={handleContentChange}
          />
          {photo && (
            <ImagePreview src={URL.createObjectURL(photo)} alt="Preview" />
          )}
          <Label htmlFor="photo">사진 첨부:</Label>
          <FileInput
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <Label htmlFor="category">카테고리:</Label>
          <CategorySelect
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">카테고리 선택</option>
            <option value="국내여행">국내여행</option>
            <option value="해외여행">해외여행</option>
          </CategorySelect>
          <SubmitButton type="submit">수정 완료</SubmitButton>
        </StyledForm>
      </FormContainer>
    </PageContainer>
  );
};

export default PostEditPage;
