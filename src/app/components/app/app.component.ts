import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'live-broadcast';
  displayProfileEditing: boolean;
  displayRewardHistory: boolean;

  ngOnInit(): void {
    this.displayRewardHistory = true;
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
