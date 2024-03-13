import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Patch,
  Put,
  Query,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/account/create-account.dto';
import { UpdateAccountDto } from './dto/account/update-account.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
import { ApiResponse, ApiTags} from '@nestjs/swagger';

@ApiTags('accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {
    // console.log('AccountController is created');
  }

  /**
   * Setting different API Responses for Swagger UI
   * (long version)
   */
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.accountsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Put(':id')
  updateR(@Param('id') id: string, @Body() body) {
    return this.accountsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }
}
