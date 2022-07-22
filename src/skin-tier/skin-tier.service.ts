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
    public async check(params: any): Promise<IResponseSkinTier> {
        try{
            const response = await this.skinRepository.query(
                `SELECT name from list where name = '${params.name}'`
            );
            if(response.length === 0){
                await this.skinRepository.query(
                    `INSERT into list(name) values('${params.name}')`
                );
                let newID = await this.skinRepository.query(
                    `SELECT id from list where name = '${params.name}'`
                );
                await this.skinRepository.query(
                    `insert into "skinTier"("tier", "skinId", "listId")  (select 'NT', "id", ${newID[0].id} from skin)`
                );
                return {action: "crear", name: params.name}
            }
            else{
                return {action: "existe", name: params.name}
            }
        }
        catch(e){
            console.log(e)
        }
    }

}
