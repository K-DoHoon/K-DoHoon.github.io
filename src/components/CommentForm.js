import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../firebaseConfig/firebaseConfig";
import { useRecoilState } from "recoil";
import { commentsState } from "../Atoms";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  margin-top: 20px;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

const CommentButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CommentForm = ({ postId }) => {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useRecoilState(commentsState);
  const navigate = useNavigate();

  // 댓글 상태를 로컬 스토리지에 저장합니다.
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleCommentSubmit = () => {
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

    const newComment = {
      postId,
      author: user.displayName,
      content: commentText,
      date: new Date().toLocaleDateString(),
    };

    // 새 댓글을 상태에 추가합니다.
    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <FormContainer>
      <CommentInput
        placeholder="댓글을 작성하세요..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <CommentButton onClick={handleCommentSubmit}>댓글 남기기</CommentButton>
    </FormContainer>
  );
};

export default CommentForm;
