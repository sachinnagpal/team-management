import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';
import { TeamMember } from './team-member.schema';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { CreateTeamMemberDto } from './dto/create-team-member.dto';

@Controller('team-members')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Get()
  async findAll(): Promise<TeamMember[]> {
    return this.teamMemberService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe({transform:true}))
  async create(@Body() createTeamMemberDto:CreateTeamMemberDto): Promise<TeamMember> {
    return this.teamMemberService.create(createTeamMemberDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({transform:true}))
  async update(
    @Param('id') id: string,
    @Body() updateTeamMemberDto: UpdateTeamMemberDto
  ): Promise<TeamMember> {
    return this.teamMemberService.update(id, updateTeamMemberDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return this.teamMemberService.delete(id);
  }
}
