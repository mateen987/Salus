import {Component,ChangeDetectionStrategy,ViewChild,TemplateRef,ViewEncapsulation, OnInit, ChangeDetectorRef} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,subMonths,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Subject, from } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarMonthViewDay,CalendarEventTimesChangedEvent,CalendarView} from 'angular-calendar';
import { Title } from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import{UserService} from '../../services/user.service'
import { FormBuilder, FormGroup, FormControl,FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { window } from 'rxjs/operators';


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
  styleUrls: ['./daily-task.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class DailyTaskComponent implements OnInit{
  // @ViewChild('ref',{static:false}) ref:any;
  dailyData:any;
  dailyPoint:any;
  user_id:any;
  point=0;
  points="hell"
  test:any[]=[]
  userCalendar:any[]=[]
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


  minDate: Date = subMonths(new Date(), 1);

  maxDate: Date = new Date();



  viewTitle:"Hello";
  modalData: {
    action: string;
    event: CalendarEvent;
  
  };


  CalendarEvent:any[]=[{start:"2019-12-12",title:"okay sir"}]
  actions: CalendarEventAction[] = [];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal ,private service:UserService,private ref: ChangeDetectorRef,
    private _formBuilder:FormBuilder,private datenow:DatePipe,private router: Router) {

      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

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

dateIsValid(date: Date): boolean {
  return date >= this.minDate && date <= this.maxDate;
}
beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
  body.forEach(day => {
    if (!this.dateIsValid(day.date)) {
      day.cssClass = 'cal-disabled';
    }
  });
}

getPoint(){
  this.service.userPoint(this.user_id).subscribe(res=>{
    this.userPoints=res;
    this.userPoints=this.userPoints.month;
    console.log(this.userPoints)
    //this.ref.detectChanges();
  })
}

  dayClicked(day:any): void {
    
   this.selectedDate=day.day.date;
   console.log(day.day.date);
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
           
      //  this.refresh.next(); 
    // this.ref.detectChanges();
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
  //  console.log(this.resData)
  location.reload();
 this.getdata();
 this.getPoint();
  this.modal.dismissAll();

 
})



}
}
