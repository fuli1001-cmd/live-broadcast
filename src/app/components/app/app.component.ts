import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/data/auth.service';
import { GeneralService } from '../../services/data/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayProfileEditing: boolean;
    displayRewardHistory: boolean;
    inRoom: boolean;

  constructor(public generalService: GeneralService) { }

  async ngOnInit(): Promise<void> {
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

    onEnterExitRoomEvent(status: boolean): void {
        this.inRoom = status;
    }
}
