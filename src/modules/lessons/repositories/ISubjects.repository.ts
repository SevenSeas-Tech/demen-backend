import { CreateSubjectDto } from '@lessons:dtos/subject/CreateSubject.dto';
import { Subject } from '@lessons:entities/Subject';
import { Uuid } from '@shared/@types/Uuid';

export interface ISubjectsRepository {
  create(data: CreateSubjectDto): Promise<Subject>;
  findById(id: Uuid): Promise<Subject | undefined>;
}
