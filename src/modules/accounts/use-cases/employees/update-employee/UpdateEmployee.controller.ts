import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateEmployeeService } from './UpdateEmployee.service';

// ---------------------------------------------------------------------------------------------- //

export class UpdateEmployeeController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { name, lastName } = request.body;
    const { id } = request.employee;

    const updateEmployee = container.resolve(UpdateEmployeeService);

    await updateEmployee.execute({ id, name, lastName });

    return response.status(204).send();
  }
}
