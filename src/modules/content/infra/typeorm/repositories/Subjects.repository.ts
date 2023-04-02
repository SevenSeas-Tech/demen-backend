import { getRepository, Repository } from 'typeorm';

import { CreateSubjectDto } from '@lessons:dtos/subject/CreateSubject.dto';
import { Subject } from '@lessons:entities/Subject';
import { ISubjectsRepository } from '@lessons:irepos/ISubjects.repository';

// ---------------------------------------------------------------------------------------------- //

export class SubjectsRepository implements ISubjectsRepository {
  private repository: Repository<Subject>;

  constructor() {
    this.repository = getRepository(Subject);
  }

  async create(data: CreateSubjectDto): Promise<Subject> {
    const { title, description } = data;

    const subject = this.repository.create({ title, description });

    return this.repository.save(subject);
  }

  async findById(id: string): Promise<Subject | undefined> {
    const subject = await this.repository.findOne(id);

    return subject;
  }
}
