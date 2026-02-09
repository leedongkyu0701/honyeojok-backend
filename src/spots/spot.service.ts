import { Injectable } from '@nestjs/common';
import { Spot } from './spot.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Destination } from '../destinations/destination.entity';
import { CreateSpotDto } from './dtos/create-spot.dto';
import { SpotCardResponse } from './dtos/spot-card.response';
import { SpotDetailResponse } from './dtos/spot-detail.response';
import { Tag } from 'src/tags/tag.entity';
import { DataSource } from 'typeorm';
import { FindSpotsQuery } from './dtos/find-spot.query';
import { FindHotSpotsResponse } from './dtos/find-hot.response';
import { BaseException, ErrorCode } from 'src/common/exceptions/base.exception';

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,
    @InjectRepository(Destination)
    private readonly destinationRepository: Repository<Destination>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly dataSource: DataSource,
  ) {}

  async findByQuery(
    query: FindSpotsQuery,
    region: string,
  ): Promise<{ data: SpotCardResponse[]; totalPages: number }> {
    const page = Math.max(1, query.page ?? 1);
    const take = 8;
    const skip = (page - 1) * take;
    const tag = query.tag;

    if (!region) {
      throw BaseException.notFound(
        'Region is required',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }

    const qb = this.spotRepository
      .createQueryBuilder('spot')
      .distinct(true)
      .leftJoinAndSelect('spot.tags', 'tag')
      .leftJoinAndSelect('spot.destination', 'destination')
      .where('destination.slug = :region', { region })
      .orderBy('spot.id', 'ASC')
      .skip(skip)
      .take(take);

    if (tag) {
      qb.andWhere('tag.slug = :tagSlug', { tagSlug: tag });
    }

    const [spots, total] = await qb.getManyAndCount();
    const totalPages = Math.ceil(total / take);

    return {
      data: spots.map((spot) => ({
        id: spot.id,
        slug: spot.slug,
        name: spot.name,
        note: spot.note ?? null,
        imageUrl: spot.imageUrl ?? null,
        destination: {
          id: spot.destination.id,
          slug: spot.destination.slug,
          name: spot.destination.name,
        },
        tags: spot.tags.map((tag) => ({
          slug: tag.slug,
          label: tag.label,
        })),
      })),
      totalPages,
    };
  }

  async findHot(): Promise<FindHotSpotsResponse> {
    const categories = ['healing', 'foodie', 'activity', 'honsool', 'cafe'];
    const response: FindHotSpotsResponse = {
      healing: [],
      foodie: [],
      activity: [],
      honsool: [],
      cafe: [],
    };

    const result = await Promise.all(
      categories.map(async (category) => {
        const spots = await this.spotRepository
          .createQueryBuilder('spot')
          .distinct(true)
          .leftJoinAndSelect('spot.tags', 'tag')
          .leftJoinAndSelect('spot.destination', 'destination')
          .where('tag.slug = :tag', { tag: category })
          .orderBy('spot.id', 'ASC')
          .take(10)
          .getMany();

        const items = spots.map((spot) => ({
          id: spot.id,
          slug: spot.slug,
          name: spot.name,
          note: spot.note ?? null,
          imageUrl: spot.imageUrl ?? null,
          destination: {
            id: spot.destination.id,
            slug: spot.destination.slug,
            name: spot.destination.name,
          },
          tags: spot.tags.map((tag) => ({
            slug: tag.slug,
            label: tag.label,
          })),
        }));
        return { category, items };
      }),
    );

    result.forEach(({ category, items }) => {
      response[category] = items;
    });

    return response;
  }

  async findRecommended(): Promise<SpotCardResponse[]> {
    const spots = await this.spotRepository.find({
      where: { isRecommended: true },
      relations: ['tags', 'destination'],
      order: { id: 'DESC' },
      take: 6,
    });

    return spots.map((spot) => ({
      id: spot.id,
      slug: spot.slug,
      name: spot.name,
      note: spot.note ?? null,
      imageUrl: spot.imageUrl ?? null,
      destination: {
        id: spot.destination.id,
        slug: spot.destination.slug,
        name: spot.destination.name,
      },
      tags: spot.tags.map((tag) => ({
        slug: tag.slug,
        label: tag.label,
      })),
    }));
  }

  async findById(id: number): Promise<SpotDetailResponse> {
    const spot = await this.spotRepository.findOne({
      where: { id },
      relations: ['tags', 'destination'],
    });
    if (!spot) {
      throw BaseException.notFound(
        'Spot not found',
        ErrorCode.RESOURCE_NOT_FOUND,
      );
    }
    return {
      id: spot.id,
      slug: spot.slug,
      name: spot.name,
      note: spot.note ?? null,
      description: spot.description,
      isRecommended: spot.isRecommended,
      imageUrl: spot.imageUrl ?? null,
      imageSource: spot.imageSource ?? null,
      imageCredit: spot.imageCredit ?? null,
      address: spot.address ?? null,
      externalUrl: spot.externalUrl ?? null,
      tags: spot.tags.map((tag) => ({
        slug: tag.slug,
        label: tag.label,
      })),
      destination: {
        id: spot.destination.id,
        slug: spot.destination.slug,
        name: spot.destination.name,
      },
    };
  }

  async createOne(createSpotDto: CreateSpotDto) {
    return this.dataSource.transaction(async (manager) => {
      const destination = await manager.findOne(Destination, {
        where: { slug: createSpotDto.regionSlug },
      });
      if (!destination) {
        throw BaseException.badRequest(
          'Destination not found',
          ErrorCode.BAD_REQUEST,
        );
      }

      const spot = manager.create(Spot, {
        name: createSpotDto.name,
        slug: createSpotDto.slug,
        note: createSpotDto.note ?? null,
        description: createSpotDto.description,
        isRecommended: createSpotDto.isRecommended,
        imageUrl: createSpotDto.imageUrl ?? null,
        imageSource: createSpotDto.imageSource ?? null,
        imageCredit: createSpotDto.imageCredit ?? null,
        address: createSpotDto.address ?? null,
        externalUrl: createSpotDto.externalUrl ?? null,
        destination: destination,
      });

      const savedSpot = await manager.save(spot);

      if (createSpotDto.tagSlugs && createSpotDto.tagSlugs.length > 0) {
        const tags = await manager.find(Tag, {
          where: createSpotDto.tagSlugs.map((slug) => ({ slug })),
        });
        if (tags.length !== createSpotDto.tagSlugs.length) {
          throw BaseException.notFound(
            'One or more tags not found',
            ErrorCode.RESOURCE_NOT_FOUND,
          );
        }
        savedSpot.tags = tags;
        await manager.save(savedSpot);
      }
      return savedSpot;
    });
  }

  async createMany(data: CreateSpotDto[]) {
    return this.dataSource.transaction(async () => {
      const createdSpots: Spot[] = [];
      for (const dto of data) {
        const createSpotDto = await this.createOne(dto);
        createdSpots.push(createSpotDto);
      }
      return createdSpots;
    });
  }
}
