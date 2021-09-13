import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetail';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/carservice/car.service';
import { RentalService } from 'src/app/services/rentalservice/rental.service';

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
  carId:number 
  lastRental={rentalId:0, carId:0, customerId:0, rentDate: new Date(2021, 12, 12), returnDate: new Date(2021, 12, 12)}
  newRental:Rental = {rentalId:0, carId:0, customerId:0, rentDate: new Date(2021, 12, 12), returnDate: new Date(2021, 12, 12)}
  customerId: number = 1
  rentDate:string;
  returnDate:string;
  lastRentalReturnDate: string;
  isDatesValid = false;
  carUpdateForm:FormGroup

  
  
  

  constructor(private carService:CarService, private activatedRoute: ActivatedRoute, private rentalService: RentalService, private toastrService: ToastrService,private router:Router  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['carId']) {
        this.getCarDetailPage(params['carId']);
        this.getCarImage(params['carId']);
        this.getLastRentalByCarId(params['carId'])
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

  getLastRentalByCarId(carId:number) {
    this.rentalService.getLastRentalByCarId(carId).subscribe(response=> {
      this.lastRental = response.data
      if(response.data) {
        this.lastRentalReturnDate = this.returnDateFormat()
      }
      else {
        this.lastRentalReturnDate = new Date().toString()
      }
    })
  }
  returnDateFormat() {
    this.lastRentalReturnDate = new Date(this.lastRental.returnDate.toString()).getFullYear().toString() + "-"
    if(new Date(this.lastRental.returnDate.toString()).getMonth() < 10) {
      this.lastRentalReturnDate += "0" + (new Date(this.lastRental.returnDate.toString()).getMonth()+1).toString() + "-"
    }
    else {
      this.lastRentalReturnDate += (new Date(this.lastRental.returnDate.toString()).getMonth()+1).toString() + "-"
    }
    if(new Date(this.lastRental.returnDate.toString()).getDate() < 10){
      this.lastRentalReturnDate += "0" + (new Date(this.lastRental.returnDate.toString()).getDate()+1).toString()
    }
    else {
      this.lastRentalReturnDate += (new Date(this.lastRental.returnDate.toString()).getDate()+1).toString()
    }
    return this.lastRentalReturnDate.toString()  
  }

  controlDates() {
    if (Date.parse(this.rentDate) > Date.parse(this.returnDate) ||
      Date.parse(this.rentDate) < Date.now() - 86400000 ||
      !this.rentDate || !this.returnDate
    ) {
      this.isDatesValid = false
    } else {
      this.isDatesValid = true
    }

  }
  
  rentCar(rental:Rental) {
    this.controlDates()
    rental.carId= this.carId
    rental.customerId = this.customerId
    rental.rentDate = new Date(this.rentDate)
    rental.returnDate = new Date(this.returnDate)
    if (this.isDatesValid === true) {
      this.toastrService.success("İşlem başarılı! Ödeme sayfasına yönlendiriliyorsunuz.")
      this.router.navigate(['cardetails/rent/', JSON.stringify(rental)]);
    }
    else {
      this.toastrService.error("Tarih bilgileri geçersiz.")
      this.router.navigate(['/'])
    }
  }
}