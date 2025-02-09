import axios from "axios";
import Answer from "../../contracts/blog/answer";
import ServiceResponse from "../../contracts/base/response";
import NoContent from "../../contracts/base/nocontent";
import Toast from "react-native-toast-message";
import i18next from "i18next";
import { currentUser } from "../auth-service";
import { blogBasePath } from "../../constants/endpoints";

const url = blogBasePath + "/answer";

export const createAnswer = async (
  model: Partial<Answer>,
  successCallback: (data) => void,
  errorCallback: () => void
) => {
  const response: ServiceResponse<Answer> = (await axios.post(url, model)).data;
  if (response.successful) {
    Toast.show({
      type: "success",
      text1: "asd",
      text2: "asd",
      position: "top",
    });
    console.log(response.data);
    successCallback(response.data);
  } else {
    Toast.show({
      type: "error",
      text1: "fail",
      text2: "fail",
      position: "top",
    });
    errorCallback();
  }
};

export const like = async (
  answerId: string,
  successCallback: (data) => void,
  errorCallback: () => void
) => {
  const response: ServiceResponse<NoContent> = (
    await axios.post(`${url}/like/${answerId}/${currentUser()}`)
  ).data;
  console.log(response);
  if (response.successful) {
    successCallback(response.data);
  } else {
    errorCallback();
  }
};

export const update = async (model: Partial<Answer>) => {
  const response: ServiceResponse<Answer> = await axios.put(url, model);
  if (response.successful) {
    Toast.show({
      type: "success",
      text1: i18next.t("success"),
      text2: i18next.t("answer-update-success"),
      position: "top",
    });
  } else {
    Toast.show({
      type: "error",
      text1: i18next.t("fail"),
      text2: i18next.t("answer-update-fail"),
      position: "top",
    });
  }
};

export const remove = async (id: string) => {
  const response: ServiceResponse<NoContent> = await axios.delete(
    `${url}/${id}`
  );
  if (response.successful) {
    Toast.show({
      type: "success",
      text1: i18next.t("success"),
      text2: i18next.t("answer-delete-success"),
      position: "top",
    });
  } else {
    Toast.show({
      type: "error",
      text1: i18next.t("fail"),
      text2: i18next.t("answer-delete-fail"),
      position: "top",
    });
  }
};
