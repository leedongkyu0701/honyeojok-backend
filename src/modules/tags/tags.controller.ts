import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagRequestDto } from './dto/request/create-tag.request.dto';
import { TagResponseDto } from './dto/response/tag.response.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAccessGuard } from 'src/modules/auth/guards/jwt-access.guard';
import { RoleGuard } from 'src/modules/auth/guards/role.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { UserRole } from 'src/modules/users/enums/user-role.enum';
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
  create(@Body() dto: CreateTagRequestDto): Promise<TagResponseDto> {
    return this.tagsService.createOne(dto);
  }

  @UseGuards(JwtAccessGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @Delete()
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '태그 삭제' })
  async remove(@Body('slug') slug: string): Promise<{ ok: true }> {
    return this.tagsService.remove(slug);
  }
}
