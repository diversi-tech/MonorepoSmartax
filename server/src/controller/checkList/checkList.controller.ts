import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseFilters } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HttpErrorFilter } from "server/src/common/filters/http-error.filter";
import { CheckList } from "server/src/Models/checkList.model";
import { CreateCheckListDto, UpdateCheckListDto } from "server/src/Models/dto/checkList.dto";
import { CreateUserDto, UpdateUserDto } from "server/src/Models/dto/user.dto";
import { CheckListService } from "server/src/services/checkList.service";
import { hashPasswordService } from "server/src/services/hash-password";
import { TokenService } from "server/src/services/jwt.service";
import { RoleService } from "server/src/services/role.service";
import { UserService } from "server/src/services/user.service";

@ApiTags('checkList')
@Controller('checkList')
@UseFilters(HttpErrorFilter)
export class CheckListController {
  constructor(private checkListService: CheckListService) { }

  @Post()
  async create(@Body() createCheckListDto: CreateCheckListDto): Promise<CheckList> {
    return this.checkListService.create(createCheckListDto);
  }

  @Get()
  async findAll(): Promise<CheckList[]> {
    return this.checkListService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CheckList> {
    const checkList = await this.checkListService.findOne(id);
    if (!checkList) {
      throw new NotFoundException('Checklist does not exist!');
    }
    return checkList;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCheckListDto: UpdateCheckListDto): Promise<CheckList> {
    try {
      console.log("try update checkList");
      
      return this.checkListService.update(id, updateCheckListDto);
    }
    catch (err) {
      console.log(err);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CheckList> {
    try {
      return this.checkListService.delete(id);
    }
    catch (err) {
      console.log(err);

    }
  }


}
