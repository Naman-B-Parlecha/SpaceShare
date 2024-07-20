import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePostLoader = async ({ request, params }) => {
  const res = await apiRequest.get(`/post/${params.id}`);
  return res.data;
};
export const listPostLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const res = apiRequest.get(`/post?${query}`);

  return defer({
    postResponse: res,
  });
};
