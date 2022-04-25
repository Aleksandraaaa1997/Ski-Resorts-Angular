import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/model/reservation.model';
import { SkiPass } from 'src/app/model/ski-pass.model';
import { ResortService } from 'src/app/services/resort.service';

@Component({
  selector: 'app-ski-pass',
  templateUrl: './ski-pass.component.html',
  styleUrls: ['./ski-pass.component.css']
})
export class SkiPassComponent implements OnInit {

  @Input()
  skiPass: SkiPass[] = [];

  @Input()
  resortId: number = 0;
  
  reservation: Reservation = new Reservation();

  constructor(private service: ResortService) { }

  ngOnInit(): void {
  }

  onDateChanged() {
    console.log("date")
    if (!this.reservation.dateFrom.day || !this.reservation.dateTo.day) {
      this.reservation.price = 0;
      console.log("date2")
      
      return;
    }
    let dateFrom = new Date(
      this.reservation.dateFrom.year,
      this.reservation.dateFrom.month,
      this.reservation.dateFrom.day
    )
    let dateTo = new Date(
      this.reservation.dateTo.year,
      this.reservation.dateTo.month,
      this.reservation.dateTo.day
    )
    if (dateFrom.getTime() >= dateTo.getTime()) {
      this.reservation.price = 0;
      console.log("date3")
      return;
    }
    const days = Math.ceil((dateTo.getTime() - dateFrom.getTime())/(1000*60*60*24))
    
    for (let pass of this.skiPass) {
      if (pass.duration == days) {
        this.reservation.price = pass.price
        console.log("date4")
        return;
      }
    }
    console.log("date5")
    this.reservation.price = 0;
  }


  onSubmit() {
    this.reservation.mountain_id = this.resortId;
    this.service.postReservation(this.resortId, this.reservation).subscribe((data: Reservation) => {
      console.log(data);
    })
  }

}
