import { Component } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {NzSpinComponent} from 'ng-zorro-antd/spin';
import {NzTableComponent} from 'ng-zorro-antd/table';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {Observable} from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-bookings',
  standalone: true,
  imports: [
    NzSpinComponent,
    NzTableComponent,
    NgForOf,
    NgIf,
    NzButtonComponent,
    CommonModule,
  ],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {
  bookings: any
  isSpinning: boolean = false

  constructor(private service: AdminService,
              private message: NzMessageService) {
  }

  ngOnInit(){
    this.getBookings()
  }

  getBookings(){
    this.isSpinning = true
    this.service.getCarBookings().subscribe((res) => {
      this.isSpinning = false
      console.log(res)
      this.bookings = res
    })
  }

  changeBookingStatus(bookingId: number, status: string) {
    this.isSpinning = true
    console.log(bookingId, status)
    this.service.changeBookingStatus(bookingId, status).subscribe((res) => {
      this.isSpinning = false
      console.log(res)
      this.getBookings()
      this.message.success("Booking status changed successfully", {nzDuration: 5000})
    }, error => {
      this.message.error("Something went wrong", {nzDuration: 5000})
    })
  }
}
