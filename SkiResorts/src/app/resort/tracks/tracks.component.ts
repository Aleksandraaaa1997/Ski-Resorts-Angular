import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'src/app/model/track.model';
import { ResortService } from 'src/app/services/resort.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {

  @Input()
  tracks: Track[] = [];


  @Output()
  sortChange: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  
  }

  onSortChange(event: Event) {
    const newSort = (event.target as HTMLSelectElement).value
    this.sortChange.emit(newSort)
    // <!-- u resort.component reaguj na dogadjaj... -->
    // <!-- ... tako sto ces promeniti sort i pozvati open getTracks() -->
  }

}
