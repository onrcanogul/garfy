import BaseEntity from "./base/base-entitiy";
import Question from "./question";

interface Tag extends BaseEntity {
  name: string;
  questions: Question[];
}

export default Tag;
