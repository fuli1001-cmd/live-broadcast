import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Gift } from 'src/app/models/gift';
import { GiftService } from '../../services/gift.service';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-gift-board',
  templateUrl: './gift-board.component.html',
  styleUrls: ['./gift-board.component.css']
})
export class GiftBoardComponent implements OnInit {
  giftsGroup: Gift[][];
  gifts: Gift[];
  @Output() onClose = new EventEmitter();

  constructor(private giftService: GiftService) { }

  async ngOnInit(): Promise<void> {
    // this.giftsGroup = [];
  }

  // private async init(): Promise<void> {
  //   let gifts = await this.giftService.getGifts();
  //   let start = 0;
  //   let end = Math.min(8, gifts.length - start);
  //   while (gifts.length > start) {
  //     end = start + 8;
  //     this.giftsGroup.push(gifts.slice(start, end));
  //   }
    
    
  // }

  onClickClose(): void {
    this.onClose.emit();
  }

  onClickSend(): void {

  }

}
