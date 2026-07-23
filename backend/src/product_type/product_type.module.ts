import { Module } from '@nestjs/common';
import { ProductTypeController } from './product_type.controller';
import { ProductTypeService } from './product_type.service';
import { AuditService } from 'src/audit/audit.service';

@Module({
  controllers: [ProductTypeController],
  providers: [ProductTypeService, AuditService]
})
export class ProductTypeModule {}
