import { v4 as uuid } from 'uuid';

import { CreateEmployeeDto } from '@accounts:dtos/users/CreateEmployee.dto';
import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import { Employee } from '@accounts:entities/Employee';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';

// ---------------------------------------------------------------------------------------------- //

class FakeEmployeesRepository implements IEmployeesRepository {
  private employees: Employee[] = [];

  async create(data: CreateEmployeeDto): Promise<Employee> {
    const { username, name, lastName, email, password, phone } = data;
    const employee = new Employee();

    Object.assign(employee, {
      id: uuid(),
      username,
      // admin: false,
      name,
      lastName,
      email,
      password,
      phone,
      // verified: false,
      videos: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    });

    this.employees.push(employee);

    return employee;
  }

  // -------------------------------------------------------------------------------------------- //

  async findAll(): Promise<Employee[]> {
    return this.employees;
  }

  // -------------------------------------------------------------------------------------------- //

  async findById(id: string): Promise<Employee | undefined> {
    return this.employees.find(employee => employee.id === id);
  }

  // -------------------------------------------------------------------------------------------- //

  async findByEmail(email: string): Promise<Employee | undefined> {
    return this.employees.find(employee => employee.email === email);
  }

  // -------------------------------------------------------------------------------------------- //

  async findByUsername(username: string): Promise<Employee | undefined> {
    return this.employees.find(employee => employee.username === username);
  }

  // -------------------------------------------------------------------------------------------- //

  async update(data: UpdateUserDto): Promise<Employee> {
    const { id, name, lastName } = data;
    const index = this.employees.findIndex(employee => employee.id === id);

    this.employees[index].name = name;
    this.employees[index].lastName = lastName;
    this.employees[index].updatedAt = new Date();

    return this.employees[index];
  }
}

export { FakeEmployeesRepository };
