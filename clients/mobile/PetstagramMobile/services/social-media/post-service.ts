import axios from "axios";
import Post from "../../contracts/social-media/post";
import { currentUser } from "../auth-service";
import { socialMediaBasePath } from "../../constants/endpoints";

const url = socialMediaBasePath + "/post";

export const getPosts = (
  page: number,
  size: number,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .get(`${url}/${page}/${size}`)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};

export const getPostById = (
  id: string,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .get(`${url}/${id}`)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};

export const createPost = (
  model: Partial<Post>,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .post(`${url}`, model)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};

export const like = (
  postId: string,
  successCallback: (data: any) => void,
  errorCallback: () => void
) => {
  axios
    .post(`${url}/like/${postId}/${currentUser()}`)
    .then((response) => successCallback(response.data.data))
    .then((error) => errorCallback());
};

export const updatePost = (
  model: Partial<Post>,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .put(`${url}`, model)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};

export const deletePost = (
  id: string,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .delete(`${url}/${id}`)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};
