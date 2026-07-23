import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuditService } from 'src/audit/audit.service';
import { ProductHelper } from './product.helper';

@Module({
  providers: [ProductService, AuditService, ProductHelper],
  controllers: [ProductController]
})
export class ProductModule {} 
