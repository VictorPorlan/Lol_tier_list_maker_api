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
        const response = await this.skinRepository.query(
            `SELECT name from list where name = '${params.name}'`
        );
        if(response.length === 0){
            await this.skinRepository.query(
                `INSERT into list(name) values('${params.name}')`
            );
            return {action: "crear", name: params.name}
        }
        else{
            return {action: "existe", name: params.name}
        }
    }

}
