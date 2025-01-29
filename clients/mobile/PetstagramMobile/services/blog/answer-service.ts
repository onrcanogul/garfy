import axios from "axios";
import Answer from "../../contracts/answer";
import ServiceResponse from "../../contracts/base/response";
import { baseUrl } from "../base";
import NoContent from "../../contracts/base/nocontent";
import Toast from "react-native-toast-message";
import i18next from "i18next";

const url = `${baseUrl}/answer`;

export const create = async (model: Partial<Answer>) => {
  const response: ServiceResponse<Answer> = await axios.post(url, model);
  if (response.successful) {
    Toast.show({
      type: "success",
      text1: i18next.t("success"),
      text2: i18next.t("answer-create-success"),
      position: "top",
    });
  } else {
    Toast.show({
      type: "error",
      text1: i18next.t("fail"),
      text2: i18next.t("answer-create-fail"),
      position: "top",
    });
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
