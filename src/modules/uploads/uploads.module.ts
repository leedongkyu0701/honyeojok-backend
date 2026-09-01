import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { R2Module } from 'src/infrastructure/storage/r2/r2.module';
import { MediaUpload } from './entities/media-upload.entity';
import { MediaWorkerGuard } from './guards/media-worker.guard';
import { UploadsCleanupService } from './uploads-cleanup.service';
import { UploadsController } from './uploads.controller';
import { UploadsInternalController } from './uploads-internal.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [TypeOrmModule.forFeature([MediaUpload]), R2Module],
  controllers: [UploadsController, UploadsInternalController],
  providers: [UploadsService, UploadsCleanupService, MediaWorkerGuard],
  exports: [UploadsService],
})
export class UploadsModule {}
