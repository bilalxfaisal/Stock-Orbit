import { Module } from '@nestjs/common';
import { ContainerService } from './container.service';
import { ContainerController } from './container.controller';
import { AuditService } from 'src/audit/audit.service';

@Module({
	providers: [ContainerService, AuditService],
	controllers: [ContainerController]
})
export class ContainerModule { }
