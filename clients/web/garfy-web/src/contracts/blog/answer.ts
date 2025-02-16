import BaseEntity from "../base/base-entity";

interface Answer extends BaseEntity {
  content: string;
  userId: string;
  questionId: string;
}

export default Answer;
