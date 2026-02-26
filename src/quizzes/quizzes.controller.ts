import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CreateQuizDto, GetQuizzesDto } from '@contracts/lms/quizzes.dto';
import { MessagePattern } from '../shared.config';
import { QuizzesService } from './quizzes.service';

@Controller()
export class QuizzesController {
  constructor(private readonly service: QuizzesService) {}

  /**
   * GET /quizzes?classroomId=1
   * Pattern: { service: 'lms', cmd: 'quizzes', action: 'find-all' }
   */
  @MessagePattern({ cmd: 'quizzes', action: 'find-all' })
  findAll(@Payload() data: { query: GetQuizzesDto }) {
    return this.service.findAll(data.query);
  }

  /**
   * POST /quizzes
   * Pattern: { service: 'lms', cmd: 'quizzes', action: 'create' }
   */
  @MessagePattern({ cmd: 'quizzes', action: 'create' })
  create(@Payload() data: { body: CreateQuizDto }) {
    return this.service.create(data.body);
  }
}
