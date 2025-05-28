import { Component } from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminService} from '../../../admin/services/admin.service';
import {NgForOf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzSpinComponent} from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-search-car',
  imports: [
    FormsModule,
    NgForOf,
    NzButtonComponent,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzOptionComponent,
    NzRowDirective,
    NzSelectComponent,
    NzSpinComponent,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {
  cars: any = []
  searchCarForm!: FormGroup
  isSpinning: boolean = false

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands: string[] = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType: string[] = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor: string[] = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission: string[] = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder,
              private service: CustomerService) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],
    })
  }

  searchCar() {
    this.isSpinning = true
    console.log(this.searchCarForm.value)
    this.service.searchCar(this.searchCarForm.value).subscribe((res) => {
      console.log(res)
      res.carDtoList.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element)
      })
      this.isSpinning = false
    })
  }
}
