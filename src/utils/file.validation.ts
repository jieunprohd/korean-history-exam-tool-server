import { BadRequestException } from '@nestjs/common';

export class FileValidation {
  public static validateFile(
    allowedExtensions: string[],
    allowedMimeTypes: string[],
  ) {
    return (
      _: any,
      file: Partial<Express.Multer.File>,
      callback: (error: Error | null, acceptFile: boolean) => void,
    ) => {
      try {
        const { fieldname, mimetype, originalname } = file;
        if (!originalname || !mimetype) {
          return callback(
            new BadRequestException(
              `파일 정보가 올바르지 않습니다. (${fieldname})`,
            ),
            false,
          );
        }

        const extension = originalname.split('.').at(-1).toLowerCase();

        if (!allowedExtensions.includes(extension)) {
          return callback(
            new BadRequestException(
              `이미지 확장자가 올바르지 않습니다. (${fieldname})`,
            ),
            false,
          );
        }

        if (!allowedMimeTypes.includes(mimetype.toLowerCase())) {
          return callback(
            new BadRequestException(
              `이미지 타입이 올바르지 않습니다. (${fieldname})`,
            ),
            false,
          );
        }

        callback(null, true);
      } catch {
        return callback(
          new BadRequestException(`파일 업로드 중 오류가 발생하였습니다.`),
          false,
        );
      }
    };
  }
}
