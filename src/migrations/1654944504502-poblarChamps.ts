import { MigrationInterface, QueryRunner } from "typeorm";
import axios from "axios";

export class poblarChamps1654944504502 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const babes = [
            "Ahri",
            "Akali",
            "Anivia",
            "Annie",
            "Ashe",
            "Bel'Veth",
            "Caitlyn",
            "Camille",
            "Cassiopeia",
            "Diana",
            "Elise",
            "Evelynn",
            "Fiora",
            "Gwen",
            "Illaoi",
            "Irelia",
            "Janna",
            "Jinx",
            "Kai'Sa",
            "Kalista",
            "Karma",
            "Katarina",
            "Kayle",
            "Kindred",
            "LeBlanc",
            "Leona",
            "Lillia",
            "Lissandra",
            "Lux",
            "Lulu",
            "Miss Fortune",
            "Morgana",
            "Nami",
            "Neeko",
            "Nidalee",
            "Nilah",
            "Orianna",
            "Poppy",
            "Qiyana",
            "Quinn",
            "Rek'Sai",
            "Rell",
            "Renata Glasc",
            "Riven",
            "Samira",
            "Sejuani",
            "Senna",
            "Seraphine",
            "Shyvana",
            "Sivir",
            "Sona",
            "Soraka",
            "Syndra",
            "Taliyah",
            "Tristana",
            "Vayne",
            "Vex",
            "Vi",
            "Xayah",
            "Yuumi",
            "Zeri",
            "Zoe",
            "Zyra"
        ];
        const lastPatchArray = await axios.get(
            `https://ddragon.leagueoflegends.com/api/versions.json`
            )
        const result = await axios.get(
            `http://ddragon.leagueoflegends.com/cdn/${lastPatchArray.data[0]}/data/en_US/champion.json`
        );
        Object.values(result.data.data).forEach((x: any) => {
                queryRunner.query(`
                INSERT INTO champ(name,"champId", gender)
                VALUES('${x.name.replace("'", "''")}', '${x.id}','${babes.includes(x.name) ? 'F' : 'M'}');
                `);            
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
