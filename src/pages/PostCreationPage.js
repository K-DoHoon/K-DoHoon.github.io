import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { postState } from "../Atoms";
import { useAuth } from "../firebaseConfig/firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebaseConfig/firebaseConfig";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("/david-marcu-VfUN94cUy4o-unsplash.jpg");
`;

const FormContainer = styled.div`
  text-align: center;
  width: 100%;
  max-width: 1000px;
  height: 1100px;
  background-color: white;
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

const PostCreationPage = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("");
  const [posts, setPosts] = useRecoilState(postState);
  const setAllPosts = useSetRecoilState(postState);
  const navigate = useNavigate();
  const { user } = useAuth();
  const storage = getStorage(app);

  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
    }
  }, [posts, postId]);

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

    if (!user) {
      if (
        window.confirm(
          "로그인 후에만 작성이 가능합니다. 로그인 페이지로 이동하시겠습니까?"
        )
      ) {
        navigate("/login");
      }
      return;
    }

    let photoURL = "";
    if (category === "국내여행") {
      if (photo) {
        const storageRef = ref(storage, `images/${photo.name}`);
        const uploadTask = uploadBytesResumable(storageRef, photo);
        await uploadTask;
        photoURL = await getDownloadURL(storageRef);
      }
    }

    const newPost = {
      id: Date.now(),
      title,
      content,
      photo: photoURL,
      category,
      userId: user.uid,
      author: user.displayName, // 추가: 작성자 닉네임
      date: new Date().toLocaleDateString(), // 추가: 작성 날짜
    };

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    setAllPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));

    if (category === "국내여행") {
      navigate("/domestic-travel");
    } else if (category === "해외여행") {
      navigate("/overseas-travel");
    } else {
      navigate("/community");
    }
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
          <SubmitButton type="submit">제출</SubmitButton>
        </StyledForm>
      </FormContainer>
    </PageContainer>
  );
};

export default PostCreationPage;
