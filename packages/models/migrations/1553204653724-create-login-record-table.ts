import { MigrationInterface, QueryRunner } from 'typeorm'

export class createLoginRecordTable1553204653724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "login_record" ("id" SERIAL NOT NULL, "refresh_token_hash" character varying NOT NULL, "created_at" character varying NOT NULL, "expired_at" character varying NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_29a54d7066b16eb24149e2161e5" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "login_record" ADD CONSTRAINT "FK_c6c44a90754dab8fcb6b6770e0a" FOREIGN KEY ("user_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "login_record" DROP CONSTRAINT "FK_c6c44a90754dab8fcb6b6770e0a"`)
    await queryRunner.query(`DROP TABLE "login_record"`)
  }
}
