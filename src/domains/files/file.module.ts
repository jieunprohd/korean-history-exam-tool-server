import { Module } from '@nestjs/common';
import { FileController } from './presentation/file.controller';
import { FileService } from './application/file.service';

@Module({
  imports: [],
  controllers: [FileController],
  providers: [FileService],
  exports: [],
})
export class FileModule {}
