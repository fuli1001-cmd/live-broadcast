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
        avatar: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968',
      username: 'kxc',
        phonenumber: '13894069305',
        gender: '男'
    };
  }

  editProdile(): void {
    this.onEditProfile.emit();
  }

  showRewardHistory(): void {
    this.onShowRewardHistory.emit();
  }

}
