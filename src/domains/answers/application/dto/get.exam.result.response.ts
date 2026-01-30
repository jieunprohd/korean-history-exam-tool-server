import { UserAnswer } from '../../../../entities/user.answer';
import { UserExam } from '../../../../entities/user.exam';

export class GetExamResultResponse {
  totalScore: number;
  userScore: number;
  results: UserAnswerResultResponse[];

  public static from(userExam: UserExam) {
    const response = new GetExamResultResponse();
    response.totalScore = this.getTotalScore(userExam);
    response.userScore = this.getUserScore(userExam.userAnswers);
    response.results = userExam.userAnswers.map(UserAnswerResultResponse.from);
    return response;
  }

  private static getTotalScore(userExam: UserExam) {
    return userExam.examSet.answers.reduce((a, c) => a + c.score, 0);
  }

  private static getUserScore(userAnswers: UserAnswer[]) {
    return userAnswers
      .filter(
        (userAnswer) => userAnswer.userAnswer === userAnswer.answer.answer,
      )
      .map((userAnswer) => userAnswer.answer)
      .reduce((a, c) => a + c.score, 0);
  }
}

export class UserAnswerResultResponse {
  questionNumber: number;
  userAnswer: number;
  rightAnswer: number;
  score: number;

  public static from(userAnswer: UserAnswer) {
    const response = new UserAnswerResultResponse();
    response.questionNumber = userAnswer.answer.questionNumber;
    response.userAnswer = userAnswer.userAnswer;
    response.rightAnswer = userAnswer.answer.answer;
    response.score = userAnswer.answer.score;
    return response;
  }
}
