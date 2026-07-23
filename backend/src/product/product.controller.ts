import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Patch,
    UseGuards
} from '@nestjs/common';

import { ProductService } from './product.service';
import { SearchProductDto, StockInProductDto, StockOutProductDto, UpdatePriceDto } from './dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { UserRole } from 'src/db/enums';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Products")
@Controller('products')
export class ProductController {

    constructor(private readonly productService: ProductService) { }

    @Roles(
        UserRole.ADMIN, 
        UserRole.MANAGER, 
        UserRole.STAFF, 
        UserRole.AUDITOR
    )
    @Get()
    searchProduct(@Query() query: SearchProductDto) {
        return this.productService.searchProducts(query);
    }

    @Roles(
        UserRole.ADMIN, 
        UserRole.MANAGER, 
        UserRole.STAFF, 
        UserRole.AUDITOR
    )
    @Get(':id')
    getProductById(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return this.productService.getProductById(id);
    }

    @Roles(
        UserRole.ADMIN, 
        UserRole.MANAGER, 
        UserRole.STAFF
    )
    @Post('stock-in')
    stockIn(
        @Body() stockInDto: StockInProductDto,
    ) {
        return this.productService.stockIn(stockInDto);
    }

    @Roles(
        UserRole.ADMIN, 
        UserRole.MANAGER, 
        UserRole.STAFF
    )
    @Post('stock-out')
    stockOut(
        @Body() stockOutDto: StockOutProductDto,
    ) {
        return this.productService.stockOut(stockOutDto);
    }

    @Roles(
        UserRole.ADMIN, 
        UserRole.MANAGER, 
        UserRole.STAFF
    )
    @Patch(":id/price")
    updatePrice(
        @Param("id", ParseIntPipe) id: number,
        @Body() updatePriceDto: UpdatePriceDto,
    ) {
        return this.productService.updateProductPrice(
            id,
            updatePriceDto.price,
        );
    }
}