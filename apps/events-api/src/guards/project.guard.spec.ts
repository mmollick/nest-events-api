import { PublicProjectGuard } from './public-project.guard';

describe('ProjectGuard', () => {
  it('should be defined', () => {
    expect(new PublicProjectGuard()).toBeDefined();
  });
});
