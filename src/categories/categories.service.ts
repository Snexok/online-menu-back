import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto, img: Express.Multer.File) {
    let category = new Category();
    category = Object.assign(category, createCategoryDto);
    if (img) category.img = img.filename;

    return this.categoryRepository.save(category);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOneBy({ id });
  }

  update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    img: Express.Multer.File,
  ) {
    if (img) updateCategoryDto.img = img.filename;
    else delete updateCategoryDto.img;

    return this.categoryRepository.update({ id }, updateCategoryDto);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }
}
