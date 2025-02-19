import BaseEntity from "../base/base-entity";
import Answer from "./answer";
import Tag from "./tag";

interface Question extends BaseEntity {
  userName: string;
  shortContent: string;
  content: string;
  title: string;
  tags: Tag[];
  answers: Answer[];
}

export default Question;
