import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef, ViewEncapsulation,OnInit} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,subMonths,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{UserService} from '../../services/user.service'
import {DatePipe, getLocaleDateFormat} from '@angular/common';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,  CalendarMonthViewDay,CalendarView} from 'angular-calendar';
import { Router } from '@angular/router';
import { getMinimumEventHeightInMinutes } from 'angular-calendar/modules/common/util';
import { timeout } from 'rxjs/operators';
import {  ToastrService } from 'ngx-toastr';

type CalendarPeriod = 'day' | 'week' | 'month';

@Component({
  selector: 'app-join-challenge',
  templateUrl: './join-challenge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./join-challenge.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JoinChallengeComponent implements OnInit {

  userCalendar:any[]=[]
  joinSelectedChallnge={};
  selectedDate:any;
  test:any[]=[];
   testarray:any = [];
  userPoints:any;
  user_id:any;
  successmsg:any;
  Name:any;
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



  actions: CalendarEventAction[] = [
    
  
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    
    
  ];

  activeDayIsOpen: boolean = false;
  challengeId:any;
  constructor(private modal: NgbModal,private service:UserService,
    private toastr:ToastrService,private router: Router,private dateNow:DatePipe) {

  
  }

  
  showSuccess(){
    this.toastr.success("You Mark Challenge successfully");
    }
    successfullyAdded(){
      this.toastr.success(" Food item successfully added into favorite list ");
    }
    showDltSuccess(){
      this.toastr.success("Data Delete successfully");
      }
    showError(){
      this.toastr.error("There is some Error Occure");
      }
      tryAgain(){
        this.toastr.error("Please Try again");
        }

  open(content) {
    this.modal.open(content , { centered: true,size:"lg" });
  }
ngOnInit()
{
  
  this.userPoints=localStorage.getItem('userPoints');
  this.challengeId=this.service.getuserData();
  console.log("id",this.challengeId)
  this.getChallengeName();
  this.userCalendar=this.service.getcalendarData();
  // this.Name=this.service.getName();
  // console.log("okok",this.Name)
  console.log("calendar",this.userCalendar);
 
   this.getPoint();
  this.getdata();

  // this.getChallengeName();
  // this.setView(CalendarView.Month); 

  // this.getChallengeName();
//   this.Name=this.service.getName();
// console.log("okok",this.Name)
  
}
getdata(){
   this.userCalendar;
   console.log("so alendar",this.userCalendar)
  for( var i=1 ; i < 32; i++ ){

var entry=this.userCalendar[i].challengeEntry;
var data=entry;
 //this.test.push(entry)
     //console.log("test",this.test)
     this.testarray.push(data)
      // this.test.lastIndexOf(this.test)
      // break;`
  }
  console.log("tests",this.testarray)
}
getChallengeName(){

this.service.findChallenge(this.challengeId).subscribe(res=>{
        this.Name=res;
        this.Name=this.Name.name
        console.log("name",this.Name)
        // this.Name=this.Name.name;
        // console.log("name",this.Name)
})

}

getPoint(){
  this.service.userPoint(this.user_id).subscribe(res=>{
    this.userPoints=res;
    this.userPoints=this.userPoints.points;
    console.log(this.userPoints)
  })
}

instruction(){
  this.router.navigate(["/challenge"],)
  // console.log("ok")
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






  setView(view: CalendarView) {
    this.view = view;
  }


  joinChallenge(day){
    console.log("date",this.selectedDate)
  this.selectedDate=day.date;
  console.log("date",this.selectedDate)
    var challengeId= this.service.getuserData();
    console.log('ok here',challengeId)
    
this.joinSelectedChallnge={
  challenge_id:challengeId,
  user_id:localStorage.getItem('userid'),
  entry_date:this.dateNow.transform(this.selectedDate,"yyyy-MM-dd"),
  active:"1"
}
     console.log("ok g", this.joinSelectedChallnge);
    this.service.joinSelectedChallenge(this.joinSelectedChallnge).subscribe(res=>{
      this.successmsg=res;
       console.log(this.successmsg)
      this.refresh.next();
      setTimeout(()=>{
        this.showSuccess();
      },3000)
      this.showSuccess();
      this.router.navigate(["/choose-challenge"])
    } ,error=>{
       console.log("error");
       this.showError();
    })
   
  }

}
