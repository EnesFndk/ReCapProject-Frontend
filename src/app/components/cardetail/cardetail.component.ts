import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/cardetail/cardetail';
import { CardetailService } from 'src/app/services/cardetailservice/cardetail.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  cardetails : CarDetail[] = [];
  dataLoaded = false;

  constructor(private carDetailService:CardetailService ) { }

  ngOnInit(): void {
    this.getCarDetails();
  }

  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe(response => {
      this.cardetails = response.data
      this.dataLoaded = true;
    })
  }

}
