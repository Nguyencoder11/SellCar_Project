import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent} from 'ng-zorro-antd/form';
import {CommonModule, NgForOf} from '@angular/common';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {AdminService} from '../../services/admin.service';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [
    NzSpinComponent,
    ReactiveFormsModule,
    NzFormItemComponent,
    NzFormLabelComponent,
    NgForOf,
    NzFormControlComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzButtonComponent,
    NzRowDirective,
    NzColDirective,
    CommonModule
  ],
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
              private service: AdminService) {
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

  clearSearch() {
    this.searchCarForm.reset()
    this.cars = []
  }
}
