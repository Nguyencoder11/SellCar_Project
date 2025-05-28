import { Component } from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    NzSpinComponent,
    NzTableComponent,
    NgForOf,
    NgStyle
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent {

  bookings: any
  isSpinning: boolean = false

  constructor(private service: CustomerService) {
    this.getMyBookings()
  }

  getMyBookings() {
    this.isSpinning = true
    this.service.getBookingByUserId().subscribe((res) => {
      this.isSpinning = false
      console.log(res)
      this.bookings=res
    })
  }
}
