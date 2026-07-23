import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { AuditService } from 'src/audit/audit.service';

@Module({
  providers: [WarehouseService, AuditService],
  controllers: [WarehouseController]
})
export class WarehouseModule {}
