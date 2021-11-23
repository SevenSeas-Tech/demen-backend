import { Entity } from 'typeorm';

import { User } from '@accounts:entities/User';

// ---------------------------------------------------------------------------------------------- //

@Entity()
class Student extends User {}

export { Student };
