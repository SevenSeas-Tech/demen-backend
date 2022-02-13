import { Employee } from '@accounts:entities/Employee';
import { FakeEmployeesRepository } from '@accounts:irepos/fake/FakeEmployees.repository';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { FakeValidationProvider } from '@shared:providers/validation-provider/FakeValidation.provider';
import { IValidationProvider } from '@shared:providers/validation-provider/IValidation.provider';

import { UpdateEmployeeService } from '../UpdateEmployee.service';

// ---------------------------------------------------------------------------------------------- //

describe('Update Employee Service', () => {
  const email = 'foobar@example.com';
  const username = 'foobar';
  const password = 'Password12';
  const phone = '99 99999 9999';
  const name = 'foo';
  const lastName = 'bar';
  const newName = 'foot';
  const newLastName = 'barr';

  let employeesRepository: IEmployeesRepository;
  let validationProvider: IValidationProvider;
  let updateEmployee: UpdateEmployeeService;
  let employee: Employee;

  // -------------------------------------------------------------------------------------------- //

  beforeEach(async () => {
    employeesRepository = new FakeEmployeesRepository();
    validationProvider = new FakeValidationProvider();

    updateEmployee = new UpdateEmployeeService(employeesRepository, validationProvider);

    employee = await employeesRepository.create({
      username,
      password,
      phone,
      name,
      lastName,
      email
    });
  });

  // -------------------------------------------------------------------------------------------- //

  it('should update employee name', async () => {
    const validateData = jest.spyOn(validationProvider, 'validateEmployeeUpdateData');

    await updateEmployee.execute({ id: employee.id, name: newName, lastName });

    const updatedEmployee = await employeesRepository.findById(employee.id);

    expect(updatedEmployee?.name).toEqual(newName);

    expect(updatedEmployee?.lastName).toEqual(lastName);

    expect(validateData).toBeCalled();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should update employee last name', async () => {
    const validateData = jest.spyOn(validationProvider, 'validateEmployeeUpdateData');

    await updateEmployee.execute({ id: employee.id, name, lastName: newLastName });

    const updatedEmployee = await employeesRepository.findById(employee.id);

    expect(updatedEmployee?.name).toEqual(name);
    expect(updatedEmployee?.lastName).toEqual(newLastName);

    expect(validateData).toBeCalled();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should update employee without spaces in names', async () => {
    await updateEmployee.execute({
      id: employee.id,
      name: ' foot ',
      lastName: ' barr '
    });

    const updatedEmployee = await employeesRepository.findById(employee.id);

    expect(updatedEmployee?.name).toEqual(newName);
    expect(updatedEmployee?.lastName).toEqual(newLastName);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should update employee with lower letters only in names', async () => {
    await updateEmployee.execute({
      id: employee.id,
      name: 'Foot',
      lastName: 'Barr'
    });

    const updatedEmployee = await employeesRepository.findById(employee.id);

    expect(updatedEmployee?.name).toEqual(newName);
    expect(updatedEmployee?.lastName).toEqual(newLastName);
  });
});
