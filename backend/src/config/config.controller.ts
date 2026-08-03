import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards';
import { stockConfig } from './stock.config';

@UseGuards(JwtAuthGuard)
@ApiTags("Config")
@Controller('config')
export class ConfigController {

    // Any authenticated user can read this — it only describes UI
    // behavior, it isn't sensitive data.

    @Get('stock-settings')
    getStockSettings() {
        return {
            allowManualContainerSelection: stockConfig.allowManualContainerSelection,
        };
    }
}
