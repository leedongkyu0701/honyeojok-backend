import {
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { UpdateUploadProcessingResultRequestDto } from './dto/request/update-upload-processing-result.request.dto';
import { MediaWorkerGuard } from './guards/media-worker.guard';
import { UploadsService } from './uploads.service';

@ApiExcludeController()
@UseGuards(MediaWorkerGuard)
@Controller('internal/uploads')
export class UploadsInternalController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post(':uploadId/processing')
  async markProcessing(
    @Param('uploadId', new ParseUUIDPipe({ version: '4' })) uploadId: string,
  ): Promise<{ status: string }> {
    const status = await this.uploadsService.markProcessing(uploadId);
    return { status };
  }

  @Post(':uploadId/result')
  async updateResult(
    @Param('uploadId', new ParseUUIDPipe({ version: '4' })) uploadId: string,
    @Body() dto: UpdateUploadProcessingResultRequestDto,
  ): Promise<{ status: string }> {
    const status = await this.uploadsService.updateProcessingResult(
      uploadId,
      dto,
    );
    return { status };
  }
}
