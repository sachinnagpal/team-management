import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamMemberService } from './team-member.service';
import { TeamMemberController } from './team-member.controller';
import { TeamMember, TeamMemberSchema } from './team-member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TeamMember.name, schema: TeamMemberSchema }]),
  ],
  providers: [TeamMemberService],
  controllers: [TeamMemberController],
})
export class TeamMemberModule {}
