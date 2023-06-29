import { Controller, Get, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { RpcValidationFilter } from './filters/rpc-exception.filter';
import { Conversation } from './dto/conversation.dto';
import { newConversationAnnouncement } from './dto/newConversationAnnouncement.dto';
import { newConversationParty } from './dto/newConversationParty.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'message_test' })
  test() {
    return this.appService.test();
  }

  @MessagePattern({ cmd: 'message_getAnnouncementsConversation' })
  getAnnouncementsConversation(){
    return this.appService.getAnnouncementsConversation();
  }


  @MessagePattern({ cmd: 'message_getPartiesConversation' })
  getPartiesConversation() {
    return this.appService.getPartiesConversation();
  }x

  @MessagePattern({ cmd: 'message_getMessagesByConversation' })
  getMessagesByConversation(id:string) {
    return this.appService.getMessagesByConversation(id);
  }


  @MessagePattern({ cmd: 'message_sendMessageParty' })
  @UsePipes(ValidationPipe)
  @UseFilters(new RpcValidationFilter())
  sendMessageParty(conversation: Conversation) {
   
    return this.appService.sendMessageParty(conversation);
  }

  @MessagePattern({ cmd: 'message_getLastConversation' })
  getLastConversation(){
    return this.appService.getLastConversation();
  }

  @MessagePattern({ cmd: 'message_getConversationAnnouncement' })
  getConversationAnnouncement(id:string){
    return this.appService.getConversationAnnouncement(id);
  }


  @MessagePattern({ cmd: 'message_saveNewConversationAnnouncement' })
  @UsePipes(ValidationPipe)
  @UseFilters(new RpcValidationFilter())
  saveNewConversationAnnouncement(newConversation:newConversationAnnouncement){
    return this.appService.saveNewConversationAnnouncement(newConversation);
  }


  @MessagePattern({ cmd: 'message_getConversationParty' })
  getConversationParty(id:string){
    return this.appService.getConversationParty(id);
  }


  @MessagePattern({ cmd: 'message_saveNewConversationParty' })
  @UsePipes(ValidationPipe)
  @UseFilters(new RpcValidationFilter())
  saveNewConversationParty(newConversation:newConversationParty){
    return this.appService.saveNewConversationParty(newConversation);
  }
}