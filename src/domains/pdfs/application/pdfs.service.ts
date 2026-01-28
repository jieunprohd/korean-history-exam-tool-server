import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { PdfsRepository } from './pdfs.repository';
import { PdfType, PdfUpload } from '../../../entities/pdf.uploads';

@Injectable()
export class PdfsService {
  private readonly s3: S3Client;

  constructor(
    private readonly configService: ConfigService,
    private readonly pdfsRepository: PdfsRepository,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async uploadPdf(
    file: Express.Multer.File,
    userId: string,
    type: PdfType,
  ): Promise<PdfUpload> {
    const bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    const key = `${type}/${userId}/${Date.now()}_${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);

    const fileUrl = `https://${bucketName}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${key}`;

    const pdfUpload = new PdfUpload();
    pdfUpload.filePath = fileUrl;
    pdfUpload.type = type;

    return this.pdfsRepository.save(pdfUpload);
  }
}
