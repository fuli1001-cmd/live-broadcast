import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
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
import { RewardComponent } from './components/reward/reward.component';
import { GiftBoardComponent } from './components/gift-board/gift-board.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { HotProductComponent } from './components/hot-product/hot-product.component';
import { HotProductBoardComponent } from './components/hot-product-board/hot-product-board.component';
import { ConfigService } from './services/config/config.service';

export function initializeApp(configService: ConfigService) {
  return () => configService.load();
}
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
    RewardComponent,
    GiftBoardComponent,
    TitleBarComponent,
    HotProductComponent,
    HotProductBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      HttpClientModule,
      FormsModule
  ],
  providers: [
    ConfigService, { 
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService], multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
