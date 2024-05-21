import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TeamMemberService } from './team-member.service';
import { TeamMember } from './team-member.schema';
import { Model } from 'mongoose';

const mockTeamMember = {
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '1234567890',
  email: 'john.doe@example.com',
  role: 'user',
};

const mockTeamMemberDoc = (mock?: Partial<TeamMember>): Partial<TeamMember> => ({
  id: '1',
  ...mock,
});

const updatedTeamMemberDoc = (mock?: Partial<TeamMember>): Partial<TeamMember> => ({
  id: '1',
  ...mock,
  firstName: 'Johnny'
});

const teamMemberArray = [
  mockTeamMemberDoc(),
  mockTeamMemberDoc({ firstName: 'Jane', lastName: 'Doe' }),
];

const mockTeamMemberModel = {
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(teamMemberArray)
  }),
  create: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockTeamMemberDoc())
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(updatedTeamMemberDoc())
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(true)
  }),
};

describe('TeamMemberService', () => {
  let service: TeamMemberService;
  let model: Model<TeamMember>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamMemberService,
        {
          provide: getModelToken(TeamMember.name),
          useValue: mockTeamMemberModel
        },
      ],
    }).compile();

    service = module.get<TeamMemberService>(TeamMemberService);
    model = module.get<Model<TeamMember>>(getModelToken(TeamMember.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all team members', async () => {
    const teamMembers = await service.findAll();
    expect(teamMembers).toEqual(teamMemberArray);
  });

  it('should update a team member', async () => {
    const updatedTeamMember = await service.update('1', { firstName: 'Johnny' });
    expect(updatedTeamMember).toEqual(mockTeamMemberDoc({ firstName: 'Johnny' }));
  });

  it('should delete a team member', async () => {
    const result = await service.delete('1');
    expect(result).toEqual(true);
  });
});
