import { randomUUID } from 'node:crypto';
import { DataSource } from 'typeorm';
import { AuthProvider } from 'src/modules/auth/enums/auth-provider.enum';
import { ProvinceGroup } from 'src/modules/destinations/enums/province-group.enum';
import { Destination } from 'src/modules/destinations/entities/destination.entity';
import { PostType } from 'src/modules/posts/enums/post-type.enum';
import { Post } from 'src/modules/posts/entities/post.entity';
import { TripRoute } from 'src/modules/trip-routes/entities/trip-route.entity';
import { MediaUploadStatus } from 'src/modules/uploads/enums/media-upload-status.enum';
import { MediaUpload } from 'src/modules/uploads/entities/media-upload.entity';
import { UserRole } from 'src/modules/users/enums/user-role.enum';
import { User } from 'src/modules/users/entities/user.entity';

export async function createTestUser(
  dataSource: DataSource,
  overrides: TestUserOverrides = {},
): Promise<User> {
  return dataSource.getRepository(User).save(
    dataSource.getRepository(User).create({
      provider: AuthProvider.GOOGLE,
      providerId: 'integration-provider-id',
      nickName: null,
      role: UserRole.USER,
      isDeleted: false,
      ...overrides,
    }),
  );
}

export async function createTestDestination(
  dataSource: DataSource,
  overrides: TestDestinationOverrides = {},
): Promise<Destination> {
  return dataSource.getRepository(Destination).save(
    dataSource.getRepository(Destination).create({
      slug: 'seoul',
      province: ProvinceGroup.SEOUL_GYEONGGI,
      name: '서울',
      rank: 1,
      score: 4.5,
      latitude: 37.5665,
      longitude: 126.978,
      summary: '테스트 여행지',
      description: '테스트용 여행지 설명',
      food: 4,
      transport: 4,
      safety: 4,
      loneliness: 4,
      ...overrides,
    }),
  );
}

export async function createTestPost(
  dataSource: DataSource,
  user: User,
  overrides: TestPostOverrides = {},
): Promise<Post> {
  return dataSource.getRepository(Post).save(
    dataSource.getRepository(Post).create({
      title: '테스트 게시글',
      content: '테스트 게시글 내용',
      type: PostType.FREE,
      userId: user.id,
      isDeleted: false,
      likeCount: 0,
      viewCount: 0,
      ...overrides,
    }),
  );
}

export async function createTestTripRoute(
  dataSource: DataSource,
  destination: Destination,
  overrides: TestTripRouteOverrides = {},
): Promise<TripRoute> {
  return dataSource.getRepository(TripRoute).save(
    dataSource.getRepository(TripRoute).create({
      slug: 'seoul-one-day',
      title: '서울 하루 여행',
      summary: '테스트 여행 루트',
      days: 1,
      bookmarkCount: 0,
      destinationId: destination.id,
      ...overrides,
    }),
  );
}

export async function createTestMediaUpload(
  dataSource: DataSource,
  user: User,
  overrides: TestMediaUploadOverrides = {},
): Promise<MediaUpload> {
  return dataSource.getRepository(MediaUpload).save(
    dataSource.getRepository(MediaUpload).create({
      id: randomUUID(),
      userId: user.id,
      originalKey: `images/posts/original/${randomUUID()}`,
      declaredContentType: 'image/jpeg',
      declaredSize: 1_024,
      status: MediaUploadStatus.PENDING,
      expiresAt: new Date('2026-09-02T00:00:00.000Z'),
      ...overrides,
    }),
  );
}

type TestUserOverrides = Partial<
  Pick<
    User,
    'email' | 'provider' | 'providerId' | 'isDeleted' | 'nickName' | 'role'
  >
>;

type TestDestinationOverrides = Partial<
  Pick<
    Destination,
    | 'slug'
    | 'province'
    | 'name'
    | 'rank'
    | 'score'
    | 'latitude'
    | 'longitude'
    | 'summary'
    | 'description'
    | 'food'
    | 'transport'
    | 'safety'
    | 'loneliness'
  >
>;

type TestPostOverrides = Partial<
  Pick<
    Post,
    | 'title'
    | 'content'
    | 'type'
    | 'userId'
    | 'isDeleted'
    | 'likeCount'
    | 'viewCount'
  >
>;

type TestTripRouteOverrides = Partial<
  Pick<
    TripRoute,
    'slug' | 'title' | 'summary' | 'days' | 'bookmarkCount' | 'destinationId'
  >
>;

type TestMediaUploadOverrides = Partial<
  Pick<
    MediaUpload,
    | 'id'
    | 'userId'
    | 'originalKey'
    | 'processedKey'
    | 'declaredContentType'
    | 'declaredSize'
    | 'status'
    | 'expiresAt'
  >
>;
