import { UserExam } from '../../../../entities/user.exam';

export class StartUserExamResponse {
  userExamId: number;
  examSetId: number;
  startAt: Date;

  public static from(userExam: UserExam) {
    const response = new StartUserExamResponse();
    response.userExamId = userExam.id;
    response.examSetId = userExam.examSet.id;
    response.startAt = userExam.createdAt;
    return response;
  }
}
