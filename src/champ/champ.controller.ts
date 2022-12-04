import { Controller, Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { ChampService } from './champ.service';

@Controller('champ')
export class ChampController {
    constructor(private readonly champService: ChampService) {}

    @Get()
    findAllChamps() {
        return this.champService.findAll()
    }

    @Get('setGender/:id/:gender')
    setGender(@Param('id')id: number, @Param('gender') gender: string) {
        return this.champService.setGender(id, gender)
    }
}
