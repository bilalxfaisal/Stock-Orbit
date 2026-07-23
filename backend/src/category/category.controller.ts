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
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { JwtAuthGuard, RolesGuard } from "src/auth/guards";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/db/enums";
import { ApiTags } from "@nestjs/swagger";

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Category")
@Controller("category")
export class CategoryController {

    constructor(private readonly categoryService: CategoryService) { }

    @Roles(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.STAFF,
        UserRole.AUDITOR
    )
    @Get()
    getAll() {
        return this.categoryService.getAllCategories();
    }

    @Roles(
        UserRole.ADMIN,
        UserRole.MANAGER,
        UserRole.STAFF,
        UserRole.AUDITOR
    )
    @Get(":id")
    getCategory(
        @Param("id", ParseIntPipe) id: number,
    ) {
        return this.categoryService.getCategoryById(id);
    }

    @Roles(
        UserRole.ADMIN,
        UserRole.MANAGER,
    )
    @Post()
    createCategory(
        @Body() createCategoryDto: CreateCategoryDto,
    ) {
        return this.categoryService.createCategory(createCategoryDto);
    }

    // @Patch(":id")
    // updateCategory(
    //     @Param("id", ParseIntPipe) id: number,
    //     @Body() updateCategoryDto: UpdateCategoryDto,
    // ) {
    //     return this.categoryService.updateCategory(id, updateCategoryDto);
    // }

    @Roles(
        UserRole.ADMIN,
    )
    @Delete(":id")
    deleteCategory(
        @Param("id", ParseIntPipe) id: number,
    ) {
        return this.categoryService.deleteCategory(id);
    }
}