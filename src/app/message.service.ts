import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/Rx';
import { PusherService } from './pusher.service';

import { Message } from './livechat/message.modal';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MessageService {
  messagesStream = new ReplaySubject<Message>(1);

  constructor(
    private pusherService: PusherService,
    private apiService:ApiService,
    private httpClient: HttpClient
  ) {
    this.initialize();
  }

  initialize() {
    this.pusherService.messagesChannel.bind('client-new-message', (message) => {
      this.emitNewMessage(message);
    });
  }

  send(message: Message) {
    this.pusherService.messagesChannel.trigger('client-new-message', message);
    this.emitNewMessage(message);
    return this.httpClient.post(ApiService.SendMessageURL,message);
    
  }
  receive(message:Message){
    return this.httpClient.post(ApiService.GetMessageURL,message);
  }
  getmessages(data){
    return this.httpClient.post(ApiService.GetMessageURL,data);
  }

  emitNewMessage(message: Message) {
    debugger
    this.messagesStream.next(message);
    debugger
  }

}
