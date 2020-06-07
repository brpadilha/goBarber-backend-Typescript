import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1591292833722 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id', // coluna id de cada angendamento
            type: 'uuid', // no nosso caso será um varchar do uuId
            isPrimary: true, // ele deve ser único na tabela
            generationStrategy: 'uuid', // ele vai gerar esse campo id de forma automática como uuid
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name', // coluna do tipo provider
            type: 'varchar', // como varchar
          },
          {
            name: 'email',
            type: 'varchar', // como varchar
          },
          {
            name: 'password',
            type: 'varchar', // como varchar
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
