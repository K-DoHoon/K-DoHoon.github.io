import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { postState } from "../Atoms";
import { useAuth } from "../firebaseConfig/firebaseConfig";

const EditPostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const EditPostForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const EditLabel = styled.label`
  margin-bottom: 10px;
`;

const EditInput = styled.input`
  padding: 8px;
  margin-bottom: 15px;
`;

const EditTextArea = styled.textarea`
  padding: 8px;
  margin-bottom: 15px;
  height: 150px;
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const EditPostPage = () => {
  const { postId } = useParams();
  const [posts, setPosts] = useRecoilState(postState);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const post = posts.find((post) => post.id === parseInt(postId));
    if (post && user && post.userId === user.uid) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      // Redirect to MyPage or handle unauthorized access
      navigate("/mypage");
    }
  }, [posts, postId, user, navigate]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPosts = posts.map((post) => {
      if (post.id === parseInt(postId)) {
        return {
          ...post,
          title,
          content,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    navigate(`/post/${postId}`);
  };

  return (
    <EditPostContainer>
      <h2>Edit Post</h2>
      <EditPostForm onSubmit={handleSubmit}>
        <EditLabel htmlFor="title">Title:</EditLabel>
        <EditInput
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />

        <EditLabel htmlFor="content">Content:</EditLabel>
        <EditTextArea
          id="content"
          name="content"
          value={content}
          onChange={handleContentChange}
        />

        <EditButton type="submit">Update Post</EditButton>
      </EditPostForm>
    </EditPostContainer>
  );
};

export default EditPostPage;
