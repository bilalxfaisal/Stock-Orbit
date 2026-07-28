import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/db/enums';
import { ApiTags } from '@nestjs/swagger';
import { SearchWarehouseDto } from './dto/search-warehouse.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Warehouse")
@Controller('warehouse')
export class WarehouseController {

    constructor(private readonly warehouseService: WarehouseService) { }

    @Roles(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.STAFF,
        UserRole.AUDITOR
    )
    @Get()
    getAll(
        @Query() query: SearchWarehouseDto,
    ) {
        return this.warehouseService.searchWarehouses(query);
    }

    @Roles(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.STAFF,
        UserRole.AUDITOR
    )
    @Get(':id')
    getWarehouse(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.warehouseService.getWarehouseById(id);
    }

    @Roles(
        UserRole.ADMIN,
    )
    @Post()
    createWarehouse(
        @Body() createWarehouseDto: CreateWarehouseDto,
    ) {
        return this.warehouseService.createWarehouse(createWarehouseDto);
    }

    @Roles(
        UserRole.ADMIN,
    )
    @Patch(':id')
    updateWarehouse(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateWarehouseDto: UpdateWarehouseDto,
    ) {
        return this.warehouseService.updateWarehouse(id, updateWarehouseDto);
    }

    @Roles(
        UserRole.ADMIN,
    )
    @Delete(':id')
    deleteWarehouse(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.warehouseService.deleteWarehouse(id);
    }
}