import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
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

  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '태그 생성' })
  create(@Body() dto: CreateTagDto): Promise<TagResponse> {
    return this.tagsService.createOne(dto);
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
