import { Injectable } from '@nestjs/common';
import { CreateQuizDto, GetQuizzesDto } from '@contracts/lms/quizzes.dto';

// In-memory store for POC purposes
const quizzesStore: any[] = [];
let nextId = 1;

@Injectable()
export class QuizzesService {
  findAll(query: GetQuizzesDto) {
    let results = quizzesStore.filter(
      (q) => q.classroomId === query.classroomId,
    );

    if (query.subjectId) {
      results = results.filter((q) => q.subjectId === query.subjectId);
    }

    if (query.search) {
      results = results.filter((q) =>
        q.title.toLowerCase().includes(query.search.toLowerCase()),
      );
    }

    const skip = query.skip ?? 0;
    const limit = query.limit ?? 10;

    return {
      data: results.slice(skip, skip + limit),
      total: results.length,
    };
  }

  create(dto: CreateQuizDto) {
    const quiz = {
      id: nextId++,
      ...dto,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    quizzesStore.push(quiz);
    return quiz;
  }
}
