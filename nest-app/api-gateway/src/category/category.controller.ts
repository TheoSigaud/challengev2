import { Controller, Post, Get, Inject, Param, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class CategoryController {

  constructor(@Inject('CATEGORY_SERVICE') private client: ClientProxy) {}


  @Get('categories')
  getCategories() {
    return this.client.send({ cmd: 'category_getCategories' },{});
  }

}