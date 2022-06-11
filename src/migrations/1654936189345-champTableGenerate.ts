import { MigrationInterface, QueryRunner, Table } from "typeorm"
export class champTableGenerate1654936189345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "champ",
            columns: [
                { name: "id", type: "integer", isNullable: false, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: "name", type: "character varying", isNullable: false },
                { name: "champId", type: "character varying", isNullable: false },
                { name: "gender", type: "character varying", isNullable: false },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
