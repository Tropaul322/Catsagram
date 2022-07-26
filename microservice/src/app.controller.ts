import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('cat-created')
  async handleCatCreatedEvent(data: Record<string, unknown>) {
    console.log('Cat Created: ', data);
  }

  @EventPattern('cat-deleted')
  async handleCatDeletedEvent(data: Record<string, unknown>) {
    console.log('Cat Deleted: ', data);
  }
}
