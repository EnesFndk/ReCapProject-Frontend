export interface CreditCard{
    creditCardId: number;
    customerId:number;
    fullName: string;
    cardNumber: string;
    expMonth:number;
    expYear:number;
    cvv: number;
    cardType:string;
    cardLimit:number;
}