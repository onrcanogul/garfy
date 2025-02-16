import axios from "axios";
import Answer from "../../contracts/blog/answer";
import ServiceResponse from "../../contracts/base/response";
import NoContent from "../../contracts/base/no-content";
import { currentUser } from "../auth-service";
import { blogBasePath } from "../../constants/endpoint";

const url = blogBasePath + "/answer";

export const createAnswer = async (
  model: Partial<Answer>,
  successCallback: (data: Answer | undefined) => void,
  errorCallback: () => void
) => {
  const response: ServiceResponse<Answer> = (await axios.post(url, model)).data;
  if (response.successful) {
    alert("a");
    console.log(response.data);
    successCallback(response.data);
  } else {
    alert("b");
    errorCallback();
  }
};

export const like = async (
  answerId: string,
  successCallback: (data: NoContent | undefined) => void,
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
    alert("a");
  } else {
    alert("b");
  }
};

export const remove = async (id: string) => {
  const response: ServiceResponse<NoContent> = await axios.delete(
    `${url}/${id}`
  );
  if (response.successful) {
    alert("a");
  } else {
    alert("b");
  }
};
