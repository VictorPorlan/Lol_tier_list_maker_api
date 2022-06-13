import { Controller, Get } from '@nestjs/common';
import { ChampService } from './champ.service';

@Controller('champ')
export class ChampController {
    constructor(private readonly champService: ChampService) {}

    @Get()
    findAllChamps() {
        return this.champService.findAll()
    }
}
