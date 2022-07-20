import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class skinTierTableGenerate1658341002053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.createTable(new Table({
        //     name: "skinTier",
        //     columns: [
        //         { name: "id", type: "integer", isNullable: false, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
        //         { name: "tier", type: "character varying", isNullable: false },
        //         { name: "skinId", type: "integer", isNullable: false },
        //         { name: "listId", type: "integer", isNullable: false },
        //     ],
        //      foreignKeys: [
        //         {
        //             name: 'fk_skin_tier',
        //             columnNames: ["skinId"],
        //             referencedTableName: "skin",
        //             referencedColumnNames: ["id"],
        //         },
        //         {
        //             name: 'fk_list_tier',
        //             columnNames: ["listId"],
        //             referencedTableName: "list",
        //             referencedColumnNames: ["id"],
        //         },
        //     ],
        // }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
