import { Router } from 'express';

import { CreateEmployeeController } from '@accounts:use-cases/employees/create-employee/CreateEmployee.controller';
import { ShowEmployeeProfileController } from '@accounts:use-cases/employees/show-employee-profile/ShowEmployeeProfile.controller';
import { UpdateEmployeeController } from '@accounts:use-cases/employees/update-employee/UpdateEmployee.controller';
import { EmployeeAuthenticationMiddleware } from '@shared/infra/http/middlewares/EmployeeAuthentication.middleware';

// ---------------------------------------------------------------------------------------------- //

const employeesRouter = Router();

const employeeAuthenticationMiddleware = new EmployeeAuthenticationMiddleware();

const createEmployeeController = new CreateEmployeeController();
const showEmployeeProfileController = new ShowEmployeeProfileController();
const updateEmployeeController = new UpdateEmployeeController();

// ---------------------------------------------------------------------------------------------- //
employeesRouter.use(employeeAuthenticationMiddleware.execute);

employeesRouter.get('/profile', showEmployeeProfileController.execute);

employeesRouter.patch('/profile', updateEmployeeController.execute);

employeesRouter.post('/', createEmployeeController.execute);

// ---------------------------------------------------------------------------------------------- //

export { employeesRouter };
