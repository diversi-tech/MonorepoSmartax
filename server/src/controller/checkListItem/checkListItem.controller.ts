import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CheckListItem } from "../../Models/checkListItem.model";
import { CreateCheckListItemDto, UpdateCheckListItemDto } from "../../Models/dto/checkListItem.dto";
import { CheckListItemService } from "../../services/checkListItem.service";

@ApiTags('CheckListItem')
@Controller('checkListItem')
export class CheckListItemController {
  constructor(private readonly checkListItemService: CheckListItemService) {}

  @Get()
  async findAll(): Promise<CheckListItem[]> {
    return this.checkListItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CheckListItem> {
    const checkListItem = await this.checkListItemService.findOne(id);
    if (!checkListItem) {
      throw new NotFoundException(`CheckListItem with id ${id} not found`);
    }
    return checkListItem;
  }

  @Post()
  async create(@Body() createCheckListItemDto: CreateCheckListItemDto): Promise<CheckListItem> {
    return this.checkListItemService.create(createCheckListItemDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCheckListItemDto: UpdateCheckListItemDto): Promise<CheckListItem> {
    return this.checkListItemService.update(id, updateCheckListItemDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.checkListItemService.delete(id);
  }
}
