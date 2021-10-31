import { CreateSubjectDto } from '@lessons:dtos/CreateSubject.dto';
import Subject from '@lessons:entities/Subject';
import { Uuid } from '@shared/@types/Uuid';

interface ISubjectsRepository {
  create(data: CreateSubjectDto): Promise<Subject>;
  findById(id: Uuid): Promise<Subject | undefined>;
}

export default ISubjectsRepository;
