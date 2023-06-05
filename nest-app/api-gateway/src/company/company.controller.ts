import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('company')
export class CompanyController {

  constructor(@Inject('COMPANY_SERVICE') private client: ClientProxy) {}


  @Get('')
  test() {
    return this.client.send({ cmd: 'test' },{});
  }


}