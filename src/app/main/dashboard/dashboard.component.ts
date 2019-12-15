import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  progress = 500;
  constructor() { }
  progressBar = document.querySelector('.progress-bar');
  intervalId;
  ngOnInit() {
  
    const getDownloadProgress = () => {
      console.log('getDownload', this);
      if (this.progress <= 99) {
     
        this.progress = this.progress + 1;
        console.log('inside if', this.progress);
      }
      else {
        clearInterval(this.intervalId);
      }
    }
    this.intervalId = setInterval(getDownloadProgress, 1000);

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  } 


}
