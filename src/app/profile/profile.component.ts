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
      HostName: '空心菜',
        Avatar: 'https://miro.medium.com/fit/c/96/96/0*pwkTE8MH7ajvnniz.'
    };
  }

}
