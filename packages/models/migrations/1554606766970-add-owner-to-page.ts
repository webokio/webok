import { MigrationInterface, QueryRunner } from 'typeorm'

export class addOwnerToPage1554606766970 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    // Delete all pages because page must have owner
    await queryRunner.query(`DELETE FROM "page"`)
    await queryRunner.query(`ALTER TABLE "page" ADD "owner_id" integer NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "page" ADD CONSTRAINT "FK_87f5e36afd08b5fe2fb6347c455" FOREIGN KEY ("owner_id") REFERENCES "app_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "page" DROP CONSTRAINT "FK_87f5e36afd08b5fe2fb6347c455"`)
    await queryRunner.query(`ALTER TABLE "page" DROP COLUMN "owner_id"`)
  }
}
