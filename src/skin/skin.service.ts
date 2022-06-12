import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Skin } from "./skin.entity";

@Injectable()
export class SkinService {
    constructor(
        @InjectRepository(Skin)
        private readonly skinRepository: Repository<Skin>
    ) {
        this.skinRepository = skinRepository
    }

    public findOne(params: any) {
        return this.skinRepository.query(`SELECT * FROM skin where id = ${params.id}`)
    }
}
