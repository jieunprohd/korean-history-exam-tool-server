import { ExamSet } from '../../../../entities/exam.set';

export class UploadExamSetResponse {
  examSetId: number;
  examName: string;
  filePath: string;

  public static from(examSet: ExamSet, filePath: string) {
    const response = new UploadExamSetResponse();
    response.examSetId = examSet.id;
    response.examName = examSet.name;
    response.filePath = filePath;
    return response;
  }
}
