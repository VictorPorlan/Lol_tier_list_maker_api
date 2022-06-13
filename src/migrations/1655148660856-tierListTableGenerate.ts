import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class tierListTableGenerate1655148660856 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tierList",
            columns: [
                { name: "id", type: "integer", isNullable: false, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: "tier", type: "character varying", isNullable: false },
                { name: "skinId", type: "integer", isNullable: false },
            ],
             foreignKeys: [
                {
                    name: 'fk_skin_tier',
                    columnNames: ["skinId"],
                    referencedTableName: "skin",
                    referencedColumnNames: ["id"],
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
