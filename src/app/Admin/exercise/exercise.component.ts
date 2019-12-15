import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class AdminExerciseComponent implements OnInit {

  constructor(private model:NgbModal) { }

  ngOnInit() {
  }
  open(content){
    console.log("ok")
    this.model.open(content , { centered: true,size:"lg" });
  }
}
