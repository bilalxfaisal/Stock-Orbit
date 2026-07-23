import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/roles.guard';
import { AuditService } from 'src/audit/audit.service';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: "10d",
			}
		})
	],
	providers: [AuthService, JwtStrategy, RolesGuard, AuditService],
	controllers: [AuthController],
	exports: [AuthService],
})
export class AuthModule { }
