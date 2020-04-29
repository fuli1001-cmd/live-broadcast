import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/data/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'live-broadcast';
  displayProfileEditing: boolean;
  displayRewardHistory: boolean;

  constructor(private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.displayRewardHistory = true;
    // let result = await this.authService.login();
    // console.log('****************************');
    // console.log(result);
  }

  editProfile(): void {
    this.displayProfileEditing = true;
    this.displayRewardHistory = false;
  }

  showRewardHistory(): void {
    this.displayRewardHistory = true;
    this.displayProfileEditing = false;
  }
}
