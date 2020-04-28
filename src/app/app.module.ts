import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AdComponent } from './components/ad/ad.component';
import { PodcasterComponent } from './components/podcaster/podcaster.component';
import { PodcasterBoardComponent } from './components/podcaster-board/podcaster-board.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileEditingComponent } from './components/profile-editing/profile-editing.component';
import { RewardsComponent } from './components/rewards/rewards.component';
import { VideoBoardComponent } from './components/video-board/video-board.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxAgoraModule } from 'ngx-agora';
import { RewardHistoryComponent } from './components/reward-history/reward-history.component';
import { RewardComponent } from './components/reward/reward.component';
import { GiftBoardComponent } from './components/gift-board/gift-board.component';

@NgModule({
  declarations: [
    AppComponent,
    AdComponent,
    PodcasterComponent,
    PodcasterBoardComponent,
    ProfileComponent,
    ProfileEditingComponent,
    RewardsComponent,
    VideoBoardComponent,
    RewardHistoryComponent,
    RewardComponent,
    GiftBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
      FormsModule,
    NgxAgoraModule.forRoot({ AppID: environment.agora.appId })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
