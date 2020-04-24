import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
    this.user = {
      HostId: 1,
      HostName: '看到卡夫卡',
      Avatar: 'https://img.techbrij.com/techbrij-about-thumbnail.jpg'
    };
  }

}
