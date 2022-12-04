import { LastPatch } from "src/last-patch/last-patch.entity";
import { MigrationInterface, QueryRunner, Table } from "typeorm"
import axios from "axios";

export class crearLastPatch1670006717508 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "last_patch",
            columns: [
                { name: "id", type: "integer", isNullable: false, isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: "lastPatch", type: "character varying", isNullable: false },
            ],
        }));
        const lastPatchArray = await axios.get(
            `https://ddragon.leagueoflegends.com/api/versions.json`
        )
        queryRunner.query(`INSERT INTO "last_patch" ("lastPatch") VALUES('${lastPatchArray.data[0]}')`) 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
