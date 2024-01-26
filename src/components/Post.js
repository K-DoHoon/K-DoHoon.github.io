import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import CommentForm from "./CommentForm";
import { persistedPostsSelector, persistedCommentsSelector } from "../Atoms";

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #ccc;
`;

const ViewCount = styled.p`
  margin-bottom: 10px;
  font-style: italic;
  color: #555;
`;

const PostTitle = styled.h2`
  color: #333;
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
  margin-bottom: 10px;
`;

const PostAuthor = styled.p`
  margin-bottom: 10px;
  font-style: italic;
  border-bottom: 2px solid #ccc;
  color: #555;
`;

const PostDate = styled.p`
  margin-bottom: 10px;
  font-style: italic;
  color: #555;
  border-bottom: 2px solid #ccc;
`;

const PostContent = styled.p`
  color: #333;
  margin-bottom: 20px;
  border-bottom: 1px solid black;
  white-space: pre-wrap;
`;

const PostImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const CommentSection = styled.div`
  margin-top: 10px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
`;

const CommentTitle = styled.h3`
  margin-bottom: 10px;
  color: #333;
`;

const CommentItem = styled.div`
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const CommentAuthor = styled.p`
  margin-bottom: 5px;
  font-style: italic;
  color: #555;
`;

const CommentContent = styled.p`
  color: #333;
`;

const Post = () => {
  const { postId } = useParams();
  const posts = useRecoilValue(persistedPostsSelector);
  const comments = useRecoilValue(persistedCommentsSelector);
  const setPosts = useSetRecoilState(persistedPostsSelector);

  const handlePostView = () => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postDetails.id) {
        return { ...post, views: post.views + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  useEffect(() => {
    handlePostView();
  }, [postId]);

  const postDetails = posts.find((post) => String(post.id) === postId);

  if (!postDetails) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  const postComments = comments.filter((comment) => comment.postId === postId);

  return (
    <PostContainer>
      <PostHeader>
        <div>
          <PostTitle>{postDetails.title}</PostTitle>
          <PostAuthor>작성자: {postDetails.author}</PostAuthor>
          <PostDate>날짜: {postDetails.date}</PostDate>
        </div>
      </PostHeader>

      {postDetails.photo && (
        <PostImage src={postDetails.photo} alt={postDetails.title} />
      )}

      <PostContent>{postDetails.content}</PostContent>

      <CommentForm postId={postId} />

      <CommentSection>
        <CommentTitle>댓글</CommentTitle>
        {postComments.map((comment) => (
          <CommentItem key={comment.id}>
            <div>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentContent>{comment.content}</CommentContent>
            </div>
          </CommentItem>
        ))}
      </CommentSection>
    </PostContainer>
  );
};

export default Post;
