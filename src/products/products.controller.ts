import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Roles } from 'src/iam/authorization/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  @Auth(AuthType.Bearer)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: 'public',
        filename: (req, file, cb) => {
          cb(null, `${uuidv4()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  create(
    @UploadedFile() img: Express.Multer.File,
    @Body()
    createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto, img);
  }

  @Patch(':id')
  @Auth(AuthType.Bearer)
  @Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: 'public',
        filename: (req, file, cb) => {
          cb(null, `${uuidv4()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @UploadedFile() img: Express.Multer.File,
    @Body()
    updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto, img);
  }

  @Delete(':id')
  @Auth(AuthType.Bearer)
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
