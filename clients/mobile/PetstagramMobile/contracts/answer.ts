import BaseEntity from "./base/base-entitiy";
import Question from "./question";

interface Answer extends BaseEntity {
  content: string;
  userId: string;
  question: Question;
}

export default Answer;
