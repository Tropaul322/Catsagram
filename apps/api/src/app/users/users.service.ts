import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput);
    const createdUser = await this.userRepository.save(newUser);

    return createdUser;
  }

  async findAll() {
    return this.userRepository.find({});
  }

  async findOne(email: string) {
    return this.userRepository.findOne({ email });
  }
}
