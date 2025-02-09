import axios from "axios";
import { currentUser } from "../auth-service";
import { socialMediaBasePath } from "../../constants/endpoints";

const url = socialMediaBasePath + "/comment";

export const createComment = (
  model: Partial<Comment>,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .post(url, model)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};

export const like = (
  commentId: string,
  successCallback: (data: any) => void,
  errorCallback: () => void
) => {
  axios
    .post(`${url}/like/${commentId}/${currentUser()}`)
    .then((response) => successCallback(response.data.data))
    .then((error) => errorCallback());
};

export const updateComment = (
  model: Partial<Comment>,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .put(url, model)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};

export const deleteComment = (
  id: string,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .put(`${url}/${id}`)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};
