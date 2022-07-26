import { Controller, Sse } from '@nestjs/common';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Sse('notifications')
  sse() {
    return this.catService.subscribe();
  }
}
