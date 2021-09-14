import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/cardetail';
import { CreditCard } from 'src/app/models/creditcard';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/carservice/car.service';
import { CreditCardService } from 'src/app/services/creditcard/credit-card.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rentalservice/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  
  customerId:number
  firstName:string
  lastName:string
  cardNumber:string
  expMonth:number
  expYear:number
  cvv:number
  cardType:string
  creditCard:CreditCard
  
  carForRent:CarDetail[]

  rental:Rental
  rentDayCount:number

  routeLink = ""
  
  amountOfRent:number

  constructor(private creditCardService:CreditCardService, private paymentService:PaymentService, private rentalService:RentalService, private carService:CarService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["rental"]) {
        this.rental = JSON.parse(params["rental"])
        console.log(this.rental)
        let carId = this.rental.carId
        this.rental.carId = parseInt(carId.toString())
        let diffrenceInTime = new Date(this.rental.returnDate).getTime() - new Date(this.rental.rentDate).getTime()
        this.rentDayCount = diffrenceInTime / (1000 * 3600 * 24);
        console.log(carId)
        this.getCarDetailPage(this.rental.carId);
        this.calculateAmount();
      }
    })
   
  }

  calculateAmount(){
    this.amountOfRent = this.rentDayCount * this.carForRent[0].dailyPrice
    console.log(this.amountOfRent)
    return this.amountOfRent
  }

  pay(){
    this.addCreditCard()
    this.addPayment()
    this.addRental(this.rental)
  }

  getCarDetailPage(carId:number){
    this.carService.getCarDetailPage(carId).subscribe((response) =>{
      this.carForRent = response.data
    })
  }

  addPayment() {
    let payment: Payment = {
      paymentId: 0,
      customerId:this.customerId,
      amount: this.calculateAmount()
    }
    this.paymentService.addPayment(payment).subscribe(response=>{
      if(response.success===true) {
        this.toastrService.success(response.message)
      }
      else{
        this.toastrService.error(response.message)
      }
    })
  } 

  addRental(rental: Rental) {
    this.rentalService.addRental(rental).subscribe(response=> {
      if(response.success === true) {
        this.toastrService.success(response.message)
      }
      else{
        this.toastrService.error(response.message)
      }
    })
  }
  
  addCreditCard() {
    let creditCard:CreditCard = {
      creditCardId:0,
      customerId:this.customerId,
      fullName:this.firstName + " " + this.lastName,
      cardNumber:this.cardNumber,
      expMonth:this.expMonth,
      expYear:this.expYear,
      cvv:this.cvv,
      cardType:this.cardType,
      cardLimit:1500
    }
    
    this.creditCardService.addCreditCar(creditCard).subscribe(response=>{
      if(response.success===true) {
        this.toastrService.success(response.message)
      }
      else{
        this.toastrService.error(response.message)
      }
    })
  }
  
  
}
