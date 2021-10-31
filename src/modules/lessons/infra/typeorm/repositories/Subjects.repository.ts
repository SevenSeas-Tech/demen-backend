import { getRepository, Repository } from 'typeorm';

import { CreateSubjectDto } from '@lessons:dtos/CreateSubject.dto';
import Subject from '@lessons:entities/Subject';
import ISubjectsRepository from '@lessons:irepos/ISubjects.repository';

// ---------------------------------------------------------------------------------------------- //

class SubjectsRepository implements ISubjectsRepository {
  private repository: Repository<Subject>;

  constructor() {
    this.repository = getRepository(Subject);
  }

  async create(data: CreateSubjectDto): Promise<Subject> {
    const { title, description } = data;

    const subject = this.repository.create({ title, description });

    return this.repository.save(subject);
  }
}

// ---------------------------------------------------------------------------------------------- //

export default SubjectsRepository;
