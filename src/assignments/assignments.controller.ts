import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CreateAssignmentDto, GetAssignmentsDto } from '@contracts/lms/assignments.dto';
import { MessagePattern } from '../shared.config';
import { AssignmentsService } from './assignments.service';

@Controller()
export class AssignmentsController {
  constructor(private readonly service: AssignmentsService) {}

  /**
   * GET /assignments?classroomId=1&subjectId=2
   * Pattern: { service: 'lms', cmd: 'assignments', action: 'find-all' }
   */
  @MessagePattern({ cmd: 'assignments', action: 'find-all' })
  findAll(@Payload() data: { query: GetAssignmentsDto }) {
    return this.service.findAll(data.query);
  }

  /**
   * POST /assignments
   * Pattern: { service: 'lms', cmd: 'assignments', action: 'create' }
   */
  @MessagePattern({ cmd: 'assignments', action: 'create' })
  create(@Payload() data: { body: CreateAssignmentDto }) {
    return this.service.create(data.body);
  }
}
