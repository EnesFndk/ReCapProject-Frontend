import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/cardetail';
import { CardetailService } from 'src/app/services/cardetailservice/cardetail.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cardetails: CarDetail[]=[];
  constructor(private cardetailService:CardetailService) { }

  ngOnInit(): void {
    this.getCarDetails();
  }

  getCarDetails(){
    this.cardetailService.getCars().subscribe(response =>{
      this.cardetails = response.data
    })
  }
}
