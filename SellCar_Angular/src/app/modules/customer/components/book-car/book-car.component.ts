import { Component } from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzFormLabelComponent} from 'ng-zorro-antd/form';
import {NzDatePickerComponent} from 'ng-zorro-antd/date-picker';
import {StorageService} from '../../../../auth/services/storage/storage.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [
    NgForOf,
    NzButtonComponent,
    NzColDirective,
    NzRowDirective,
    RouterLink,
    NgIf,
    NzSpinComponent,
    ReactiveFormsModule,
    NzFormLabelComponent,
    NzDatePickerComponent
  ],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {

  carId!: number;
  car: any;
  processedImage: any
  validateForm!: FormGroup
  isSpinning: boolean = false
  dateFormat!: "DD-MM-yyyy"

  constructor(private service: CustomerService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private message: NzMessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.carId = this.activatedRoute.snapshot.params["id"]
    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required]
    })
    this.getCarById()
  }

  getCarById() {
    this.service.getCarById(this.carId).subscribe((res) => {
      console.log(res)
      this.processedImage = 'data:image/jpeg;base64,' + res.returnedImage
      this.car = res
    })
  }

  bookACar(data: any) {
    console.log(data)
    this.isSpinning = false
    let bookACarDto = {
      toDate: data.toDate,
      fromDate: data.fromDate,
      userId: StorageService.getUserId(),
      carId: this.carId
    }
    this.service.bookACar(bookACarDto).subscribe((res) => {
      console.log(res)
      this.message.success("Booking request submitted successfully", {nzDuration: 5000})
      this.router.navigateByUrl("/customer/dashboard")
    }, error => {
      this.message.error("Something went wrong", {nzDuration: 5000})
    })
  }
}
