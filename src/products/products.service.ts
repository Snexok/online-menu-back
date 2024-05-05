import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

export enum ResponseStatus {
  NotCorrectId = 'Not correct id',
}

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto, img: Express.Multer.File) {
    let product = new Product();
    product = Object.assign(product, createProductDto);
    product.img = img.filename;

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

    if (!toUpdate) return { status: ResponseStatus.NotCorrectId };

    return this.productRepository.save({ ...toUpdate, ...updateProductDto });
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
