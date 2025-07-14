import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entities';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find({ relations: { category: true } });
  }

  async findProductById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!product)
      throw new HttpException('Produto não encontrado.', HttpStatus.NOT_FOUND);
    return product;
  }

  async findAllByProduct(product: string): Promise<ProductEntity[]> {
    return await this.productRepository.find({
      where: {
        name: ILike(`%${product}%`),
      },
      relations: { category: true },
    });
  }

  async create(product: ProductEntity): Promise<ProductEntity> {
    return await this.productRepository.save(product);
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    await this.findProductById(product.id);
    return await this.productRepository.save(product);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findProductById(id);
    return await this.productRepository.delete(id);
  }
}
