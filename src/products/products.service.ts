import { Injectable, Inject, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const creation = await this.productRepository.save(createProductDto);
    if (!creation) {
      const errorResponse = {
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed to create product',
      };
      return errorResponse;
    }
    const response = {
      status: HttpStatus.CREATED,
      message: 'Product created successfully',
      creation,
    };
    return response;
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      const errorResponse = {
        status: HttpStatus.NOT_FOUND,
        message: `Product with id ${id} not found`,
      };
      return errorResponse;
    }
    const response = {
      status: HttpStatus.OK,
      message: 'Product found successfully',
      product,
    };
    return response;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      const errorResponse = {
        status: HttpStatus.NOT_FOUND,
        message: `Product with id ${id} not found`,
      };
      return errorResponse;
    }

    const updated = await this.productRepository.save({
      ...product,
      ...updateProductDto,
    });

    const response = {
      status: HttpStatus.OK,
      message: 'Product updated successfully',
      updated,
    };
    return response;
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      const errorResponse = {
        status: HttpStatus.NOT_FOUND,
        message: `Product with id ${id} not found`,
      };
      return errorResponse;
    }
    await this.productRepository.remove(product);

    const response = {
      status: HttpStatus.OK,
      message: `Product with id ${id} removed successfully`,
    };
    return response;
  }
}
