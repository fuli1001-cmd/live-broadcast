import { Component, OnInit, Input } from '@angular/core';
import { Podcaster } from '../models/podcaster';

@Component({
  selector: 'app-podcaster',
  templateUrl: './podcaster.component.html',
  styleUrls: ['./podcaster.component.css']
})
export class PodcasterComponent implements OnInit {
  @Input() podcaster: Podcaster;

  constructor() { }

  ngOnInit(): void {
    console.log(this.podcaster);
  }

}
