import { Component } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective} from 'ng-zorro-antd/form';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {NzDatePickerComponent, NzYearPickerComponent} from 'ng-zorro-antd/date-picker';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [
    NzSpinComponent,
    NzRowDirective,
    NzFormDirective,
    ReactiveFormsModule,
    NgIf,
    NzColDirective,
    NzFormControlComponent,
    NzSelectComponent,
    NzOptionComponent,
    NgForOf,
    NzInputDirective,
    NzYearPickerComponent,
    NzDatePickerComponent,
    NzButtonComponent
  ],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {

  isSpinning = false
  carId!: number;
  imgChanged: boolean =  false
  selectedFile: any
  imagePreview!: string | ArrayBuffer | null
  existingImage: string | null = null
  updateForm!: FormGroup
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands: string[] = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType: string[] = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor: string[] = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission: string[] = ["Manual", "Automatic"];

  constructor(private adminService: AdminService,
              private message: NzMessageService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.carId = this.activatedRoute.snapshot.params["id"]
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    })
    this.getCarById()
  }

  getCarById() {
    this.isSpinning = true
    this.adminService.getCarById(this.carId).subscribe((res) => {
      this.isSpinning = false
      console.log(res)
      const carDto = res
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage
      console.log(carDto)
      console.log(this.existingImage)
      this.updateForm.patchValue(carDto)
    })
  }

  updateCar() {
    this.isSpinning = true
    const formData: FormData = new FormData()
    if(this.imgChanged && this.selectedFile) {
      formData.append('image', this.selectedFile)
    }
    formData.append('brand', this.updateForm.get('brand')!.value)
    formData.append('name', this.updateForm.get('name')!.value)
    formData.append('type', this.updateForm.get('type')!.value)
    formData.append('color', this.updateForm.get('color')!.value)
    formData.append('year', this.updateForm.get('year')!.value)
    formData.append('transmission', this.updateForm.get('transmission')!.value)
    formData.append('description', this.updateForm.get('description')!.value)
    formData.append('price', this.updateForm.get('price')!.value)
    console.log(formData)
    this.adminService.updateCar(this.carId, formData).subscribe((res) => {
      this.isSpinning = false
      this.message.success("Car updated successfully", {nzDuration: 5000})
      this.router.navigateByUrl("/admin/dashboard")
      console.log(res)
    }, error => {
      this.message.error("Error while updating car",{nzDuration: 5000})
    })
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
    this.imgChanged = true
    this.existingImage = null
    this.previewImage()
  }

  previewImage() {
    const reader = new FileReader()
    reader.onload = ()=> {
      this.imagePreview = reader.result
    }
    reader.readAsDataURL(this.selectedFile)
  }
}
