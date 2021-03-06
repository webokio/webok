import { MigrationInterface, QueryRunner } from 'typeorm'

export class createPageTable1551989135254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "page" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "url" character varying NOT NULL, "created_at" character varying NOT NULL, CONSTRAINT "PK_742f4117e065c5b6ad21b37ba1f" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "page"`)
  }
}
