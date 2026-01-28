import { Answer } from '../../../../entities/answer';

export class AnswerQuestionResponse {
  questionNumber: number;
  isRight: boolean;
  rightAnswer: number;

  public static from(answer: number, rightAnswer: Answer) {
    const response = new AnswerQuestionResponse();
    response.questionNumber = rightAnswer.questionNumber;
    response.isRight = answer === rightAnswer.answer;
    response.rightAnswer = rightAnswer.answer;
    return response;
  }
}
