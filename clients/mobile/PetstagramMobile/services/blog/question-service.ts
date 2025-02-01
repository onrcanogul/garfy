import axios from "axios";
import { baseUrl } from "../base";
import ServiceResponse from "../../contracts/base/response";
import Question from "../../contracts/blog/question";
import NoContent from "../../contracts/base/nocontent";
import Toast from "react-native-toast-message";
import i18next from "i18next";

const url = `${baseUrl}/blog/api/question`;

export const getQuestion = async (page: number, size: number) => {
  const response = await axios.get(`${url}//${page}/${size}`);
  console.log(response.data);
  if (response.data) return response.data.data;
  else {
    Toast.show({
      type: "error",
      text1: i18next.t("fail"),
      text2: i18next.t("question-get-fail"),
      position: "top",
    });
  }
};
export const createQuestion = async (model: Partial<Question>) => {
  const response: ServiceResponse<Question> = await axios.post(url, model);
  if (response.successful) {
    Toast.show({
      type: "success",
      text1: i18next.t("success"),
      text2: i18next.t("question-create-success"),
      position: "top",
    });
  } else {
    Toast.show({
      type: "error",
      text1: i18next.t("fail"),
      text2: i18next.t("question-create-fail"),
      position: "top",
    });
  }
};

export const updateQuestion = async (model: Partial<Question>) => {
  const response: ServiceResponse<Question> = await axios.put(url, model);
  if (response.successful) {
    Toast.show({
      type: "success",
      text1: i18next.t("success"),
      text2: i18next.t("question-update-success"),
      position: "top",
    });
  } else {
    Toast.show({
      type: "error",
      text1: i18next.t("fail"),
      text2: i18next.t("question-update-fail"),
      position: "top",
    });
  }
};

export const removeQuestion = async (id: string) => {
  const response: ServiceResponse<NoContent> = await axios.delete(
    `${url}/${id}`
  );
  if (response.successful) {
    Toast.show({
      type: "success",
      text1: i18next.t("success"),
      text2: i18next.t("question-delete-success"),
      position: "top",
    });
  } else {
    Toast.show({
      type: "error",
      text1: i18next.t("fail"),
      text2: i18next.t("question-delete-fail"),
      position: "top",
    });
  }
};
