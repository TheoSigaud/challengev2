import { Controller, Post, Get, Inject, Param, Body, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('message')
export class MessageController {

  constructor(@Inject('MESSAGE_SERVICE') private client: ClientProxy) {}


  @Get('')
  test() {
    return this.client.send({ cmd: 'message_test' },{});
  }

  @Get('getPartiesConversation')
  getPartiesConversation(){
    return this.client.send({ cmd: 'message_getPartiesConversation' },{});
  }

  @Get('getAnnouncementsConversation')
  getAnnouncementsConversation(){
    return this.client.send({ cmd: 'message_getAnnouncementsConversation' },{});
  }

  @Get('getMessagesByConversation/:id')
  getMessagesByConversation(@Param('id') id: any){
    return this.client.send({ cmd: 'message_getMessagesByConversation' },id);
  }


  @Post('sendMessageParty')
  sendMessageParty(@Body() conversation:any){
    return this.client.send({ cmd: 'message_sendMessageParty' },conversation);
  }

  @Get('getLastConversation')
  getLastConversation(){
    return this.client.send({ cmd: 'message_getLastConversation' },{});
  }


  @Get('getConversationAnnouncement/:id')
  getConversationAnnouncement(@Param('id') id: any){
    return this.client.send({ cmd: 'message_getConversationAnnouncement' },id);
  }

  @Post('saveNewConversationAnnouncement')
  saveNewConversationAnnouncement(@Body() newConversation:any){
    return this.client.send({ cmd: 'message_saveNewConversationAnnouncement' }, newConversation);
  }

  @Get('getConversationParty/:id')
  getConversationParty(@Param('id') id: any){
    return this.client.send({ cmd: 'message_getConversationParty' },id);
  }

  @Post('saveNewConversationParty')
  saveNewConversationParty(@Body() newConversation:any){
    return this.client.send({ cmd: 'message_saveNewConversationParty' }, newConversation);
  }


}