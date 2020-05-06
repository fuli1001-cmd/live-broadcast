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
import { RewardHistoryComponent } from './components/reward-history/reward-history.component';
import { RewardComponent } from './components/reward/reward.component';
import { GiftBoardComponent } from './components/gift-board/gift-board.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { HotProductComponent } from './components/hot-product/hot-product.component';

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
    GiftBoardComponent,
    TitleBarComponent,
    HotProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
      FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
