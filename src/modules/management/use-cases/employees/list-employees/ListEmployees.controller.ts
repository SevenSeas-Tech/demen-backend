import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListEmployeesService } from './ListEmployees.service';

// ---------------------------------------------------------------------------------------------- //
export class ListEmployeesController {
  async execute(_: Request, response: Response): Promise<Response> {
    const listEmployees = container.resolve(ListEmployeesService);
    const employees = await listEmployees.execute();

    return response.status(201).json(employees);
  }
}
