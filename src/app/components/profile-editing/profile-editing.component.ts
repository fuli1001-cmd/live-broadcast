import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile-editing',
  templateUrl: './profile-editing.component.html',
  styleUrls: ['./profile-editing.component.css']
})
export class ProfileEditingComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
      // this.user = {
      //     userId: '1',
      //     nickname: '空心菜',
      //     avatar: 'http://t7.baidu.com/it/u=3204887199,3790688592&fm=79&app=86&f=JPEG?w=4610&h=2968',
      //     username: 'kxc',
      //     phonenumber: '13894069305',
      //     gender: '男'
      // };
  }

}
