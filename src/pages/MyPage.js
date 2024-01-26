import React from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { postState, commentsState } from "../Atoms";
import { Link } from "react-router-dom";
import { useAuth } from "../firebaseConfig/firebaseConfig";

const MyPageContainer = styled.div`
  padding: 20px;
`;

const MyPageTitle = styled.h2`
  color: #333;
  margin-bottom: 15px;
`;

const WelcomeMessage = styled.p`
  margin-bottom: 15px;
  color: #555;
`;

const PostListContainer = styled.div`
  margin-bottom: 15px;
`;

const PostItem = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 30px;
  background-color: #f8f8f8;
  border-radius: 5px;
`;

const PostTitle = styled(Link)`
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const CommentListContainer = styled.div`
  margin-bottom: 15px;
`;

const CommentItem = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 30px;
  background-color: #f8f8f8;
  border-radius: 5px;
`;

const CommentContent = styled.div`
  color: #333;
  flex-grow: 1;
`;

const EditDeleteButtons = styled.div``;

const EditButton = styled(Link)`
  background-color: #28a745;
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const NoPostsMessage = styled.p`
  color: #555;
`;

const MyPage = () => {
  const [posts, setPosts] = useRecoilState(postState);
  const [comments, setComments] = useRecoilState(commentsState);

  const { user } = useAuth();

  const userPosts = user
    ? posts.filter((post) => post.userId === user.uid)
    : [];

  const userComments = user
    ? comments.filter((comment) => comment.author === user.displayName)
    : [];

  const handleDeletePost = (postId) => {
    console.log(`Deleting post with ID: ${postId}`);
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleDeleteComment = (commentId) => {
    console.log(`Deleting comment with ID: ${commentId}`);
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  return (
    <MyPageContainer>
      <MyPageTitle>마이페이지</MyPageTitle>
      {user && (
        <>
          <WelcomeMessage>안녕하세요, {user.displayName}님!</WelcomeMessage>

          <PostListContainer>
            <h3>게시물 목록</h3>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostItem key={post.id}>
                  <div>
                    <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
                  </div>
                  <EditDeleteButtons>
                    <EditButton to={`/edit/${post.id}`}>수정</EditButton>
                    <DeleteButton onClick={() => handleDeletePost(post.id)}>
                      삭제
                    </DeleteButton>
                  </EditDeleteButtons>
                </PostItem>
              ))
            ) : (
              <NoPostsMessage>작성한 게시글이 없습니다.</NoPostsMessage>
            )}
          </PostListContainer>

          <CommentListContainer>
            <h3>댓글 목록</h3>
            {userComments.length > 0 ? (
              userComments.map((comment) => (
                <CommentItem key={comment.id}>
                  <CommentContent>{comment.content}</CommentContent>
                  <EditDeleteButtons>
                    <DeleteButton
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      삭제
                    </DeleteButton>
                  </EditDeleteButtons>
                </CommentItem>
              ))
            ) : (
              <NoPostsMessage>작성한 댓글이 없습니다.</NoPostsMessage>
            )}
          </CommentListContainer>
        </>
      )}
    </MyPageContainer>
  );
};

export default MyPage;
