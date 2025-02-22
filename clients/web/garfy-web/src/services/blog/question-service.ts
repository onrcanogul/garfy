import axios from "axios";
import ServiceResponse from "../../contracts/base/response";
import Question from "../../contracts/blog/question";
import NoContent from "../../contracts/base/no-content";
import { blogBasePath } from "../../constants/endpoint";
import { currentUser } from "../auth-service";
import ToastrService from "../toastr-service";

const url = blogBasePath + "/question";

export const getQuestion = async (page: number, size: number) => {
  const response = await axios.get(`${url}//${page}/${size}`);
  if (response.data) return response.data.data;
  else {
    alert("a");
  }
};

export const getByUser = async (
  page: number,
  size: number,
  userName: string | undefined
): Promise<Question[] | undefined> => {
  const response: ServiceResponse<Question[] | undefined> = (
    await axios.get(`${url}/user/${page}/${size}/${userName}`)
  ).data;
  if (response.successful) return response.data;
  else {
    alert("a");
    return undefined;
  }
};

export const createQuestion = async (
  question: Partial<Question>,
  files: any[]
) => {
  question.userName = currentUser().username;
  const model = new FormData();
  model.append("model", JSON.stringify(question));
  files.forEach((image) => {
    model.append("files", image); // 'images' key'i Spring Boot ile eşleşmeli
  });
  const response: any = await axios.post(url, model);
  debugger;
  if (response.data.successful) {
    ToastrService.success("Soru başarıyla yüklendi.");
    return response.data.data;
  } else {
    ToastrService.error("Soru yüklenirken hata meydana geldi.");
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
