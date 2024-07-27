import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePostLoader = async ({ request, params }) => {
  console.log(params.id);
  const res = await apiRequest.get(`/post/${params.id}`);
  console.log(res.data);
  return res.data;
};

export const listPostLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const res = apiRequest.get(`/post?${query}`);

  return defer({
    postResponse: res,
  });
};
export const profilePageloader = async () => {
  const postRes = await apiRequest.get(`/user/profilePosts`);
  const chatRes = await apiRequest.get(`/chat`);
  // console.log(res);
  return defer({
    postResponse: postRes,
    chatResponse: chatRes,
  });
};
