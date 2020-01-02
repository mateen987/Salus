import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef, OnInit, ChangeDetectorRef} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import { Title } from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import{UserService} from '../../services/user.service'
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};
@Component({
  selector: 'app-daily-task',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.css']
})

export class DailyTaskComponent implements OnInit{
  // @ViewChild('ref',{static:false}) ref:any;
  dailyData:any;
  dailyPoint:any;
  user_id:any;
  point=0;
  points="hell"
test:any[]=[]
  
  exercise:boolean=false;
  hydrate:boolean=false;
  nutrition:boolean=false;
  sleep:boolean=false;
  reflect:boolean=false;
  wellBeing:boolean=false;
  selectedDate:any;
  data:{};
  userPoints:any;
  resData:any;
  mateen=0;
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  viewTitle:"Hello";
  modalData: {
    action: string;
    event: CalendarEvent;
  
  };


  CalendarEvent:any[]=[{start:"2019-12-12",title:"okay sir"}]
  actions: CalendarEventAction[] = [
    
    // {
    //   label: '<i class="fa fa-fw fa-pencil"></i>',
    //   a11yLabel: 'Edit',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.handleEvent('Edited', event);

    //   }
    // },
    // {
    //   label: '<i class="fa fa-fw fa-times"></i>',
    //   a11yLabel: 'Delete',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.events = this.events.filter(iEvent => iEvent !== event);
    //     this.handleEvent('Deleted', event);
    //   }
    // }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
   
    // {
    //   start: startOfDay(new Date("2019-12-5")),
    //   title: 'A 3 day event',
    //   color: colors.red,
      
    //  meta:{
    //    point: 10
    //  }
      
    // },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'An event with no end date',
    //   color: colors.yellow,
    //   actions: this.actions,
      
    //   meta:{
    //     point: 10
    //   }
      
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    //   meta:{
    //     point: 10
    //   }
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }
  ];

  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal ,private service:UserService,private ref: ChangeDetectorRef,
    private _formBuilder:FormBuilder,private datenow:DatePipe) {

  }

  open( content, day) {
    this.selectedDate = day.date;
    this.modal.open(content , { centered: true,size:"lg" });
    // this.data={
    //   exercise:this.exercise,
    //   hydrate:this.hydrate,
    //   nutrition:this.nutrition,
    //   sleep:this.sleep,
    //   reflect:this.reflect,
    //   wellBeing:this.wellBeing,
    //   user_id:localStorage.getItem('userid'),
    //   date: this.datenow.transform(this.selectedDate,"yyyy-MM-dd")
    // }
    // console.log("checking "+this.selectedDate)
    // console.log("checking "+this.data["date"])
  }
ngOnInit()
{
  this.user_id=localStorage.getItem('userid');
  this.getPoint();
this.getdata();
  this.setView(CalendarView.Month); 
  
}
getPoint(){
  this.service.userPoint(this.user_id).subscribe(res=>{
    this.userPoints=res;
    this.userPoints=this.userPoints.points;
    console.log(this.userPoints)
  })
}

  dayClicked(day:any): void {
    
   this.selectedDate=day.day.date;
   console.log(day.day.date);
    // if (isSameMonth(day.date, this.viewDate)) {
    //   if (
    //     (isSameDay(this.viewDate, day.date) && this.activeDayIsOpen === true) ||
    //     events.length === 0
    //   ) {
    //     this.activeDayIsOpen = false;
    //   } else {
    //     this.activeDayIsOpen = true;
    //   }
    //   this.viewDate = date;
   // }
  }
ngAfterViewChecked(){
  this.refresh.next();
  this.setView(CalendarView.Month); 
}
  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
    
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
   
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
         draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
    
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

 getdata(){
   this.service.dailytasks(this.user_id).subscribe(res =>{
      this.dailyData =res;    
       
      console.log(this.dailyData)
       for( var i=1 ; i < 32; i++ ){
         
         var data= this.dailyData[i].taskArray
         if(data.wellBeing !==null){
           this.point++
         }if(data.nutrition !== null){
           this.point++
         }if(data.hydrate !== null){
           this.point++
         }if(data.exercise !== null){
           this.point++
       console.log("ok",this.point)
         }if(data.sleep !== null){
           this.point++
         }if(data.reflect !== null){
           this.point++
         }
        //  console.log(data,this.point);
         this.dailyPoint=this.point;
        //  console.log(this.dailyPoint);
        this.test.push(this.dailyPoint)
        // console.log("test"+this.test)
         this.point=0;
       }
      
     
     this.refresh.next(); 
     this.ref.detectChanges();
   })
 }

 testMethod($event){
  //  console.log($event)
 }
submit(){
  this.data={
    exercise:this.exercise,
    hydrate:this.hydrate,
    nutrition:this.nutrition,
    sleep:this.sleep,
    reflect:this.reflect,
    wellBeing:this.wellBeing,
    user_id:localStorage.getItem('userid'),
    date: this.datenow.transform(this.selectedDate,"yyyy-MM-dd")
  }
  // console.log(this.data);
  //  console.log("date"+this.selectedDate)
this.service.dailytaskpost(this.data).subscribe(res=>{
  // console.log("data  here "+this.data);
  this.resData=res;
  // console.log(this.resData)
  this.getdata();
  this.refresh.next();
  this.modal.dismissAll();
})



}
}
