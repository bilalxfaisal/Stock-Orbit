import { Controller, Get, NotFoundException, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';

import { AuditService } from './audit.service';
import { AuditEntity, UserRole } from 'src/db/enums';
import { NotFoundError } from 'rxjs';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchAuditDto } from './dto/search-audit.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
@ApiTags("Audit")
@Controller('audit')
export class AuditController {

    constructor(private readonly auditService: AuditService ) { }

    @Get("stats")
    stats() {
        return this.auditService.stats();
    }

    @Get()
    getHistory(
        @Query() query: SearchAuditDto
    ) {
        return this.auditService.getHistory(query);
    }
};