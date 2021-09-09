import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetail';
import { CardetailService } from 'src/app/services/cardetailservice/cardetail.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  cardetails : CarDetail[];
  cars :Car[];
  dataLoaded = false;
  filterText="";

  constructor(private carDetailService:CardetailService, private activadedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activadedRoute.params.subscribe(params => {
      if(params['brandId']) {
        this.getCarDetailsByBrand(params['brandId']) 
        
      }
      else if(params['colorId']) {
        this.getCarDetailsByColor(params['colorId'])
      }
      else{
        this.getCarDetails();
      }
    })
  }

  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe(response => {
      this.cardetails = response.data
      this.dataLoaded = true;
    })
  }
  
  getCarDetailsByBrand(brandId:number) {
    this.carDetailService.getCarsByBrand(brandId).subscribe(response => {
      this.cardetails = response.data
      this.dataLoaded = true;
    })
  }
  getCarDetailsByColor(colorId:number) {
    this.carDetailService.getCarsByColor(colorId).subscribe(response => {
      this.cardetails = response.data
      this.dataLoaded = true;
    })
  }
}

