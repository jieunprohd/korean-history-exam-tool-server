import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { FileValidation } from '../../utils/file.validation';

@Injectable()
export class PdfFileInterceptor implements NestInterceptor {
  private readonly allowedExtensions = ['pdf'];
  private readonly allowedMimeTypes = ['application/pdf'];
  private readonly maxFileSize = 30 * 1024 * 1024;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const fileFilter = FileValidation.validateFile(
      this.allowedExtensions,
      this.allowedMimeTypes,
    );
    const interceptor = FileInterceptor('file', {
      fileFilter,
      limits: { fileSize: this.maxFileSize },
    });

    const instance = new (interceptor as any)();
    return instance.intercept(context, next);
  }
}
