import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMediaUploads1772685750000 implements MigrationInterface {
  name = 'AddMediaUploads1772685750000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."media_uploads_status_enum" AS ENUM('PENDING', 'PROCESSING', 'READY', 'FAILED', 'ATTACHED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "media_uploads" ("id" uuid NOT NULL, "userId" integer NOT NULL, "originalKey" character varying NOT NULL, "processedKey" character varying, "declaredContentType" character varying NOT NULL, "declaredSize" integer NOT NULL, "status" "public"."media_uploads_status_enum" NOT NULL DEFAULT 'PENDING', "expiresAt" TIMESTAMP NOT NULL, "width" integer, "height" integer, "processedSize" integer, "sourceEtag" character varying, "failureCode" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "attachedAt" TIMESTAMP, CONSTRAINT "PK_media_uploads_id" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_media_uploads_status_created_at" ON "media_uploads" ("status", "createdAt")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_media_uploads_user_id_status" ON "media_uploads" ("userId", "status")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_media_uploads_original_key_unique" ON "media_uploads" ("originalKey")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_media_uploads_processed_key_unique" ON "media_uploads" ("processedKey")`,
    );
    await queryRunner.query(
      `ALTER TABLE "media_uploads" ADD CONSTRAINT "FK_media_uploads_user_id" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "post_images" ADD "uploadId" uuid`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_post_images_upload_id_unique" ON "post_images" ("uploadId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "post_images" ADD CONSTRAINT "FK_post_images_upload_id" FOREIGN KEY ("uploadId") REFERENCES "media_uploads"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_images" DROP CONSTRAINT "FK_post_images_upload_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_post_images_upload_id_unique"`,
    );
    await queryRunner.query(`ALTER TABLE "post_images" DROP COLUMN "uploadId"`);
    await queryRunner.query(
      `ALTER TABLE "media_uploads" DROP CONSTRAINT "FK_media_uploads_user_id"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_media_uploads_processed_key_unique"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_media_uploads_original_key_unique"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_media_uploads_user_id_status"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_media_uploads_status_created_at"`,
    );
    await queryRunner.query(`DROP TABLE "media_uploads"`);
    await queryRunner.query(`DROP TYPE "public"."media_uploads_status_enum"`);
  }
}
