import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdComponent } from './ad/ad.component';
import { PodcasterComponent } from './podcaster/podcaster.component';
import { PodcasterBoardComponent } from './podcaster-board/podcaster-board.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditingComponent } from './profile-editing/profile-editing.component';
import { RewardsComponent } from './rewards/rewards.component';
import { VideoBoardComponent } from './video-board/video-board.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxAgoraModule } from 'ngx-agora';

@NgModule({
  declarations: [
    AppComponent,
    AdComponent,
    PodcasterComponent,
    PodcasterBoardComponent,
    ProfileComponent,
    ProfileEditingComponent,
    RewardsComponent,
    VideoBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxAgoraModule.forRoot({ AppID: environment.agora.appId })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
