import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuditService } from 'src/audit/audit.service';

@Module({
  providers: [CategoryService, AuditService],
  controllers: [CategoryController]
})
export class CategoryModule {}
