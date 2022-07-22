import { MigrationInterface, QueryRunner } from "typeorm";
import axios from "axios";
import { Skin } from "../skin/skin.entity";

export class poblarSkin1654971730806 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const champs = await queryRunner.query(`
        SELECT *
        FROM public.champ;
        `);
        champs.forEach(async (x: any) => {
            const result = await axios.get(
                `http://ddragon.leagueoflegends.com/cdn/12.13.1/data/en_US/champion/${x.champId}.json`
            );
            Object.values(result.data.data).forEach(async (y: any) => {
                y.skins.forEach(async (z: any) => {
                    const splashart = await axios.get(
                        `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${x.champId}_${z.num}.jpg`
                        , {
                            responseType: 'arraybuffer'
                          });
                    const skin = new Skin()
                    skin.name =z.name === 'default' ? `${x.name} ${z.name}` : z.name
                    skin.skinNumber = z.num
                    skin.champ = x
                    skin.splashart = splashart.data
                    skin.splashartUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${x.champId}_${z.num}.jpg`
                    skin.save()
                });
            });
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
