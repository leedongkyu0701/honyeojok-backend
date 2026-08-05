import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1772685749868 implements MigrationInterface {
  name = 'Init1772685749868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "post_images" ("id" SERIAL NOT NULL, "imageUrl" character varying NOT NULL, "caption" text, "imgOrder" integer NOT NULL DEFAULT '0', "postId" integer NOT NULL, CONSTRAINT "PK_32fe67d8cdea0e7536320d7c454" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_post_images_post_id_img_order" ON "post_images" ("postId", "imgOrder") `,
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" text NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "userId" integer NOT NULL, "postId" integer NOT NULL, "parentId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_comments_post_id_created_at" ON "comments" ("postId", "createdAt") `,
    );
    await queryRunner.query(
      `CREATE TABLE "bookmarks" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "tripRouteId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7f976ef6cecd37a53bd11685f32" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bookmarks_user_id_created_at" ON "bookmarks" ("userId", "createdAt") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_bookmarks_user_id_trip_route_id_unique" ON "bookmarks" ("userId", "tripRouteId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "slug" character varying(100) NOT NULL, "label" character varying NOT NULL, CONSTRAINT "UQ_b3aa10c29ea4e61a830362bd25a" UNIQUE ("slug"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."spots_category_enum" AS ENUM('food', 'cafe', 'drink', 'activity', 'nature', 'etc')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."spots_imagesource_enum" AS ENUM('UNSPLASH', 'KTO', 'OWNER', 'USER', 'SNS', 'ETC')`,
    );
    await queryRunner.query(
      `CREATE TABLE "spots" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "summary" character varying NOT NULL, "category" "public"."spots_category_enum" NOT NULL DEFAULT 'etc', "description" text NOT NULL, "honyeoTip" text, "imageUrl" character varying(255), "imageSource" "public"."spots_imagesource_enum", "imageCredit" character varying, "address" character varying, "lat" double precision, "lng" double precision, "externalUrl" character varying(500), "isRecommended" boolean NOT NULL DEFAULT false, "destinationId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0c9421c96c6947244a7e082bb84" UNIQUE ("slug"), CONSTRAINT "PK_cc8c0341ef60619746e42815cf4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_spots_destination_id_is_recommended_id" ON "spots" ("destinationId", "isRecommended", "id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "trip_route_items" ("id" SERIAL NOT NULL, "order" integer NOT NULL, "recommendedLevel" integer NOT NULL DEFAULT '3', "title" character varying NOT NULL, "description" text NOT NULL, "imageUrl" character varying, "imageCredit" character varying, "lat" double precision, "lng" double precision, "address" character varying, "startTime" character varying, "endTime" character varying, "externalUrl" character varying, "dayId" integer NOT NULL, "spotId" integer, CONSTRAINT "PK_bd4f1d689e08e3428a97d4d5c6e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_trip_route_items_day_id_order_unique" ON "trip_route_items" ("dayId", "order") `,
    );
    await queryRunner.query(
      `CREATE TABLE "trip_route_days" ("id" SERIAL NOT NULL, "dayNumber" integer NOT NULL, "title" character varying NOT NULL, "note" text NOT NULL, "tripRouteId" integer NOT NULL, CONSTRAINT "PK_ad75b1b92951d4b999e2edb67c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_trip_route_days_trip_route_id_day_number_unique" ON "trip_route_days" ("tripRouteId", "dayNumber") `,
    );
    await queryRunner.query(
      `CREATE TABLE "trip_routes" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "summary" character varying(300) NOT NULL, "honyeoTip" text, "days" integer NOT NULL, "honyeoCost" integer, "bookmarkCount" integer NOT NULL DEFAULT '0', "destinationId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dca34bf153f3314314a2c79f63d" UNIQUE ("slug"), CONSTRAINT "PK_4bf4d596adf96d5851c59e173dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_trip_routes_destination_id_bookmark_count_id" ON "trip_routes" ("destinationId", "bookmarkCount", "id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."destinations_province_enum" AS ENUM('SEOUL_GYEONGGI', 'GANGWON', 'CHUNGCHEONG', 'JEOLLA', 'GYEONGSANG', 'JEJU')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."destinations_imagesource_enum" AS ENUM('UNSPLASH', 'KTO', 'OWNER', 'USER', 'SNS', 'ETC')`,
    );
    await queryRunner.query(
      `CREATE TABLE "destinations" ("id" SERIAL NOT NULL, "slug" character varying(100) NOT NULL, "province" "public"."destinations_province_enum" NOT NULL, "name" character varying NOT NULL, "rank" integer NOT NULL, "score" double precision NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "summary" character varying NOT NULL, "description" text NOT NULL, "food" integer NOT NULL, "transport" integer NOT NULL, "safety" integer NOT NULL, "loneliness" integer NOT NULL, "imageUrl" character varying, "imageSource" "public"."destinations_imagesource_enum", "imageCredit" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_30864aeaf404f4a6d3f816bd8c5" UNIQUE ("slug"), CONSTRAINT "UQ_8ec7648e4654df2a195dd516ba9" UNIQUE ("rank"), CONSTRAINT "PK_69c5e8db964dcb83d3a0640f3c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post_likes" ("id" SERIAL NOT NULL, "postId" integer NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4ac7cb9daf243939c6eabb2e0d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_post_likes_post_id_user_id_unique" ON "post_likes" ("postId", "userId") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."posts_type_enum" AS ENUM('REVIEW', 'FREE', 'QUESTION')`,
    );
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" text NOT NULL, "rating" double precision, "region" character varying, "type" "public"."posts_type_enum" NOT NULL, "likeCount" integer NOT NULL DEFAULT '0', "viewCount" integer NOT NULL DEFAULT '0', "thumbnailUrl" character varying, "isDeleted" boolean NOT NULL DEFAULT false, "userId" integer NOT NULL, "destinationId" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_posts_user_id_is_deleted_created_at" ON "posts" ("userId", "isDeleted", "createdAt") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_posts_is_deleted_created_at" ON "posts" ("isDeleted", "createdAt") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_provider_enum" AS ENUM('apple', 'kakao', 'google', 'naver')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying, "provider" "public"."users_provider_enum" NOT NULL, "providerId" character varying NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "nickName" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "refreshToken" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_44b6d4cb3fe916de38974ed9c2f" UNIQUE ("nickName"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_users_provider_provider_id_unique" ON "users" ("provider", "providerId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "spot_tags" ("spotsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_8589f62e062167aa2a560acdb00" PRIMARY KEY ("spotsId", "tagsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_804eb6f8cbba6406bbad3aa3d1" ON "spot_tags" ("spotsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_164c1775ebf02e05ca509aa013" ON "spot_tags" ("tagsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "trip_route_tags" ("tripRoutesId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_655c8d8bb5c6622746178841579" PRIMARY KEY ("tripRoutesId", "tagsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_287696da8711f635fa574a8d50" ON "trip_route_tags" ("tripRoutesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1b72d926b23113c0413f937dc3" ON "trip_route_tags" ("tagsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "destination_tags" ("destinationsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_4f11c00d013998e824c14cbe160" PRIMARY KEY ("destinationsId", "tagsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7ce94e873b3997156bc97c17b6" ON "destination_tags" ("destinationsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d5c77df868b2e90dfdc9631ace" ON "destination_tags" ("tagsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "post_images" ADD CONSTRAINT "FK_92e2382a7f43d4e9350d591fb6a" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81" FOREIGN KEY ("parentId") REFERENCES "comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_c6065536f2f6de3a0163e19a584" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" ADD CONSTRAINT "FK_bb05289934eda71d6e21cff5261" FOREIGN KEY ("tripRouteId") REFERENCES "trip_routes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "spots" ADD CONSTRAINT "FK_23eaf2d0a7ef92c667a8c2050a3" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_route_items" ADD CONSTRAINT "FK_a7d79e0d70e02afbbf5a55cb276" FOREIGN KEY ("dayId") REFERENCES "trip_route_days"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_route_items" ADD CONSTRAINT "FK_b06b73c79e930147d40b3f9aef3" FOREIGN KEY ("spotId") REFERENCES "spots"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_route_days" ADD CONSTRAINT "FK_cacb5a45b26f728e208da9f815f" FOREIGN KEY ("tripRouteId") REFERENCES "trip_routes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_routes" ADD CONSTRAINT "FK_0fdcae246b9f7b964ee7bba1bf5" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_likes" ADD CONSTRAINT "FK_6999d13aca25e33515210abaf16" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_likes" ADD CONSTRAINT "FK_37d337ad54b1aa6b9a44415a498" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_0edd7303f9bfed050aa4935789e" FOREIGN KEY ("destinationId") REFERENCES "destinations"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "spot_tags" ADD CONSTRAINT "FK_804eb6f8cbba6406bbad3aa3d10" FOREIGN KEY ("spotsId") REFERENCES "spots"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "spot_tags" ADD CONSTRAINT "FK_164c1775ebf02e05ca509aa0135" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_route_tags" ADD CONSTRAINT "FK_287696da8711f635fa574a8d50b" FOREIGN KEY ("tripRoutesId") REFERENCES "trip_routes"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_route_tags" ADD CONSTRAINT "FK_1b72d926b23113c0413f937dc3a" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "destination_tags" ADD CONSTRAINT "FK_7ce94e873b3997156bc97c17b6f" FOREIGN KEY ("destinationsId") REFERENCES "destinations"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "destination_tags" ADD CONSTRAINT "FK_d5c77df868b2e90dfdc9631acee" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "destination_tags" DROP CONSTRAINT "FK_d5c77df868b2e90dfdc9631acee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "destination_tags" DROP CONSTRAINT "FK_7ce94e873b3997156bc97c17b6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_route_tags" DROP CONSTRAINT "FK_1b72d926b23113c0413f937dc3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_route_tags" DROP CONSTRAINT "FK_287696da8711f635fa574a8d50b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "spot_tags" DROP CONSTRAINT "FK_164c1775ebf02e05ca509aa0135"`,
    );
    await queryRunner.query(
      `ALTER TABLE "spot_tags" DROP CONSTRAINT "FK_804eb6f8cbba6406bbad3aa3d10"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_0edd7303f9bfed050aa4935789e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_likes" DROP CONSTRAINT "FK_37d337ad54b1aa6b9a44415a498"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_likes" DROP CONSTRAINT "FK_6999d13aca25e33515210abaf16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_routes" DROP CONSTRAINT "FK_0fdcae246b9f7b964ee7bba1bf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_route_days" DROP CONSTRAINT "FK_cacb5a45b26f728e208da9f815f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_route_items" DROP CONSTRAINT "FK_b06b73c79e930147d40b3f9aef3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "trip_route_items" DROP CONSTRAINT "FK_a7d79e0d70e02afbbf5a55cb276"`,
    );
    await queryRunner.query(
      `ALTER TABLE "spots" DROP CONSTRAINT "FK_23eaf2d0a7ef92c667a8c2050a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_bb05289934eda71d6e21cff5261"`,
    );
    await queryRunner.query(
      `ALTER TABLE "bookmarks" DROP CONSTRAINT "FK_c6065536f2f6de3a0163e19a584"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_8770bd9030a3d13c5f79a7d2e81"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_images" DROP CONSTRAINT "FK_92e2382a7f43d4e9350d591fb6a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d5c77df868b2e90dfdc9631ace"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7ce94e873b3997156bc97c17b6"`,
    );
    await queryRunner.query(`DROP TABLE "destination_tags"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1b72d926b23113c0413f937dc3"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_287696da8711f635fa574a8d50"`,
    );
    await queryRunner.query(`DROP TABLE "trip_route_tags"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_164c1775ebf02e05ca509aa013"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_804eb6f8cbba6406bbad3aa3d1"`,
    );
    await queryRunner.query(`DROP TABLE "spot_tags"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_users_provider_provider_id_unique"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_provider_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_posts_is_deleted_created_at"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_posts_user_id_is_deleted_created_at"`,
    );
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TYPE "public"."posts_type_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_post_likes_post_id_user_id_unique"`,
    );
    await queryRunner.query(`DROP TABLE "post_likes"`);
    await queryRunner.query(`DROP TABLE "destinations"`);
    await queryRunner.query(
      `DROP TYPE "public"."destinations_imagesource_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."destinations_province_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_trip_routes_destination_id_bookmark_count_id"`,
    );
    await queryRunner.query(`DROP TABLE "trip_routes"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_trip_route_days_trip_route_id_day_number_unique"`,
    );
    await queryRunner.query(`DROP TABLE "trip_route_days"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_trip_route_items_day_id_order_unique"`,
    );
    await queryRunner.query(`DROP TABLE "trip_route_items"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_spots_destination_id_is_recommended_id"`,
    );
    await queryRunner.query(`DROP TABLE "spots"`);
    await queryRunner.query(`DROP TYPE "public"."spots_imagesource_enum"`);
    await queryRunner.query(`DROP TYPE "public"."spots_category_enum"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bookmarks_user_id_trip_route_id_unique"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_bookmarks_user_id_created_at"`,
    );
    await queryRunner.query(`DROP TABLE "bookmarks"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_comments_post_id_created_at"`,
    );
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_post_images_post_id_img_order"`,
    );
    await queryRunner.query(`DROP TABLE "post_images"`);
  }
}
