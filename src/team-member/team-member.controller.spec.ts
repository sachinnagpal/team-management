import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TeamMemberController } from './team-member.controller';
import { TeamMemberService } from './team-member.service';
import { TeamMember } from './team-member.schema';

const mockTeamMember = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '1234567890',
  email: 'john.doe@example.com',
  role: 'user',
};

describe('TeamMemberController', () => {
  let controller: TeamMemberController;
  let service: TeamMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamMemberController],
      providers: [
        TeamMemberService,
        {
          provide: getModelToken(TeamMember.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<TeamMemberController>(TeamMemberController);
    service = module.get<TeamMemberService>(TeamMemberService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all team members', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([mockTeamMember]);
    const teamMembers = await controller.findAll();
    expect(teamMembers).toEqual([mockTeamMember]);
  });

  it('should create a team member', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(mockTeamMember);
    const newTeamMember = await controller.create(mockTeamMember);
    expect(newTeamMember).toEqual(mockTeamMember);
  });

  it('should update a team member', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(mockTeamMember);
    const updatedTeamMember = await controller.update('1', mockTeamMember);
    expect(updatedTeamMember).toEqual(mockTeamMember);
  });

  it('should delete a team member', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(true);
    const result = await controller.delete('1');
    expect(result).toEqual(true);
  });
});
