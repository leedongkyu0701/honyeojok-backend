import { DataSource } from 'typeorm';
import {
  createDatabaseConnectionOptions,
  type DatabaseConfiguration,
} from 'src/config/database.config';
import { Init1772685749868 } from 'src/database/migrations/1772685749868-init';
import { AddMediaUploads1772685750000 } from 'src/database/migrations/1772685750000-add-media-uploads';
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { Comment } from 'src/modules/posts/entities/comment.entity';
import { PostImage } from 'src/modules/posts/entities/post-image.entity';
import { PostLike } from 'src/modules/posts/entities/post-like.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Spot } from 'src/modules/spots/entities/spot.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Bookmark } from 'src/modules/trip-routes/entities/bookmark.entity';
import { TripRouteDay } from 'src/modules/trip-routes/entities/trip-route-day.entity';
import { TripRouteItem } from 'src/modules/trip-routes/entities/trip-route-item.entity';
import { TripRoute } from 'src/modules/trip-routes/entities/trip-route.entity';
import { MediaUpload } from 'src/modules/uploads/entities/media-upload.entity';
import { User } from 'src/modules/users/entities/user.entity';

export type IntegrationDatabaseConfig = DatabaseConfiguration;

export function createIntegrationDataSource(
  config: IntegrationDatabaseConfig,
): DataSource {
  return new DataSource({
    ...createDatabaseConnectionOptions(config),
    entities: [
      Bookmark,
      Comment,
      Destination,
      MediaUpload,
      Post,
      PostImage,
      PostLike,
      Spot,
      Tag,
      TripRoute,
      TripRouteDay,
      TripRouteItem,
      User,
    ],
    migrations: [Init1772685749868, AddMediaUploads1772685750000],
  });
}
