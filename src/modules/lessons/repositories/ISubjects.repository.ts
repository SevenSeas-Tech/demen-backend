import { CreateSubjectDto } from '@lessons:dtos/CreateSubject.dto';
import Subject from '@lessons:entities/Subject';

interface ISubjectsRepository {
  create(data: CreateSubjectDto): Promise<Subject>;
}

export default ISubjectsRepository;
