import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/tag.dto';
import { TagResponse } from './dtos/tag.response';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from 'src/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/types/user';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get()
  @ApiOperation({ summary: '태그 목록 조회' })
  async findAll(): Promise<TagResponse[]> {
    return this.tagsService.findAll();
  }

  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '태그 일괄 생성' })
  async createMany(@Body() dto: CreateTagDto[]): Promise<TagResponse[]> {
    return this.tagsService.createMany(dto);
  }

  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':slug')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '태그 삭제' })
  async remove(@Body('slug') slug: string): Promise<{ ok: true }> {
    return this.tagsService.remove(slug);
  }
}
