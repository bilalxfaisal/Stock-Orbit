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
    Request,
    UseGuards,
} from '@nestjs/common';

import { ProductTypeService } from './product_type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/db/enums';
import { ApiTags } from '@nestjs/swagger';
import { SearchProductTypeDto } from './dto/search-product-type.dto';

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
    getAll(@Query() query?: SearchProductTypeDto) {
        console.log("Controller : ", query)
        return this.productTypeService.getAllProductTypes(query);
    }

    @Roles(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.STAFF,
        UserRole.AUDITOR
    )
    // @Get(':id')
    // getById(
    //     @Param('id', ParseIntPipe) id: number,
    // ) {
    //     return this.productTypeService.getProductTypeById(id);
    // }

    @Roles(
        UserRole.ADMIN,
        UserRole.MANAGER,
    )
    @Post()
    create(
        @Body() createProductTypeDto: CreateProductTypeDto,
        @Request() req,
    ) {
        return this.productTypeService.createProductType(
            createProductTypeDto,
            req.user.role,
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
        @Request() req,
    ) {
        return this.productTypeService.deleteProductType(id, req.user.role);
    }
}