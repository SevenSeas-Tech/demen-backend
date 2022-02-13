import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEmployeeService } from './CreateEmployee.service';

// ---------------------------------------------------------------------------------------------- //
class CreateEmployeeController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { username, name, lastName, email, phone, password } = request.body;

    const createEmployeeService = container.resolve(CreateEmployeeService);

    const employee = createEmployeeService.execute({
      username,
      email,
      name,
      lastName,
      phone,
      password
    });

    return response.status(201).json(employee);
  }
}

export { CreateEmployeeController };
