import { CreateCatInput } from './inputs/create-cat.input';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatEntity } from './entities/cat.entity';
import { ClientProxy } from '@nestjs/microservices';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';

@Injectable()
export class CatService {
  constructor(
    @Inject('CAT_SERVICE') private readonly client: ClientProxy,
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>, // private readonly notificationsService: NotificationsService,
  ) {}
  private readonly emitter = new EventEmitter();

  subscribe() {
    return fromEvent(this.emitter, 'notification');
  }

  async emit(data) {
    await this.emitter.emit('notification', { data });
  }

  async createCat(cat: CreateCatInput): Promise<CatEntity> {
    const newCat = this.catRepository.create(cat);
    const createdCat = await this.catRepository.save(newCat);
    await this.client.emit('cat-created', createdCat);
    await this.emit({ message: 'Cat created', key: ['cats'] });

    return createdCat;
  }

  async findAll(): Promise<CatEntity[]> {
    const cats = await this.catRepository.find({});
    return cats.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  }

  async like(id: number): Promise<CatEntity> {
    const cat = await this.catRepository.findOne(id);
    cat.likes++;
    await this.catRepository.save(cat);
    await this.emit({ message: `Cat liked: ${id}`, key: ['cats'] });
    return cat;
  }

  async findOne(id: number): Promise<CatEntity> {
    const cat = await this.catRepository.findOne(id);
    return cat;
  }

  async delete(id: number): Promise<number> {
    const cat = await this.catRepository.findOne(id);
    await this.catRepository.remove(cat);
    await this.client.emit('cat-deleted', cat);
    await this.emit({ message: `Cat deleted: ${id}`, key: ['cats'] });

    return id;
  }

  //--------Comments--------//
}
