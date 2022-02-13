import { getRepository, Repository } from 'typeorm';

import { CreateEmployeeDto } from '@accounts:dtos/employees/CreateEmployee.dto';
import { UpdateEmployeeDto } from '@accounts:dtos/employees/UpdateEmployee.dto';
import { Employee } from '@accounts:entities/Employee';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';

// ---------------------------------------------------------------------------------------------- //

export class EmployeesRepository implements IEmployeesRepository {
  private repository: Repository<Employee>;

  constructor() {
    this.repository = getRepository(Employee);
  }

  // -------------------------------------------------------------------------------------------- //

  async create(data: CreateEmployeeDto): Promise<Employee> {
    const { username, name, lastName, email, password } = data;
    const user = this.repository.create({ username, name, lastName, email, password });

    await this.repository.save(user);

    return user;
  }

  // -------------------------------------------------------------------------------------------- //

  async update(data: UpdateEmployeeDto): Promise<Employee> {
    const { id, name, lastName } = data;

    const user = this.repository.create({ id, name, lastName });

    await this.repository.save(user);

    return user;
  }

  // *** ----------------------- Find Methods ----------------------------------------------- *** //

  async findAll(): Promise<Employee[]> {
    return this.repository.find();
  }

  // -------------------------------------------------------------------------------------------- //

  async findById(id: string): Promise<Employee | undefined> {
    return this.repository.findOne(id);
  }

  async findByEmail(email: string): Promise<Employee | undefined> {
    return this.repository.findOne({ email });
  }

  async findByUsername(username: string): Promise<Employee | undefined> {
    return this.repository.findOne({ username });
  }
}
