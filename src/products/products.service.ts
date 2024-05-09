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

  update(
    id: number,
    updateProductDto: UpdateProductDto,
    img: Express.Multer.File,
  ) {
    if (img) updateProductDto.img = img.filename;
    else delete updateProductDto.img;

    return this.productRepository.update({ id }, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.delete(id);
  }
}
