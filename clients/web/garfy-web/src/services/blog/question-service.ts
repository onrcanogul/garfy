import axios from "axios";
import ServiceResponse from "../../contracts/base/response";
import Question from "../../contracts/blog/question";
import NoContent from "../../contracts/base/no-content";
import { blogBasePath } from "../../constants/endpoint";

const url = blogBasePath + "/question";

export const getQuestion = async (page: number, size: number) => {
  const response = await axios.get(`${url}//${page}/${size}`);
  console.log(response.data);
  if (response.data) return response.data.data;
  else {
    alert("a");
  }
};
export const createQuestion = async (model: Partial<Question>) => {
  const response: ServiceResponse<Question> = await axios.post(url, model);
  if (response.successful) {
    alert("a");
  } else {
    alert("b");
  }
};

export const updateQuestion = async (model: Partial<Question>) => {
  const response: ServiceResponse<Question> = await axios.put(url, model);
  if (response.successful) {
    alert("a");
  } else {
    alert("b");
  }
};

export const removeQuestion = async (id: string) => {
  const response: ServiceResponse<NoContent> = await axios.delete(
    `${url}/${id}`
  );
  if (response.successful) {
    alert("a");
  } else {
    alert("b");
  }
};
