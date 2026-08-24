import { TripRouteCardResponseDto } from '../dto/response/trip-route-card.response.dto';
import { TripRoute } from '../entities/trip-route.entity';

export class TripRouteMapper {
  static toCard(route: TripRoute): TripRouteCardResponseDto {
    return {
      id: route.id,
      slug: route.slug,
      title: route.title,
      summary: route.summary,
      days: route.days,
      regionSlug: route.destination.slug,
      bookmarkCount: route.bookmarkCount,
    };
  }
}
