import { Logger } from "@nestjs/common";
import axios from "axios";
import { Skin } from "src/skin/skin.entity";
import { MigrationInterface, QueryRunner } from "typeorm"

export class poblarSkin1670013468353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
            const champs = await queryRunner.query(`
            SELECT *
            FROM public.champ;
            `);
            const lastPatchArray = await axios.get(
                `https://ddragon.leagueoflegends.com/api/versions.json`
                )
            champs.forEach(async (x: any) => {
                Logger.log(x.champId)
                const result = await axios.get(
                    `http://ddragon.leagueoflegends.com/cdn/${lastPatchArray.data[0]}/data/en_US/champion/${x.champId}.json`
                    )
                x.champId = x.champId === 'Fiddlesticks' ? 'FiddleSticks' : x.champId
                Object.values(result.data.data).forEach(async (y: any) => {
                    y.skins.forEach(async (z: any) => {
                        try{
                            // const splashart = await axios.get(
                            //     `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${x.champId}_${z.num}.jpg`
                            //     , {
                            //         responseType: 'arraybuffer'
                            //     });
                            const skin = new Skin()
                            Logger.log(z.name)
                            skin.name =z.name === 'default' ? `${x.name} ${z.name}` : z.name
                            skin.skinNumber = z.num
                            skin.champ = x
                            // skin.splashart = splashart.data
                            skin.splashartUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${x.champId}_${z.num}.jpg`
                            skin.save()
                        }
                        catch(e){
                            Logger.error(e, x.champId + z.num)
                        }
                    });
                });
            });   
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
