import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1591219663280
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id', // coluna id de cada angendamento
            type: 'varchar', // no nosso caso será um varchar do uuId
            isPrimary: true, // ele deve ser único na tabela
            generationStrategy: 'uuid', // ele vai gerar esse campo id de forma automática como uuid
          },
          {
            name: 'provider', // coluna do tipo provider
            type: 'varchar', // como varchar
            isNullable: false, // não tem como esse campo ser nulo
          },
          {
            name: 'date',
            type: 'timestamp with time zone', // se não for banco do tipo postgres vai ser somente timestamp
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
