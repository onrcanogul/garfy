import BaseEntity from "../base/base-entity";

interface Answer extends BaseEntity {
  content: string;
  userName: string;
  questionId: string;
}

export default Answer;
