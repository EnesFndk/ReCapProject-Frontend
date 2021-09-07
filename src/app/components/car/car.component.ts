import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetail';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/carservice/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  basePath : 'http://localhost:49454/';
  cars: Car[];
  cardetails: CarDetail[];
  carImages: CarImage[];
  currentImage:CarImage;
  
  

  constructor(private carService:CarService, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['carId']) {
        this.getCarDetailPage(params['carId']);
        this.getCarImage(params['carId']);
      }
      else{
        this.getCarDetails();
      }
    })
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe(response => {
      this.cardetails = response.data
    })
  }
  getCarDetailPage(carId:number) {
    this.carService.getCarDetailPage(carId).subscribe(response => {
      this.cardetails = response.data
      console.log(response.data)
    })
  }

  getCarImage(carId:number) {
    this.carService.getCarImageByCarId(carId).subscribe(response => {
      this.carImages = response.data
      console.log(response.data)
    })
  }

  getActivePhoto(index: number) {
    if (index == 0) {
      return "carousel-item active"
    }
    return "carousel-item"
  }

  getPath(image:CarImage) {
    let imagepath = 'http://localhost:49454/images/';
    return imagepath + image.imagePath;
  }

  getButtonClass(image:CarImage){
    if (image=this.carImages[0]) {
      return "active";
    }
    else{
      return "";
    }
  }

  getCurrentImageClass(image:CarImage){
    if(this.carImages[0]==image){
      return "carousel-item active";
    } else {
      return "carousel-item ";
    }
  }
  
  setCurrentImageClass(image:CarImage){
    this.currentImage = image;
  }
}