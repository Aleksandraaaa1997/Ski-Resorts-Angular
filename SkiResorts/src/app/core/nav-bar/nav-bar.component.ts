import { Component, OnInit } from '@angular/core';
import { ResortInfo } from 'src/app/model/resort-info.model';
import { ResortService } from 'src/app/services/resort.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  resortInfoList: ResortInfo[] = [];

  constructor(private service: ResortService) { }

  ngOnInit(): void {
    this.service.getInfo().subscribe((resortInfoList: ResortInfo[]) => {
      this.resortInfoList = resortInfoList
    })
  }

}
