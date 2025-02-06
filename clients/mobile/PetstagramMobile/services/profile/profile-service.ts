import axios from "axios";
import { baseUrl } from "../base";
import Profile from "../../contracts/profile/profile";

const url = `${baseUrl}/api/profile`;

export const getProfile = (
  id: string,
  successCallback: (data: Profile) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .get(`${url}/${id}`)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};

export const createProfile = (
  profile: Partial<Profile>,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .post(url)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};

export const updateProfile = (
  profile: Partial<Profile>,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .put(url)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};

export const deleteProfile = (
  id: string,
  successCallback: (data: any) => void,
  errorCallback: (error: any) => void
) => {
  axios
    .delete(`${url}/${id}`)
    .then((response) => successCallback(response.data))
    .catch((error) => errorCallback(error));
};
