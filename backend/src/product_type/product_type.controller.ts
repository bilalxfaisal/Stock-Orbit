import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';

import { ProductTypeService } from './product_type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/db/enums';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Product Type")
@Controller('product-type')
export class ProductTypeController {

    constructor(private readonly productTypeService: ProductTypeService) { }

    @Roles(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.STAFF,
        UserRole.AUDITOR
    )
    @Get()
    getAll() {
        return this.productTypeService.getAllProductTypes();
    }

    @Roles(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.STAFF,
        UserRole.AUDITOR
    )
    @Get(':id')
    getById(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.productTypeService.getProductTypeById(id);
    }

    @Roles(
        UserRole.ADMIN,
        UserRole.MANAGER,
    )
    @Post()
    create(
        @Body() createProductTypeDto: CreateProductTypeDto,
    ) {
        return this.productTypeService.createProductType(
            createProductTypeDto,
        );
    }

    // @Patch(':id')
    // update(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() updateProductTypeDto: UpdateProductTypeDto,
    // ) {
    //     return this.productTypeService.updateProductType(
    //         id,
    //         updateProductTypeDto,
    //     );
    // }

    @Roles(
        UserRole.ADMIN,
    )
    @Delete(':id')
    delete(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.productTypeService.deleteProductType(id);
    }
}