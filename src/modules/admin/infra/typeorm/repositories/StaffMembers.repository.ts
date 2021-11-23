import { getRepository, Repository } from 'typeorm';

import { CreateStaffMemberDto } from '@admin:dtos/users/CreateStaffMember.dto';
import { UpdateStaffMemberDto } from '@admin:dtos/users/UpdateStaffMember.dto';
import { StaffMember } from '@admin:entities/StaffMember';
import { IStaffMembersRepository } from '@admin:irepos/IStaffMembers.repository';

// ---------------------------------------------------------------------------------------------- //

class StaffMembersRepository implements IStaffMembersRepository {
  private repository: Repository<StaffMember>;

  constructor() {
    this.repository = getRepository(StaffMember);
  }

  async create(data: CreateStaffMemberDto): Promise<StaffMember> {
    const { username, name, lastName, email, password } = data;

    const user = this.repository.create({ username, name, lastName, email, password });

    await this.repository.save(user);

    return user;
  }

  async update(data: UpdateStaffMemberDto): Promise<StaffMember> {
    const { id, name, lastName } = data;

    const user = this.repository.create({ id, name, lastName });

    await this.repository.save(user);

    return user;
  }

  // *** ---- Find Methods ------------------------------------------------------------------ *** //

  async findAll(): Promise<StaffMember[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<StaffMember | undefined> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<StaffMember | undefined> {
    return this.repository.findOne({ email });
  }
}

export { StaffMembersRepository };
