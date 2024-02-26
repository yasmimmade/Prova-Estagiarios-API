import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoriasExemplos1708918449316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO categoria (nome) VALUES ('Eletrônicos')`,
    );
    await queryRunner.query(`INSERT INTO categoria (nome) VALUES ('Roupas')`);
    await queryRunner.query(`INSERT INTO categoria (nome) VALUES ('Livros')`);
    await queryRunner.query(
      `INSERT INTO categoria (nome) VALUES ('Alimentos')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM categoria WHERE nome = 'Eletrônicos'`);
    await queryRunner.query(`DELETE FROM categoria WHERE nome = 'Roupas'`);
    await queryRunner.query(`DELETE FROM categoria WHERE nome = 'Livros'`);
    await queryRunner.query(
      `INSERT INTO categoria (nome) VALUES ('Alimentos')`,
    );
  }
}
