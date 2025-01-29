import Answer from "./answer";
import BaseEntity from "./base/base-entitiy";
import Tag from "./tag";

interface Question extends BaseEntity {
  userId: string;
  shortContent: string;
  content: string;
  title: string;
  tags: Tag[];
  answers: Answer[];
}

export default Question;
