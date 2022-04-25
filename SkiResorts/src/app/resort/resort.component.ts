import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resort } from '../model/resort.model';
import { SkiPass } from '../model/ski-pass.model';
import { Track } from '../model/track.model';
import { Weather } from '../model/weather';
import { ResortService } from '../services/resort.service';

@Component({
  selector: 'app-resort',
  templateUrl: './resort.component.html',
  styleUrls: ['./resort.component.css']
})
export class ResortComponent implements OnInit {

  resortId: number = 0;
  resort: Resort = new Resort();

  tracks: Track[] = [];
  trackParams = {
    sort: ''
  }

  weather: Weather[] = [];

  skiPass: SkiPass[] = [];

  active = 1;

  constructor(private route: ActivatedRoute,
    private service: ResortService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.resortId = params['id']
      this.getResort();
      this.getTracks();
      this.getSkiPass();
      this.getWeather();
    })
  }

  getResort() {
    this.service.getResort(this.resortId).subscribe((resort: Resort) => {
      this.resort = resort;
    })
  }

  getTracks() {
    this.service.getTracks(this.resortId, this.trackParams).subscribe((tracks: Track[]) => {
      this.tracks = tracks
    })
  }

  onTrackSort(newSort: string) {
    this.trackParams.sort = newSort;
    this.getTracks()
  }

  getSkiPass() {
    this.service.getSkiPass(this.resortId).subscribe((skiPass: SkiPass[]) => {
      this.skiPass = skiPass;
    })
  }

  getWeather() {
    this.service.getWeather(this.resortId).subscribe((weather: Weather[]) => {
      this.weather = weather;
    })
  }
}
