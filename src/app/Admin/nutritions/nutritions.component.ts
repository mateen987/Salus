import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nutritions',
  templateUrl: './nutritions.component.html',
  styleUrls: ['./nutritions.component.css']
})
export class NutritionsComponent implements OnInit {

  constructor(private model:NgbModal) { }

  ngOnInit() {
  }
  open(content){
    console.log("ok")
    this.model.open(content , { centered: true,size:"lg" });
  }
}
