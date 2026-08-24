import { DestinationCardResponseDto } from '../dto/response/destination-card.response.dto';
import { Destination } from '../entities/destination.entity';

export class DestinationMapper {
  static toCard(destination: Destination): DestinationCardResponseDto {
    return {
      id: destination.id,
      slug: destination.slug,
      name: destination.name,
      score: destination.score,
      summary: destination.summary,
      imageUrl: destination.imageUrl ?? null,
    };
  }
}
