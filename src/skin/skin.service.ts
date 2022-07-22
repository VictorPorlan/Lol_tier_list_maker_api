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

    public async findAll(listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, "champId", "skinNumber", "splashartUrl", st.tier FROM skin s 
            inner join "skinTier" st on st."skinId" = s.id 
            inner join "list" l on st."listId" = l.id
            where l."name" = '${listName}'
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
            inner join "skinTier" st on st."skinId" = s.id 
            inner join "list" l on st."listId" = l.id
            where l."name" = '${listName}'
			and s."skinNumber" = 0 
            order by "champId", "skinNumber"`
        );
        return response;
    }

    public async findAllFemale(listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, c."champId", "skinNumber", "splashartUrl", st.tier FROM skin s 
			INNER JOIN champ c on s."champId" = c.id
            inner join "skinTier" st on st."skinId" = s.id 
            inner join "list" l on st."listId" = l.id
            where l."name" = '${listName}'
			and c.gender = 'F'
            order by "champId", "skinNumber"`
        );
        return response;
    }

    public async findAllMale(listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, c."champId", "skinNumber", "splashartUrl", st.tier FROM skin s 
			INNER JOIN champ c on s."champId" = c.id
            inner join "skinTier" st on st."skinId" = s.id 
            inner join "list" l on st."listId" = l.id
            where l."name" = '${listName}'
			and c.gender = 'M'
            order by "champId", "skinNumber"`
        );
        return response;
    }

    public async findAllDefaultFemale(listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, c."champId", "skinNumber", "splashartUrl", st.tier FROM skin s 
			INNER JOIN champ c on s."champId" = c.id
            inner join "skinTier" st on st."skinId" = s.id 
            inner join "list" l on st."listId" = l.id
            where l."name" = '${listName}'
			and s."skinNumber" = 0 
			and c.gender = 'F'
            order by "champId", "skinNumber"`
        );
        return response;
    }

    public async findAllDefaultMale(listName: string): Promise<ISkinResponse[]> {
        const response: ISkinResponse[] = await this.skinRepository.query(
            `SELECT s.id, s.name, c."champId", "skinNumber", "splashartUrl", st.tier FROM skin s 
			INNER JOIN champ c on s."champId" = c.id
            inner join "skinTier" st on st."skinId" = s.id 
            inner join "list" l on st."listId" = l.id
            where l."name" = '${listName}'
			and s."skinNumber" = 0 
			and c.gender = 'M'
            order by "champId", "skinNumber"`
        );
        return response;
    }
}
