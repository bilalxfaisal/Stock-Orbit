import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { UserRole } from 'src/db/enums';
import { InventoryService } from './inventory.service';
import { SearchInventoryDto } from './dto/search-inventory.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Inventory')
@Controller('inventory')
export class InventoryController {
	constructor(private readonly inventoryService: InventoryService) { }

	@Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.AUDITOR)
	@Get()
	findAll(@Query() query: SearchInventoryDto) {
		return this.inventoryService.findAll(query);
	}

	@Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.AUDITOR)
	@Get('product/:productId')
	findByProduct(@Param('productId', ParseIntPipe) productId: number) {
		return this.inventoryService.findByProduct(productId);
	}

	@Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.AUDITOR)
	@Get('container/:containerId')
	findByContainer(@Param('containerId', ParseIntPipe) containerId: number) {
		return this.inventoryService.findByContainer(containerId);
	}

	@Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.STAFF, UserRole.AUDITOR)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.inventoryService.findOne(id);
	}
}
