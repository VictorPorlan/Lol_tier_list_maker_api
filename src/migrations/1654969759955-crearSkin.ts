import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class crearSkin1654969759955 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.createTable(new Table({
        //     name: "skin",
        //     columns: [
        //         { name: "id", type: "integer", isNullable: false, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
        //         { name: "name", type: "character varying", isNullable: false },
        //         { name: "champId", type: "integer", isNullable: false },
        //         { name: "skinNumber", type: "integer", isNullable: false },
        //         { name: "splashartUrl", type: "character varying", isNullable: false },
        //         { name: "splashart", type: "bytea", isNullable: true }
        //     ],
        //      foreignKeys: [
        //         {
        //             name: 'fk_champ_skin',
        //             columnNames: ["champId"],
        //             referencedTableName: "champ",
        //             referencedColumnNames: ["id"],
        //         },
        //     ],
        // }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
