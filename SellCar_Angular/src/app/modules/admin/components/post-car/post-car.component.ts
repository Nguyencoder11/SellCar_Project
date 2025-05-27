import { Component } from '@angular/core';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective} from 'ng-zorro-antd/form';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NgForOf, NgIf} from '@angular/common';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [
    NzSpinComponent,
    NzRowDirective,
    NzFormDirective,
    NzColDirective,
    NzButtonComponent,
    NzFormControlComponent,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf,
    NzInputDirective,
    ReactiveFormsModule,
    NgIf,
    NzDatePickerComponent,
  ],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {
  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands: string[] = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType: string[] = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor: string[] = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission: string[] = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    })
  }

  postCar() {
    console.log(this.postCarForm.value)
    const formData: FormData = new FormData()
    if(this.selectedFile) {
      formData.append('img', this.selectedFile)
    }
    formData.append('brand', this.postCarForm.get('brand')!.value)
    formData.append('name', this.postCarForm.get('name')!.value)
    formData.append('type', this.postCarForm.get('type')!.value)
    formData.append('color', this.postCarForm.get('color')!.value)
    formData.append('year', this.postCarForm.get('year')!.value)
    formData.append('transmission', this.postCarForm.get('transmission')!.value)
    formData.append('description', this.postCarForm.get('description')!.value)
    formData.append('price', this.postCarForm.get('price')!.value)
    console.log(formData)
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (!file) return;
    this.selectedFile = file;
    this.previewImage()
  }

  previewImage() {
    if (!this.selectedFile) return;
    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(this.selectedFile)
  }
}
