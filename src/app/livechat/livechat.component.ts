
import { Component, OnInit } from '@angular/core';
import { ManageService } from 'app/primary/manage.service';
import { MessageService } from 'app/message.service';
import { PusherService } from 'app/pusher.service';
import { RegisterService } from 'app/register/register.service';

import { Message } from './message.modal';
import  {io} from 'socket.io-client';
import { Observable } from 'rxjs';
// const SOCKET_ENDPOINT = 'localhost:3000';
const SOCKET_ENDPOINT = 'http://31.220.59.174:7500';

@Component({
  selector: 'app-livechat',
  templateUrl: './livechat.component.html',
  styleUrls: ['./livechat.component.css']
})
export class LivechatComponent implements OnInit {

  user: string;
  messages: Message[];
  msgs:Message={};
  text:any;
  role: any;
  studentsList:any=[];
  TeacherList:any=[];
  stdlist:any=[];
  cssclass:any;
  activechat:any={};
  gender;
  conversion:any=[];
  uid:any;
  socket;
  constructor(
    private pusherService: PusherService,
    private messageService: MessageService,
    private registerService:RegisterService,
    private manageService: ManageService

  ) {
    this.role = localStorage.getItem('role');
    this.gender = localStorage.getItem('gender');
    this.uid = localStorage.getItem('UserId');

    this.activechat=null;
    this.getStdList();
      this.getStudent();
  }
  newMessage(text: string, user: string): void {
    this.messageService.send({msg: text, userid: user});
  }
  ngOnInit() {
    this.setupSocketConnection();
    this.messageService.messagesStream.subscribe(this.newMessageEventHandler.bind(this));
  }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    debugger
 }
  
  getStdList(){
    let data={
      role:'Admin'
    }
    this.manageService.getStdListNew(data).subscribe((data:any)=>{
      this.stdlist = data;
    })
  }
  getStudent(){
    if (this.role == 'Admin') {
      this.registerService.getAllStudentList().subscribe((data: any) => {
        this.studentsList = data;
      });
    }
    else if (this.role == 'Teacher') {
      this.registerService.getAllStudentListForTeacher(localStorage.getItem('UserId')).subscribe((data: any) => {
        this.studentsList = data;
        if(this.stdlist.length >0){
          this.studentsList.forEach(element => {
            this.stdlist.forEach(element1 => {
               if(element.standard == element1.id){
                 element.std = element1.stdname;
               }
            });
          });
        }
      });
    }
    else{
      
      this.registerService.GetTeacherForChat(localStorage.getItem('UserId')).subscribe((data:any)=>{
         this.TeacherList = data;
         

      })
    }
  }
  openChat(val){
    val.cssclass='active';
    this.activechat = val;
    if(this.role == 'Teacher'){
       this.getMessages().subscribe((message:any) => {
         debugger
      this.messages.push(message.data);
      this.msgs.msg='';
    });
      this.studentsList.forEach(element => {
        if(element.id != val.id){
          element.cssclass='';
        }
      });
    }else{
      this.getMessages().subscribe((message:any) => {
        this.messages.push(message.data);
        this.msgs.msg='';
      });
      this.TeacherList.forEach(element => {
        if(element.id != val.id){
          element.cssclass='';
        }
      });
    }
   
  }












  private newMessageEventHandler(event: Message): void {
    // this.messages.push(event);
  }
  sendmsg(){
    debugger
   this.msgs;
   this.msgs.sender = localStorage.getItem('UserId');
   this.msgs.receiver = this.activechat.id;
   this.socket = io(SOCKET_ENDPOINT);
   this.socket.emit('add-message', this.msgs);
  
   
    // this.messageService.send(this.msgs).subscribe((data:any)=>{
    //   this.conversion.push(data);
      
    //   this.messageService.receive(this.msgs).subscribe((data:any)=>{
    //     if(data.length>0){
    //       this.conversion.push(data[0]);
          
    //     }
       
    //   })
    // });

  }
  getMessages() {
    let data={
      sender:localStorage.getItem('UserId'),
      receiver:this.activechat.id
    }
    this.messageService.getmessages(data).subscribe((res:any)=>{
      this.messages = res;
      debugger
    })

    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data); 
      });
    })
    return observable;
  }


}
