import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
points:any;
  constructor(private router:Router) { }

  ngOnInit() {
    this.points=localStorage.getItem('userPoints')
  }
  logout(){
    localStorage.removeItem('userid');
    localStorage.clear();
    this.router.navigate(["/"],)
    console.log(localStorage.getItem('userid'))
  }

}
