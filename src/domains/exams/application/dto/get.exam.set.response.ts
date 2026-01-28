import { ExamSet } from '../../../../entities/exam.set';
import { Answer } from '../../../../entities/answer';

export class GetExamSetResponse {
  examSetId: number;
  examName: string;
  answers: GetAnswerResponse[];

  public static from(examSet: ExamSet) {
    const response = new GetExamSetResponse();
    response.examSetId = examSet.id;
    response.examName = examSet.name;
    response.answers = examSet.answers.map(GetAnswerResponse.from);
    return response;
  }
}

export class GetAnswerResponse {
  questionNumber: number;
  answer: number;

  public static from(answer: Answer) {
    const response = new GetAnswerResponse();
    response.questionNumber = answer.questionNumber;
    response.answer = answer.answer;
    return response;
  }
}
