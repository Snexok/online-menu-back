import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    let product = new Product();
    product = Object.assign(product, createProductDto);

    return this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const toUpdate = await this.productRepository.findOneBy({ id });

    console.log(updateProductDto);

    if (!toUpdate) return { status: 'not correct id' };

    return this.productRepository.save({ ...toUpdate, ...updateProductDto });
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
