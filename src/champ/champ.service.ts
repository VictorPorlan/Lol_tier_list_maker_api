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

    public findAll(){
        return this.champRepository.query(`SELECT * FROM champ`)
    }
}
