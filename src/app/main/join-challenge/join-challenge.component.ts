import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef, ViewEncapsulation,OnInit} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,subMonths,endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import{UserService} from '../../services/user.service'
import {DatePipe} from '@angular/common';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,  CalendarMonthViewDay,CalendarView} from 'angular-calendar';
import { Router } from '@angular/router';

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
  challengeName:any;
  constructor(private modal: NgbModal,private service:UserService,private router: Router,private dateNow:DatePipe) {


  }

  open(content) {
    this.modal.open(content , { centered: true,size:"lg" });
  }
ngOnInit()
{
  this.userPoints=localStorage.getItem('userPoints');

  this.userCalendar= this.service.getcalendarData();
  // this.setView(CalendarView.Month); 
  this.challengeName=this.service.getuserData
  // console.log("calendar",this.userCalendar);
  this.Name=this.service.getName();
  
}

// getPoint(){
//   this.service.userPoint(this.user_id).subscribe(res=>{
//     this.userPoints=res;
//     this.userPoints=this.userPoints.points;
//     console.log(this.userPoints)
//   })
// }

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
  this.selectedDate=day.date;
  // console.log(this.selectedDate)
    var challengeId= this.service.getuserData();
this.joinSelectedChallnge={
  challenge_id:challengeId.challenge,
  user_id:localStorage.getItem('userid'),
  entry_date:this.dateNow.transform(this.selectedDate,"yyyy-MM-dd"),
  active:"1"
}
    // console.log("ok g", this.joinSelectedChallnge);
    this.service.joinSelectedChallenge(this.joinSelectedChallnge).subscribe(res=>{
      this.successmsg=res;
      // console.log(this.successmsg)
      this.refresh.next();
    } ,error=>{
      // console.log("error");
    })
   
  }

}
