import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuditService } from 'src/audit/audit.service';

@Module({
  providers: [UserService, AuditService],
  controllers: [UserController]
})
export class UserModule {}
