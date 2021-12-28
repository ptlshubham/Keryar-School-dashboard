import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import PerfectScrollbar from "perfect-scrollbar";
import { Router } from "@angular/router";
import { ApiService } from "app/api.service";
import { CalendarService } from "./calendar.service";
import { CalendarEvents } from "./calendar.model";
import { CalendarOptions } from "@fullcalendar/angular";
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { RegisterService } from "app/register/register.service";
import { ManageService } from "app/primary/manage.service";
declare var $: any;
const colors: any = {
  red: {
    primary: "#ad2121",
    secondary: "#FAE3E3",
  },
  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF",
  },
  yellow: {
    primary: "#e3bc08",
    secondary: "#FDF1BA",
  },
};

@Component({
  moduleId: module.id,
  selector: "calendar-cmp",
  templateUrl: "calendar.component.html",
})
export class CalendarComponent implements OnInit {
  eventSave: any;
  selected: any;
  public calendarModel: CalendarEvents = new CalendarEvents;
  public eventList: CalendarEvents[] = [];
  posts = [];
  reg:any=[];
  STD:any=[];
  stdData: any = [];
  teachData:any=[];
  selstd:any=[];
  selteach:any=[]
  selectStdsList:any=[];
  selectedTeahcList:any=[];
  stdId:any;
  dropdownSettings = {};
  public eventColor: string = '#c00f26';
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: true,
    // timeZone: 'Indian',
    weekends: true,
    // editable: true,
    plugins: [interactionPlugin],
    // droppable: false,
    dateClick: this.handleDateClick.bind(this), // bind is important!,
    events: [],
    eventColor: '#c00f26'
  };
 

  constructor(
    private calenderService: CalendarService,
    private router: Router,
    private apiService: ApiService,
    private registerService:RegisterService,
    private manageService:ManageService
  ) {
    // this.dropdownSettings = { 
    //   singleSelection: false, 
    //   text:"Select Countries",
    //   selectAllText:'Select All',
    //   unSelectAllText:'UnSelect All',
    //   enableSearchFilter: false,
    //   classes:"custom-class",
     
    // };   
  }
  ngOnInit() {
    this.getEventDetails();
    this.getStdList();
    this.getTeacher();
  }
  handleDateClick(arg) {
    this.selected = arg.dateStr;

  }
  getTeacher() {
   
      this.registerService.getTeacherList().subscribe((data: any) => {
        this.reg = data;
        
        this.reg.forEach(element => {
          let data = {
            itemName: element.firstname +' '+element.lastname,
            id: element.id,
          }
    
          this.teachData.push(data);
        });
      });
  }
  getStdList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.STD = data;
      this.STD.forEach(element => {
        let data = {
          itemName: element.stdname,
          id: element.id,
        }
        this.stdData.push(data);
      });
    });
  }
 
  onItemSelect($event) {
    let data = {
      selStds: $event.itemName,
      stdid: $event.id, 
    }
    this.selectStdsList.push(data);
  
  }
  onItemSelectTeach($event){
    let data = {
      selteach: $event.itemName,
      teachid: $event.id, 
    }
    this.selectedTeahcList.push(data);
  }
  onSelectAll(){
    this.stdData.forEach(element => {
      let data = {
        selteach: element.itemName,
        teachid: element.id, 
      }
      this.selectStdsList.push(data);
    });
  }
  onSelectAllTeach(){
    this.teachData.forEach(element => {
      let data = {
        selteach: element.itemName,
        teachid: element.id, 
      }
      this.selectedTeahcList.push(data);
    });
  }
  OnItemDeSelect(item: any) {
    for (let i = 0; i < this.selectStdsList.length; i++) {
      if (this.selectStdsList[i].stdid == item.id) {
        this.selectStdsList.splice(i, 1);
      }
    }
  }
  OnItemDeSelectTeach(item){
    for (let i = 0; i < this.selectedTeahcList.length; i++) {
      if (this.selectedTeahcList[i].stdid == item.id) {
        this.selectedTeahcList.splice(i, 1);
      }
    }
  }
  onDeSelectAll(){
    this.selectStdsList=[];
  }
  onDeSelectAllTeach(){
    this.selectedTeahcList =[];
  }
  addEventsDetails() {
    this.calendarModel.date = this.selected;
    this.calendarModel.active = true;
    if(this.selectedTeahcList.length >0 || this.selectStdsList.length >0){
      debugger
      this.calendarModel.teachlist= this.selectedTeahcList;
      this.calendarModel.stdlist=this.selectStdsList;
      this.calenderService.saveEventsList(this.calendarModel).subscribe((data: any) => {
        debugger
        this.apiService.showNotification('top', 'right', 'Event Added Successfully.', 'success');
        location.reload();
        //  this.getEventDetails();
  
      })
    }
    else{
      this.apiService.showNotification('top', 'right', 'Please Select Standard  Or Teachers for add event', 'danger');
    }
  
    
     
   
  }
  getEventDetails() {
    this.calenderService.geteventList().subscribe((data: any) => {

      this.calendarOptions.events = data;
      this.eventList = data;
      for (let i = 0; i < this.eventList.length; i++) {
        this.eventList[i].index = i + 1;
      }



    })
  }
  deleteEventList(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete!",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Yes',
      buttonsStyling: false
    }).then((result) => {
      if (result.value == true) {
        this.calenderService.removeEventData(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Event removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your Event has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getEventDetails();
      }
    })

  }
}
