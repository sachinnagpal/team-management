import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from './team-member.schema';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectModel(TeamMember.name) private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async findAll(): Promise<TeamMember[]> {
    return this.teamMemberModel.find().exec();
  }

  async create(createTeamMemberDto: Partial<TeamMember>): Promise<TeamMember> {
    const createdTeamMember = new this.teamMemberModel(createTeamMemberDto);
    return createdTeamMember.save();
  }

  async update(id: string, updateTeamMemberDto: Partial<TeamMember>): Promise<TeamMember> {
    const updatedTeamMember = await this.teamMemberModel.findByIdAndUpdate(id, updateTeamMemberDto, { new: true }).exec();
    if (!updatedTeamMember) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    }
    console.log(`Team member with id ${id} updated`)
    return updatedTeamMember;
  }

  async delete(id: string): Promise<boolean> {
    const userDeleted = await this.teamMemberModel.findByIdAndDelete(id).exec();
    if(!userDeleted) {
      throw new NotFoundException(`Team member with ID ${id} not found`);
    } else {
      return true
    }
  }
}
