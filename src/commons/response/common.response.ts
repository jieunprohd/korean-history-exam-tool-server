export class CommonResponse {
  success: boolean;
  code: string;
  data: any;

  static of(data = {}, success = true, code = null) {
    const response = new CommonResponse();
    response.success = success;
    response.code = code;
    response.data = data;

    return response;
  }
}
