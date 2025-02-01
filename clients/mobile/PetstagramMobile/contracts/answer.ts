import BaseEntity from "./base/base-entitiy";
import Question from "./question";

interface Answer extends BaseEntity {
  content: string;
  userId: string;
  questionId: string;
}

export default Answer;
