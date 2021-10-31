import { v4 as uuid } from 'uuid';

import { CreateSubjectDto } from '@lessons:dtos/CreateSubject.dto';
import Subject from '@lessons:entities/Subject';
import ISubjectsRepository from '@lessons:irepos/ISubjects.repository';

// ---------------------------------------------------------------------------------------------- //

class FakeSubjectsRepository implements ISubjectsRepository {
  private subjects: Subject[] = [];

  async create(data: CreateSubjectDto): Promise<Subject> {
    const { title, description } = data;

    const subject = new Subject();
    const date = new Date();

    Object.assign(subject, {
      id: uuid(),
      title,
      description,
      createdAt: date,
      updatedAt: date
    });

    this.subjects.push(subject);

    return subject;
  }

  async findById(id: string): Promise<Subject | undefined> {
    return this.subjects.find(subject => subject.id === id);
  }
}

// ---------------------------------------------------------------------------------------------- //

export default FakeSubjectsRepository;
