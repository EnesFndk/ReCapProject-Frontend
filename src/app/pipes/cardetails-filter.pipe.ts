import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/cardetail';

@Pipe({
  name: 'cardetailsFilter'
})
export class CardetailsFilterPipe implements PipeTransform {

  transform(value: CarDetail[], filterText: string): CarDetail[] {
    filterText = filterText?filterText.toLocaleLowerCase():""
    return filterText?value.filter((c:CarDetail)=> 
    (c.carName.toLocaleLowerCase().indexOf(filterText) &&
    (c.brandName.toLocaleLowerCase().indexOf(filterText)&&
    (c.colorName.toLocaleLowerCase().indexOf(filterText))))!==-1):value;

  }

}
