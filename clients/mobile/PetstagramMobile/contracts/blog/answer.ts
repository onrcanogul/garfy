import BaseEntity from "../base/base-entitiy";

interface Answer extends BaseEntity {
  content: string;
  userId: string;
  questionId: string;
}

export default Answer;
