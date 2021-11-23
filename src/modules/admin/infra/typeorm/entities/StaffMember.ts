import { Entity, OneToMany } from 'typeorm';

import { User } from '@accounts:entities/User';
import Video from '@lessons:entities/Video';

// ---------------------------------------------------------------------------------------------- //

@Entity()
class StaffMember extends User {
  // * ---- Foreign Keys ------------------------------------------------------------------------ //

  @OneToMany(() => Video, video => video.user)
  videos!: Video[];
}

export { StaffMember };
