import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ContainerModule } from './container/container.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductTypeModule } from './product_type/product_type.module';
import { AuditModule } from './audit/audit.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [WarehouseModule, ContainerModule, CategoryModule, ProductModule, ProductTypeModule, AuditModule, DashboardModule, UserModule, AuthModule, InventoryModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
