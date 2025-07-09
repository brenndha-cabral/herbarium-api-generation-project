import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { CategoryEntity } from '../entities/category.entities';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findCategoryById(id: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    });

    if (!category)
      throw new HttpException(
        'Categoria não encontrada.',
        HttpStatus.NOT_FOUND,
      );
    return category;
  }

  async findAllByCategory(category: string): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({
      where: {
        name: ILike(`%${category}%`),
      },
    });
  }

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    return await this.categoryRepository.save(category);
  }

  async update(category: CategoryEntity): Promise<CategoryEntity> {
    await this.findCategoryById(category.id);
    return await this.categoryRepository.save(category);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findCategoryById(id);
    return await this.categoryRepository.delete(id);
  }
}
