import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkinTier } from './skin-tier.entity';

@Injectable()
export class SkinTierService {
    constructor(
        @InjectRepository(SkinTier)
        private readonly skinRepository: Repository<SkinTier>
    ) {
        this.skinRepository = skinRepository;
    }
    public async check(listName: string): Promise<IResponseSkinTier> {
        try{
            const response = await this.skinRepository.query(
                `SELECT name from list where name = '${listName}'`
            );
            if(response.length === 0){
                await this.skinRepository.query(
                    `INSERT into list(name) values('${listName}')`
                );
                let newID = await this.skinRepository.query(
                    `SELECT id from list where name = '${listName}'`
                );
                await this.skinRepository.query(
                    `insert into "skinTier"("tier", "skinId", "listId")  (select 'NT', "id", ${newID[0].id} from skin)`
                );
                return {action: "crear", name: listName}
            }
            else{
                return {action: "existe", name: listName}
            }
        }
        catch(e){
            console.log(e)
        }
    }

    public async setTier(listName: string, tier: string, skinId: number): Promise<any> {
        const response: any = await this.skinRepository.query(
            `UPDATE "skinTier" st
            SET tier = '${tier}'
            FROM "list" l 
            where st."skinId" = ${skinId}
            and l."id" = "st"."listId"
            and l."name" = '${listName}'`
        );
        return response;
    }
}
