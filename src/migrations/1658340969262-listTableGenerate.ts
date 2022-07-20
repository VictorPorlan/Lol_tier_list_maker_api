import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class listTableGenerate1658340969262 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "list",
            columns: [
                { name: "id", type: "integer", isNullable: false, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: "name", type: "character varying", isNullable: false },      
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
