import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule, routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './services/user.service';
import { PointService } from './services/points.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    routing,
    
  
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    FullCalendarModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),

    RoundProgressModule,
    NgCircleProgressModule.forRoot({
    }),
  ],
  providers: [ DatePipe, AuthGuard,UserService,PointService,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
