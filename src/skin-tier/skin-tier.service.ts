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

    public async setTier(dto: IBodySetTier): Promise<any> {
        
        const exists:[] = await this.skinRepository.query(
            `Select * from "skinTier" st
            inner join list l on st."listId" = l."id" 
            where l."name" = '${dto.listName}'
            and st."skinId" = ${dto.skinId}
            `
        );
        if(exists.length !== 0){
            await this.skinRepository.query(
                `UPDATE "skinTier" st
                SET tier = '${dto.tier}'
                FROM "list" l 
                where st."skinId" = ${dto.skinId}
                and l."id" = "st"."listId"
                and l."name" = '${dto.listName}'`
            );
        }
        else{
            let newID = await this.skinRepository.query(
                `SELECT id from list where "name" = '${dto.listName}'`
            );
            await this.skinRepository.query(
                `insert into "skinTier"("tier", "skinId", "listId") VALUES ('${dto.tier}', ${dto.skinId}, '${newID[0].id}')`
            );
          
        }
        return exists;
    }
}
