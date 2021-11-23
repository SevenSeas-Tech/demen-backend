import { Email } from '@accounts:types/users/User';
import { CreateStaffMemberDto } from '@admin:dtos/users/CreateStaffMember.dto';
import { UpdateStaffMemberDto } from '@admin:dtos/users/UpdateStaffMember.dto';
import { StaffMember } from '@admin:entities/StaffMember';
import { Uuid } from '@shared/@types/Uuid';

// ---------------------------------------------------------------------------------------------- //

export interface IStaffMembersRepository {
  create(data: CreateStaffMemberDto): Promise<StaffMember>;
  findAll(): Promise<StaffMember[]>;
  findById(id: Uuid): Promise<StaffMember | undefined>;
  findByEmail(email: Email): Promise<StaffMember | undefined>;
  update(data: UpdateStaffMemberDto): Promise<StaffMember>;
}
