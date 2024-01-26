// Atoms.js
import { atom, selector } from "recoil";

const persistedPosts = JSON.parse(localStorage.getItem("posts")) || [];
const persistedComments = JSON.parse(localStorage.getItem("comments")) || [];

export const postState = atom({
  key: "postState",
  default: persistedPosts.map((post) => ({ ...post, views: 0 })),
});

export const commentsState = atom({
  key: "commentsState",
  default: persistedComments,
});

export const persistedPostsSelector = selector({
  key: "persistedPostsSelector",
  get: ({ get }) => {
    const posts = get(postState);
    localStorage.setItem("posts", JSON.stringify(posts));
    return posts;
  },
  set: ({ set }, newValue) => {
    set(postState, newValue);
  },
});

export const persistedCommentsSelector = selector({
  key: "persistedCommentsSelector",
  get: ({ get }) => {
    const comments = get(commentsState);
    localStorage.setItem("comments", JSON.stringify(comments));
    return comments;
  },
  set: ({ set }, newValue) => {
    set(commentsState, newValue);
  },
});
