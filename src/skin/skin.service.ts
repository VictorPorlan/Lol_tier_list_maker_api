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
        this.skinRepository = skinRepository;
    }

    public async findAll(): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, "champId", "skinNumber", "splashartUrl", t.tier FROM skin s left join "tierList" t on t."skinId" = s.id order by "champId", "skinNumber"`
        );
        return response
    }

    public async findChampSkins(params: any): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, "champId", "skinNumber", "splashartUrl", t.tier FROM skin s left join "tierList" t on t."skinId" = s.id where "champId" = ${params.champId} order by "skinNumber"`
        );
        return response
    }

    public async findOne(params: any): Promise<ISkinResponse> {
        const response: ISkinResponse = await this.skinRepository.query(
            `SELECT s.id, s.name, "champId", "skinNumber", "splashartUrl", t.tier FROM skin s left join "tierList" t on t."skinId" = s.id where id = ${params.id}`
        );
        return response
    }

    public async findAllDefault(): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, s."champId", s."skinNumber", s."splashartUrl", t.tier
            FROM skin s INNER JOIN champ c on s."champId" = c.id 
            left join "tierList" t on t."skinId" = s.id
            where s."skinNumber" = 0 order by c.id`
        );
        return response
    }

    public async findAllFemale(): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, s."champId", s."skinNumber", s."splashartUrl", t.tier
            FROM skin s INNER JOIN champ c on s."champId" = c.id
            left join "tierList" t on t."skinId" = s.id
            where c.gender = 'F' order by c.id, s."skinNumber"`
        );
        return response
    }

    public async findAllMale(): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, s."champId", s."skinNumber", s."splashartUrl", t.tier
            FROM skin s INNER JOIN champ c on s."champId" = c.id
            left join "tierList" t on t."skinId" = s.id
            where c.gender = 'M' order by c.id, s."skinNumber"`
        );
        return response
    }

    public async findAllDefaultFemale(): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, s."champId", s."skinNumber", s."splashartUrl", t.tier
            FROM skin s INNER JOIN champ c on s."champId" = c.id
            left join "tierList" t on t."skinId" = s.id
            where c.gender = 'F' and s."skinNumber" = 0 order by c.id, s."skinNumber"`
        );
        return response
    }

    public async findAllDefaultMale(): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, s."champId", s."skinNumber", s."splashartUrl", t.tier
            FROM skin s INNER JOIN champ c on s."champId" = c.id 
            left join "tierList" t on t."skinId" = s.id
            where c.gender = 'M' and s."skinNumber" = 0 order by c.id, s."skinNumber"`
        );
        return response
    }
}
