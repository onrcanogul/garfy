import axios from "axios";
import Profile from "../../contracts/profile/profile";
import { profileBasePath } from "../../constants/endpoints";

const url = profileBasePath + "/profile";

export const getProfile = (
  username: string,
  successCallback: (data: Profile) => void,
  errorCallback: (error: any) => void
) => {
  console.log(username);
  axios
    .get(`${url}/${username}`)
    .then((response) => successCallback(response.data.data))
    .catch((error) => errorCallback(error));
};

export const createProfile = (
  profile: Partial<Profile>,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .post(url)
    .then((response) => successCallback(response.data.data))
    .catch((error) => errorCallback(error));
};

export const updateProfile = (
  profile: Partial<Profile>,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .put(url)
    .then((response) => successCallback(response.data.data))
    .catch((error) => errorCallback(error));
};

export const deleteProfile = (
  id: string,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .delete(`${url}/${id}`)
    .then((response) => successCallback(response.data.data))
    .catch((error) => errorCallback(error));
};
