import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto, GetAssignmentsDto, UpdateAssignmentDto } from '@contracts/lms/assignments.dto';

// In-memory store for POC purposes
const assignmentsStore: any[] = [];
let nextId = 1;

@Injectable()
export class AssignmentsService {
  findAll(query: GetAssignmentsDto) {
    let results = assignmentsStore.filter(
      (a) => a.classroomId === query.classroomId,
    );

    if (query.subjectId) {
      results = results.filter((a) => a.subjectId === query.subjectId);
    }

    if (query.search) {
      results = results.filter((a) =>
        a.title.toLowerCase().includes(query.search.toLowerCase()),
      );
    }

    const skip = query.skip ?? 0;
    const limit = query.limit ?? 10;

    return {
      data: results.slice(skip, skip + limit),
      total: results.length,
    };
  }

  findById(id: string) {
    const assignment = assignmentsStore.find((a) => a.id === parseInt(id));
    if (!assignment) {
      throw new Error(`Assignment with id ${id} not found`);
    }
    return assignment;
  }

  create(dto: CreateAssignmentDto) {
    const assignment = {
      id: nextId++,
      ...dto,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    assignmentsStore.push(assignment);
    return assignment;
  }

  update(id: string, dto: UpdateAssignmentDto) {
    const index = assignmentsStore.findIndex((a) => a.id === parseInt(id));
    if (index === -1) {
      throw new Error(`Assignment with id ${id} not found`);
    }
    assignmentsStore[index] = {
      ...assignmentsStore[index],
      ...dto,
      updatedAt: new Date(),
    };
    return assignmentsStore[index];
  }

  delete(id: string) {
    const index = assignmentsStore.findIndex((a) => a.id === parseInt(id));
    if (index === -1) {
      throw new Error(`Assignment with id ${id} not found`);
    }
    assignmentsStore.splice(index, 1);
    return { message: `Assignment ${id} deleted successfully` };
  }
}
