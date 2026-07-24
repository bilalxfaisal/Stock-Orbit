import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';

@UseGuards(JwtAuthGuard)
@ApiTags("Dashboard")
@Controller('dashboard')
export class DashboardController {

    constructor(private readonly dashboardService: DashboardService) {}

    @Get()
    dashboard(){
        return this.dashboardService.dashboard();
    }
}
