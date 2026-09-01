import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { JwtAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import type { JwtUser } from 'src/modules/auth/types/jwt-user.type';
import { CreateUploadSessionsRequestDto } from './dto/request/create-upload-sessions.request.dto';
import { FindUploadStatusQueryDto } from './dto/query/find-upload-status.query.dto';
import { CreateUploadSessionsResponseDto } from './dto/response/create-upload-sessions.response.dto';
import { FindUploadStatusResponseDto } from './dto/response/upload-status.response.dto';
import { UploadsService } from './uploads.service';

@ApiTags('Uploads')
@ApiBearerAuth('access-token')
@UseGuards(JwtAccessGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('presign')
  @ApiOperation({ summary: '게시글 이미지 Presigned PUT URL 발급' })
  @ApiResponse({ type: CreateUploadSessionsResponseDto })
  createUploadSessions(
    @CurrentUser() user: JwtUser,
    @Body() dto: CreateUploadSessionsRequestDto,
  ): Promise<CreateUploadSessionsResponseDto> {
    return this.uploadsService.createUploadSessions(user.id, dto);
  }

  @Get('status')
  @ApiOperation({ summary: '게시글 이미지 처리 상태 조회' })
  @ApiResponse({ type: FindUploadStatusResponseDto })
  findStatuses(
    @CurrentUser() user: JwtUser,
    @Query() query: FindUploadStatusQueryDto,
  ): Promise<FindUploadStatusResponseDto> {
    return this.uploadsService.findOwnedStatuses(user.id, query.ids);
  }
}
