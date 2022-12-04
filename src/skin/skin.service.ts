import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Skin } from "./skin.entity";
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from "axios";




@Injectable()
export class SkinService {
    constructor(
        @InjectRepository(Skin)
        private readonly skinRepository: Repository<Skin>
    ) {
        this.skinRepository = skinRepository;
    }
    @Cron(CronExpression.EVERY_DAY_AT_1AM)
    async handleCron() {
            Logger.log('Checking for new patches...')
            const lastPatch: any[] = await this.skinRepository.query(
                `SELECT "lastPatch" from last_patch`
            );
            const actualPatchArray = await axios.get(
                `https://ddragon.leagueoflegends.com/api/versions.json`
            )

            if(lastPatch[0].lastPatch !== actualPatchArray.data[0]){
                Logger.log('New patch found!', actualPatchArray.data[0])
                await this.addNewChampionPatch(actualPatchArray.data[0])
                setTimeout(async () => {await this.addNewSkinsPatch(actualPatchArray.data[0])}, 5000);
                await this.skinRepository.query(
                    `UPDATE "last_patch"
                    SET "lastPatch" = '${actualPatchArray.data[0]}'
                    where "id" = 1`
                );
                Logger.log('Last patch updated', actualPatchArray.data[0])
            }
    }
   
    public async addNewChampionPatch (actualPatch: string) {
        const result = await axios.get(
            `http://ddragon.leagueoflegends.com/cdn/${actualPatch}/data/en_US/champion.json`
        );
        const dirtyChamps: any[] = await this.skinRepository.query(
            `SELECT "champId" from champ`
        );
        const lastPatchChamps = dirtyChamps.map((x) => x.champId)
        Object.values(result.data.data).forEach((x: any) => {
            if(!lastPatchChamps.includes(x.id)){
                this.skinRepository.query(`
                INSERT INTO champ(name,"champId", gender)
                VALUES('${x.name.replace("'", "''")}', '${x.id}','M');
                `);   
                Logger.log('New champion added', x.name)
            }
        });
    }

    public async addNewSkinsPatch (actualPatch: string) {
        const dirtyChamps: any[] = await this.skinRepository.query(
            `SELECT "id", "champId" from champ`
        )

        dirtyChamps.forEach(async (x) => {
            const dirtySkins= await this.skinRepository.query(
                `SELECT "skinNumber" from skin where "champId" = ${x.id}`
            )
            const lastSkins = dirtySkins.map((x: any) => x.skinNumber)
            const actualChampData = await axios.get(
                `http://ddragon.leagueoflegends.com/cdn/${actualPatch}/data/en_US/champion/${x.champId}.json`
                )
            x.champId = x.champId === 'Fiddlesticks' ? 'FiddleSticks' : x.champId
            Object.values(actualChampData.data.data).forEach(async (y: any) => {
            y.skins.forEach(async (z: any) => {
                try{
                    if(!lastSkins.includes(z.num)){
                        const skin = new Skin()
                        Logger.log('New skin added', z.name)
                        skin.name =z.name === 'default' ? `${x.name} ${z.name}` : z.name
                        skin.skinNumber = z.num
                        skin.champ = x
                        // skin.splashart = splashart.data
                        skin.splashartUrl = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${x.champId}_${z.num}.jpg`
                        skin.save()
                    }
                    
                }
                catch(e){
                    Logger.error(e, x.champId + z.num)
                }
            });
        });
        })
    }

    public async findAll(listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, "champId", "skinNumber", "splashartUrl", st.tier FROM skin s 
            left join "skinTier" st on st."skinId" = s.id 
            order by "champId", "skinNumber"`
        );
        return response;
    }

    public async findChampSkins(id: number, listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, "champId", "skinNumber", "splashartUrl", st.tier 
            FROM skin s 
			left join "skinTier" st on s.id = st."skinId"
            left join "list" l on st."listId" = l.id 
            where "champId" = ${id} 
			and l.name = '${listName}'
			order by "skinNumber"`
        );
        return response;
    }

    public async findOne(id: number): Promise<ISkinResponse> {
        const response: ISkinResponse = await this.skinRepository.query(
            `SELECT s.id, s.name, "champId", "skinNumber", "splashartUrl", st.tier 
            FROM skin s 
            left join "skinTier" st on s.id = st."skinId"
            left join "list" l on st."listId" = l.id
            where s.id = ${id}`
        );
        return response;
    }

    public async findAllDefault(listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, "champId", "skinNumber", "splashartUrl", st.tier FROM skin s 
            left join "skinTier" st on st."skinId" = s.id 
			where s."skinNumber" = 0 
            order by "champId", "skinNumber"`
        );
        return response;
    }

    public async findAllFemale(listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, c."champId", "skinNumber", "splashartUrl", st.tier FROM skin s 
			INNER JOIN champ c on s."champId" = c.id
            left join "skinTier" st on st."skinId" = s.id 
			where c.gender = 'F'
            order by "champId", "skinNumber"`
        );
        return response;
    }

    public async findAllMale(listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, c."champId", "skinNumber", "splashartUrl", st.tier FROM skin s 
			INNER JOIN champ c on s."champId" = c.id
            left join "skinTier" st on st."skinId" = s.id 
			where c.gender = 'M'
            order by "champId", "skinNumber"`
        );
        return response;
    }

    public async findAllDefaultFemale(listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, c."champId", "skinNumber", "splashartUrl", st.tier FROM skin s 
			INNER JOIN champ c on s."champId" = c.id
            left join "skinTier" st on st."skinId" = s.id 
			where s."skinNumber" = 0 
			and c.gender = 'F'
            order by "champId", "skinNumber"`
        );
        return response;
    }

    public async findAllDefaultMale(listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, c."champId", "skinNumber", "splashartUrl", st.tier FROM skin s 
			INNER JOIN champ c on s."champId" = c.id
            left join "skinTier" st on st."skinId" = s.id 
			where s."skinNumber" = 0 
			and c.gender = 'M'
            order by "champId", "skinNumber"`
        );
        return response;
    }

}
