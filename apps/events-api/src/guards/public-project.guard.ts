import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectService } from '../project/project.service';

@Injectable()
export class PublicProjectGuard implements CanActivate {
  constructor(@Inject(ProjectService) private projectService: ProjectService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const projectId = request.params.projectId;
    if (!projectId) {
      throw new UnauthorizedException('Project ID is missing');
    }

    const project = await this.projectService.findOne(projectId);
    if (!project) {
      throw new UnauthorizedException('Project not found');
    }

    return true;
  }
}
