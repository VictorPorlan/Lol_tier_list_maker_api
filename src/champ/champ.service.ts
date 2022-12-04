import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Champ } from './champ.entity';

@Injectable()
export class ChampService {
    constructor(
        @InjectRepository(Champ)
        private readonly champRepository: Repository<Champ>
    ) {
        this.champRepository = champRepository
    }

    public async findAll(){
        return await this.champRepository.query(`SELECT * FROM champ`)
    }
    public async setGender(id: number, gender: string){
        await this.champRepository.query(`UPDATE "champ"
        SET "gender" = '${gender}'
        where "id" = ${id}`)
        return await this.champRepository.query(`SELECT * FROM "champ"
        where "id" = ${id}`)
    }
}
