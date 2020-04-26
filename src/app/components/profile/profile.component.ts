import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() user: User;
  @Output() onEditProfile = new EventEmitter();
  @Output() onShowRewardHistory = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.user = {
      userId: '1',
      nickname: '空心菜',
      avatar: 'https://miro.medium.com/fit/c/96/96/0*pwkTE8MH7ajvnniz.',
      username: 'kxc',
      phonenumber: '13894069305'
    };
    // this.onEditProfile = new EventEmitter();
    // this.onShowRewardHistory = new EventEmitter();
  }

  editProdile(): void {
    this.onEditProfile.emit();
  }

  showRewardHistory(): void {
    this.onShowRewardHistory.emit();
  }

}
