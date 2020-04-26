import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile-editing',
  templateUrl: './profile-editing.component.html',
  styleUrls: ['./profile-editing.component.css']
})
export class ProfileEditingComponent implements OnInit {
  user: User;

  constructor() { }

  ngOnInit(): void {
    this.user = {
      userId: '1',
      nickname: 'csnjksc',
      avatar: null,
      username: null,
      phonenumber: '13803845900'
    }
  }

}
