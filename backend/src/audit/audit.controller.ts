import { Controller, Get, NotFoundException, Param, ParseIntPipe, UseGuards } from '@nestjs/common';

import { AuditService } from './audit.service';
import { AuditEntity, UserRole } from 'src/db/enums';
import { NotFoundError } from 'rxjs';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF)
@ApiTags("Audit")
@Controller('audit')
export class AuditController {

    constructor(private readonly auditService: AuditService ) { }

    @Get()
    history() {
        return this.auditService.history();
    }

    allhistory() {
        return this.auditService.history();
    }

    @Get("stats")
    stats() {
        return this.auditService.stats();
    }

    @Get(':entity')
    getEntityHistory(
        @Param('entity') entity: AuditEntity,
    ) {
        return this.auditService.getHistory(entity);
    }

    @Get(':entity/:id')
    getEntityIdHistory(
        @Param('entity') entity: AuditEntity,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.auditService.getHistory(entity, id);
    }
}