import { Answer } from '../../../../entities/answer';
import { ExamSet } from '../../../../entities/exam.set';

export class GetAnalyzeAnswerResponse {
  examSetId: number;
  extractedAnswers: ExtractedAnswerResponse[];

  public static from(examSet: ExamSet) {
    const response = new GetAnalyzeAnswerResponse();
    response.examSetId = examSet.id;
    response.extractedAnswers = examSet.answers.map(
      ExtractedAnswerResponse.from,
    );
    return response;
  }
}

export class ExtractedAnswerResponse {
  questionNumber: number;
  answer: number;

  public static from(answer: Answer) {
    const response = new ExtractedAnswerResponse();
    response.questionNumber = answer.questionNumber;
    response.answer = answer.answer;
    return response;
  }
}
