import { Controller, Param, Sse } from '@nestjs/common';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Sse(':event')
  sse(@Param('event') event: string) {
    return this.catService.subscribe(event);
  }
}
