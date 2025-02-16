import BaseEntity from "../base/base-entity";
import Question from "./question";

interface Tag extends BaseEntity {
  name: string;
  questions: Question[];
}

export default Tag;
