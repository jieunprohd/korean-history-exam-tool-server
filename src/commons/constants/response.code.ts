export class ResponseCode {
  static OK = 200;
  static CREATED = 201;
  static ACCEPTED = 202;
  static NO_CONTENT = 204;

  static MULTIPLE_CHOICES = 300;
  static MOVED_PERMANENTLY = 301;
  static SEE_OTHER = 303;
  static TEMPORARY_REDIRECT = 307;

  static BAD_REQUEST = 400;
  static UNAUTHORIZED = 401;
  static FORBIDDEN = 403;
  static NOT_FOUND = 404;
  static CONFLICT = 409;

  static INTERNAL_SERVER_ERROR = 500;
}
