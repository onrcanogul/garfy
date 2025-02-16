import axios from "axios";
import Tag from "../../contracts/blog/tag";
import ServiceResponse from "../../contracts/base/response";
import NoContent from "../../contracts/base/no-content";
import { blogBasePath } from "../../constants/endpoint";

const url = blogBasePath + "/tag";

export const create = async (model: Partial<Tag>) => {
  const response: ServiceResponse<Tag> = await axios.post(url, model);
  if (response.successful) {
    alert("a");
  } else {
    alert("b");
  }
};

export const update = async (model: Partial<Tag>) => {
  const response: ServiceResponse<Tag> = await axios.put(url, model);
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
