import { SpotCardResponseDto } from '../dto/response/spot-card.response.dto';
import { SpotDetailResponseDto } from '../dto/response/spot-detail.response.dto';
import { Spot } from '../entities/spot.entity';
import { SpotCategory } from '../enums/spot-category.enum';

export class SpotMapper {
  static toCard(spot: Spot): SpotCardResponseDto {
    return {
      id: spot.id,
      slug: spot.slug,
      name: spot.name,
      summary: spot.summary,
      lat: spot.lat ?? null,
      lng: spot.lng ?? null,
      category: spot.category ?? SpotCategory.ETC,
      imageUrl: spot.imageUrl ?? null,
      tags: (spot.tags ?? []).map((tag) => ({
        slug: tag.slug,
        label: tag.label,
        id: tag.id,
      })),
      destination: {
        id: spot.destination.id,
        slug: spot.destination.slug,
        name: spot.destination.name,
      },
    };
  }

  static toDetail(spot: Spot): SpotDetailResponseDto {
    return {
      id: spot.id,
      slug: spot.slug,
      name: spot.name,
      category: spot.category ?? SpotCategory.ETC,
      lat: spot.lat ?? null,
      lng: spot.lng ?? null,
      description: spot.description,
      summary: spot.summary,
      honyeoTip: spot.honyeoTip ?? null,
      imageUrl: spot.imageUrl ?? null,
      imageSource: spot.imageSource ?? null,
      imageCredit: spot.imageCredit ?? null,
      address: spot.address ?? null,
      externalUrl: spot.externalUrl ?? null,
      tags: (spot.tags ?? []).map((tag) => ({
        slug: tag.slug,
        label: tag.label,
        id: tag.id,
      })),
      destination: {
        id: spot.destination.id,
        slug: spot.destination.slug,
        name: spot.destination.name,
      },
    };
  }
}
