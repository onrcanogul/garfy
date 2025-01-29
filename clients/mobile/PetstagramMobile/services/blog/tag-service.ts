import i18next, { i18n } from "i18next";
import axios from "axios";
import Tag from "../../contracts/tag";
import { baseUrl } from "../base";
import ServiceResponse from "../../contracts/base/response";
import NoContent from "../../contracts/base/nocontent";
import Toast from "react-native-toast-message";
const url = baseUrl + "/tag";

export const create = async (model: Partial<Tag>) => {
  const response: ServiceResponse<Tag> = await axios.post(url, model);
  if (response.successful) {
    Toast.show({
      type: "success",
      text1: i18next.t("success"),
      text2: i18next.t("tag-create-success"),
      position: "top",
    });
  } else {
    Toast.show({
      type: "error",
      text1: i18next.t("fail"),
      text2: i18next.t("tag-created-fail"),
      position: "top",
    });
  }
};

export const update = async (model: Partial<Tag>) => {
  const response: ServiceResponse<Tag> = await axios.put(url, model);
  if (response.successful) {
    Toast.show({
      type: "success",
      text1: i18next.t("success"),
      text2: i18next.t("tag-updated-success"),
      position: "top",
    });
  } else {
    Toast.show({
      type: "error",
      text1: i18next.t("fail"),
      text2: i18next.t("tag-updated-fail"),
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
      text2: i18next.t("tag-deleted-success"),
      position: "top",
    });
  } else {
    Toast.show({
      type: "error",
      text1: i18next.t("success"),
      text2: i18next.t("tag-deleted-fail"),
      position: "top",
    });
  }
};
