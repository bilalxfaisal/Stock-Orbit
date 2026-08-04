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
import { ContainerService} from './container.service';
import { CreateContainerDto, UpdateContainerDto, SearchContainerDto } from "./dto"
import { JwtAuthGuard, RolesGuard } from 'src/auth/guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/db/enums';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Container")
@Controller('containers')
export class ContainerController {

	constructor(private readonly containerService: ContainerService) { }

	@Roles(
		UserRole.ADMIN,
		UserRole.MANAGER,
		UserRole.STAFF,
		UserRole.AUDITOR
	)
	@Get()
	getAll(
		@Query() query: SearchContainerDto,
	) {
		return this.containerService.getAllContainers(query);
	}

	@Roles(
		UserRole.ADMIN,
		UserRole.MANAGER,
		UserRole.STAFF,
		UserRole.AUDITOR
	)
	@Get(':id')
	getContainerById(@Param('id', ParseIntPipe) id: number) {
		return this.containerService.getContainerById(id);
	}

	@Roles(
		UserRole.ADMIN,
		UserRole.MANAGER,
	)
	@Post()
	createContainer(
		@Body() createContainerDto: CreateContainerDto,
		@Request() req,
	) {
		return this.containerService.createContainer(createContainerDto, req.user.role);
	}

	@Roles(
		UserRole.ADMIN,
		UserRole.MANAGER,
	)
	@Patch(':id')
	updateContainer(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateContainerDto: UpdateContainerDto,
		@Request() req,
	) {
		return this.containerService.updateContainer(id, updateContainerDto, req.user.role);
	}

	@Roles(
		UserRole.ADMIN,
	)
	@Delete(':id')
	deleteContainer(
		@Param('id', ParseIntPipe) id: number,
		@Request() req,
	) {
		return this.containerService.deleteContainer(id, req.user.role);
	}
}